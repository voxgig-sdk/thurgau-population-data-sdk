<?php
declare(strict_types=1);

// ThurgauPopulationData SDK base feature

class ThurgauPopulationDataBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ThurgauPopulationDataContext $ctx, array $options): void {}
    public function PostConstruct(ThurgauPopulationDataContext $ctx): void {}
    public function PostConstructEntity(ThurgauPopulationDataContext $ctx): void {}
    public function SetData(ThurgauPopulationDataContext $ctx): void {}
    public function GetData(ThurgauPopulationDataContext $ctx): void {}
    public function GetMatch(ThurgauPopulationDataContext $ctx): void {}
    public function SetMatch(ThurgauPopulationDataContext $ctx): void {}
    public function PrePoint(ThurgauPopulationDataContext $ctx): void {}
    public function PreSpec(ThurgauPopulationDataContext $ctx): void {}
    public function PreRequest(ThurgauPopulationDataContext $ctx): void {}
    public function PreResponse(ThurgauPopulationDataContext $ctx): void {}
    public function PreResult(ThurgauPopulationDataContext $ctx): void {}
    public function PreDone(ThurgauPopulationDataContext $ctx): void {}
    public function PreUnexpected(ThurgauPopulationDataContext $ctx): void {}
}
