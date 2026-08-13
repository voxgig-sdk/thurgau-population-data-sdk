# ThurgauPopulationData SDK feature factory

from thurgaupopulationdata_sdk.feature.base_feature import ThurgauPopulationDataBaseFeature
from thurgaupopulationdata_sdk.feature.test_feature import ThurgauPopulationDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ThurgauPopulationDataBaseFeature(),
        "test": lambda: ThurgauPopulationDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
