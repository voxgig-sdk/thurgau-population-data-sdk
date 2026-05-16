<?php
declare(strict_types=1);

// ThurgauPopulationData SDK utility: prepare_body

class ThurgauPopulationDataPrepareBody
{
    public static function call(ThurgauPopulationDataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
