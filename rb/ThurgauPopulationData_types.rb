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
# @!attribute [rw] record
#   @return [Hash, nil]
PopulationDataLoadMatch = Struct.new(
  :record,
  keyword_init: true
)

# Request payload for PopulationData#list.
#
# @!attribute [rw] record
#   @return [Hash, nil]
PopulationDataListMatch = Struct.new(
  :record,
  keyword_init: true
)

