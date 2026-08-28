-- Typed models for the ThurgauPopulationData SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class PopulationData
---@field record? table

---@class PopulationDataLoadMatch
---@field delimiter? string
---@field refine? string
---@field where? string

---@class PopulationDataListMatch
---@field exclude? string
---@field limit? number
---@field offset? number
---@field order_by? string
---@field refine? string
---@field select? string
---@field where? string

local M = {}

return M
