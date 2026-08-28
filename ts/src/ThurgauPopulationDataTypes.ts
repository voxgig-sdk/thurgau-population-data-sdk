// Typed models for the ThurgauPopulationData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface PopulationData {
  record?: Record<string, any>
}

export interface PopulationDataLoadMatch {
  delimiter?: string
  refine?: string
  where?: string
}

export interface PopulationDataListMatch {
  exclude?: string
  limit?: number
  offset?: number
  order_by?: string
  refine?: string
  select?: string
  where?: string
}

