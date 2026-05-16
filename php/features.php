<?php
declare(strict_types=1);

// ThurgauPopulationData SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ThurgauPopulationDataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ThurgauPopulationDataBaseFeature();
            case "test":
                return new ThurgauPopulationDataTestFeature();
            default:
                return new ThurgauPopulationDataBaseFeature();
        }
    }
}
