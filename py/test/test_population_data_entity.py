# PopulationData entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from thurgaupopulationdata_sdk import ThurgauPopulationDataSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPopulationDataEntity:

    def test_should_create_instance(self):
        testsdk = ThurgauPopulationDataSDK.test(None, None)
        ent = testsdk.PopulationData(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "population_data": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = ThurgauPopulationDataSDK.test(seed, None)
        seen = list(base.PopulationData(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from config import make_config
        cfg = make_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = ThurgauPopulationDataSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.PopulationData(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _population_data_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "population_data." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set THURGAUPOPULATIONDATA_TEST_POPULATION_DATA_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        population_data_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.population_data")))
        population_data_ref01_data = None
        if len(population_data_ref01_data_raw) > 0:
            population_data_ref01_data = helpers.to_map(population_data_ref01_data_raw[0][1])

        # LIST
        population_data_ref01_ent = client.PopulationData(None)
        population_data_ref01_match = {}

        population_data_ref01_list_result = population_data_ref01_ent.list(population_data_ref01_match, None)
        assert isinstance(population_data_ref01_list_result, list)

        # LOAD
        population_data_ref01_match_dt0 = {}
        population_data_ref01_data_dt0_loaded = population_data_ref01_ent.load(population_data_ref01_match_dt0, None)
        assert population_data_ref01_data_dt0_loaded is not None



def _population_data_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/population_data/PopulationDataTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ThurgauPopulationDataSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["population_data01", "population_data02", "population_data03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "THURGAUPOPULATIONDATA_TEST_POPULATION_DATA_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "THURGAUPOPULATIONDATA_TEST_POPULATION_DATA_ENTID": idmap,
        "THURGAUPOPULATIONDATA_TEST_LIVE": "FALSE",
        "THURGAUPOPULATIONDATA_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("THURGAUPOPULATIONDATA_TEST_POPULATION_DATA_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("THURGAUPOPULATIONDATA_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = ThurgauPopulationDataSDK(helpers.to_map(merged_opts))

    _live = env.get("THURGAUPOPULATIONDATA_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("THURGAUPOPULATIONDATA_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
