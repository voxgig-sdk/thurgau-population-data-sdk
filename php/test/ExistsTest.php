<?php
declare(strict_types=1);

// ThurgauPopulationData SDK exists test

require_once __DIR__ . '/../thurgaupopulationdata_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ThurgauPopulationDataSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
