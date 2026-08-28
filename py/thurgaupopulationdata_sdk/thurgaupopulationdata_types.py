# Typed models for the ThurgauPopulationData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class PopulationData(TypedDict, total=False):
    record: dict


class PopulationDataLoadMatch(TypedDict, total=False):
    delimiter: str
    refine: str
    where: str


class PopulationDataListMatch(TypedDict, total=False):
    exclude: str
    limit: int
    offset: int
    order_by: str
    refine: str
    select: str
    where: str
