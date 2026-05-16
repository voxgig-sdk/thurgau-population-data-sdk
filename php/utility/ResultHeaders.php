<?php
declare(strict_types=1);

// ThurgauPopulationData SDK utility: result_headers

class ThurgauPopulationDataResultHeaders
{
    public static function call(ThurgauPopulationDataContext $ctx): ?ThurgauPopulationDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
