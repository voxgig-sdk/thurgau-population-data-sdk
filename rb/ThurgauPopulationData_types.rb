# frozen_string_literal: true

# Typed models for the ThurgauPopulationData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# PopulationData entity data model.
#
# @!attribute [rw] record
#   @return [Hash, nil]
PopulationData = Struct.new(
  :record,
  keyword_init: true
)

# Request payload for PopulationData#load.
#
# @!attribute [rw] delimiter
#   @return [String, nil]
#
# @!attribute [rw] refine
#   @return [String, nil]
#
# @!attribute [rw] where
#   @return [String, nil]
PopulationDataLoadMatch = Struct.new(
  :delimiter,
  :refine,
  :where,
  keyword_init: true
)

# Request payload for PopulationData#list.
#
# @!attribute [rw] exclude
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] order_by
#   @return [String, nil]
#
# @!attribute [rw] refine
#   @return [String, nil]
#
# @!attribute [rw] select
#   @return [String, nil]
#
# @!attribute [rw] where
#   @return [String, nil]
PopulationDataListMatch = Struct.new(
  :exclude,
  :limit,
  :offset,
  :order_by,
  :refine,
  :select,
  :where,
  keyword_init: true
)

