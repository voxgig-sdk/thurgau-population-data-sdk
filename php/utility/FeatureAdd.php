<?php
declare(strict_types=1);

// ThurgauPopulationData SDK utility: feature_add

class ThurgauPopulationDataFeatureAdd
{
    public static function call(ThurgauPopulationDataContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
