<?php
declare(strict_types=1);

// ThurgauPopulationData SDK utility: result_body

class ThurgauPopulationDataResultBody
{
    public static function call(ThurgauPopulationDataContext $ctx): ?ThurgauPopulationDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
