# ThurgauPopulationData SDK exists test

import pytest
from thurgaupopulationdata_sdk import ThurgauPopulationDataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ThurgauPopulationDataSDK.test(None, None)
        assert testsdk is not None
