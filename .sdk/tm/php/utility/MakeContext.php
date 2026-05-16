<?php
declare(strict_types=1);

// ThurgauPopulationData SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ThurgauPopulationDataMakeContext
{
    public static function call(array $ctxmap, ?ThurgauPopulationDataContext $basectx): ThurgauPopulationDataContext
    {
        return new ThurgauPopulationDataContext($ctxmap, $basectx);
    }
}
