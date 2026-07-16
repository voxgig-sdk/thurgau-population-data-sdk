<?php
declare(strict_types=1);

// PopulationData entity test

require_once __DIR__ . '/../thurgaupopulationdata_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PopulationDataEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ThurgauPopulationDataSDK::test(null, null);
        $ent = $testsdk->PopulationData(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "population_data" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = ThurgauPopulationDataSDK::test($seed, null);
        $seen = iterator_to_array($base->PopulationData(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = ThurgauPopulationDataConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = ThurgauPopulationDataSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->PopulationData(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = population_data_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "population_data." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set THURGAUPOPULATIONDATA_TEST_POPULATION_DATA_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $population_data_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.population_data")));
        $population_data_ref01_data = null;
        if (count($population_data_ref01_data_raw) > 0) {
            $population_data_ref01_data = Helpers::to_map($population_data_ref01_data_raw[0][1]);
        }

        // LIST
        $population_data_ref01_ent = $client->PopulationData(null);
        $population_data_ref01_match = [];

        $population_data_ref01_list_result = $population_data_ref01_ent->list($population_data_ref01_match, null);
        $this->assertIsArray($population_data_ref01_list_result);

        // LOAD
        $population_data_ref01_match_dt0 = [];
        $population_data_ref01_data_dt0_loaded = $population_data_ref01_ent->load($population_data_ref01_match_dt0, null);
        $this->assertNotNull($population_data_ref01_data_dt0_loaded);

    }
}

function population_data_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/population_data/PopulationDataTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ThurgauPopulationDataSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["population_data01", "population_data02", "population_data03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("THURGAUPOPULATIONDATA_TEST_POPULATION_DATA_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "THURGAUPOPULATIONDATA_TEST_POPULATION_DATA_ENTID" => $idmap,
        "THURGAUPOPULATIONDATA_TEST_LIVE" => "FALSE",
        "THURGAUPOPULATIONDATA_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["THURGAUPOPULATIONDATA_TEST_POPULATION_DATA_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["THURGAUPOPULATIONDATA_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new ThurgauPopulationDataSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["THURGAUPOPULATIONDATA_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["THURGAUPOPULATIONDATA_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
