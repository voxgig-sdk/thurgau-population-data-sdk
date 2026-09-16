package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewPopulationDataEntityFunc func(client *ThurgauPopulationDataSDK, entopts map[string]any) ThurgauPopulationDataEntity

