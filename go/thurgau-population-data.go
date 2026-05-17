package voxgigthurgaupopulationdatasdk

import (
	"github.com/voxgig-sdk/thurgau-population-data-sdk/go/core"
	"github.com/voxgig-sdk/thurgau-population-data-sdk/go/entity"
	"github.com/voxgig-sdk/thurgau-population-data-sdk/go/feature"
	_ "github.com/voxgig-sdk/thurgau-population-data-sdk/go/utility"
)

// Type aliases preserve external API.
type ThurgauPopulationDataSDK = core.ThurgauPopulationDataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ThurgauPopulationDataEntity = core.ThurgauPopulationDataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ThurgauPopulationDataError = core.ThurgauPopulationDataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewPopulationDataEntityFunc = func(client *core.ThurgauPopulationDataSDK, entopts map[string]any) core.ThurgauPopulationDataEntity {
		return entity.NewPopulationDataEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewThurgauPopulationDataSDK = core.NewThurgauPopulationDataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
