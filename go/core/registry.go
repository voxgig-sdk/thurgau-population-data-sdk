package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewPopulationDataEntityFunc func(client *ThurgauPopulationDataSDK, entopts map[string]any) ThurgauPopulationDataEntity

