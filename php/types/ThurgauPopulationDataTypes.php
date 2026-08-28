<?php
declare(strict_types=1);

// Typed models for the ThurgauPopulationData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** PopulationData entity data model. */
class PopulationData
{
    public ?array $record = null;
}

/** Request payload for PopulationData#load. */
class PopulationDataLoadMatch
{
    public ?string $delimiter = null;
    public ?string $refine = null;
    public ?string $where = null;
}

/** Request payload for PopulationData#list. */
class PopulationDataListMatch
{
    public ?string $exclude = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $order_by = null;
    public ?string $refine = null;
    public ?string $select = null;
    public ?string $where = null;
}

