# Typed models for the ThurgauPopulationData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class PopulationData:
    record: Optional[dict] = None


@dataclass
class PopulationDataLoadMatch:
    record: Optional[dict] = None


@dataclass
class PopulationDataListMatch:
    record: Optional[dict] = None

