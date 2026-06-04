# ThurgauPopulationData SDK

Permanent population counts for the Swiss canton of Thurgau, from 2007 onwards

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Thurgau Population Data

This SDK wraps the population dataset published by [Open Government Data Kanton Thurgau](https://data.tg.ch/), the open data portal operated by the Swiss canton of Thurgau. The dataset covers the canton's permanent resident population from 2007 onwards.

What you get from the API:

- Records from the `sk-stat-56` dataset, queried through the Opendatasoft Explore API at `/api/explore/v2.1/catalog/datasets/sk-stat-56/records`.
- Standard Explore query parameters such as `limit`, `offset`, `where`, `select`, `group_by`, and `order_by` for filtering and pagination.

Operational notes:

- No authentication is required and CORS is enabled, so the API can be called directly from browsers.
- The portal is built on the Opendatasoft platform, so general Opendatasoft Explore v2.1 conventions apply.

## Try it

**TypeScript**
```bash
npm install thurgau-population-data
```

**Python**
```bash
pip install thurgau-population-data-sdk
```

**PHP**
```bash
composer require voxgig/thurgau-population-data-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/thurgau-population-data-sdk/go
```

**Ruby**
```bash
gem install thurgau-population-data-sdk
```

**Lua**
```bash
luarocks install thurgau-population-data-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ThurgauPopulationDataSDK } from 'thurgau-population-data'

const client = new ThurgauPopulationDataSDK({})

// List all populationdatas
const populationdatas = await client.PopulationData().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o thurgau-population-data-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "thurgau-population-data": {
      "command": "/abs/path/to/thurgau-population-data-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **PopulationData** | Permanent population records for the canton of Thurgau, served from the `sk-stat-56` dataset at `/api/explore/v2.1/catalog/datasets/sk-stat-56/records`. | `/explore/v2.1/catalog/datasets/sk-stat-56/records` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from thurgaupopulationdata_sdk import ThurgauPopulationDataSDK

client = ThurgauPopulationDataSDK({})

# List all populationdatas
populationdatas, err = client.PopulationData(None).list(None, None)

# Load a specific populationdata
populationdata, err = client.PopulationData(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'thurgaupopulationdata_sdk.php';

$client = new ThurgauPopulationDataSDK([]);

// List all populationdatas
[$populationdatas, $err] = $client->PopulationData(null)->list(null, null);

// Load a specific populationdata
[$populationdata, $err] = $client->PopulationData(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/thurgau-population-data-sdk/go"

client := sdk.NewThurgauPopulationDataSDK(map[string]any{})

// List all populationdatas
populationdatas, err := client.PopulationData(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "ThurgauPopulationData_sdk"

client = ThurgauPopulationDataSDK.new({})

# List all populationdatas
populationdatas, err = client.PopulationData(nil).list(nil, nil)

# Load a specific populationdata
populationdata, err = client.PopulationData(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("thurgau-population-data_sdk")

local client = sdk.new({})

-- List all populationdatas
local populationdatas, err = client:PopulationData(nil):list(nil, nil)

-- Load a specific populationdata
local populationdata, err = client:PopulationData(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ThurgauPopulationDataSDK.test()
const result = await client.PopulationData().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ThurgauPopulationDataSDK.test(None, None)
result, err = client.PopulationData(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ThurgauPopulationDataSDK::test(null, null);
[$result, $err] = $client->PopulationData(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.PopulationData(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ThurgauPopulationDataSDK.test(nil, nil)
result, err = client.PopulationData(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:PopulationData(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Thurgau Population Data

- Upstream: [https://data.tg.ch/](https://data.tg.ch/)
- API docs: [https://data.tg.ch/api-console/](https://data.tg.ch/api-console/)

- Published as Open Government Data by Kanton Thurgau on the data.tg.ch portal.
- Attribution to the canton of Thurgau / data.tg.ch is expected when redistributing or visualising the data.
- Refer to the portal's terms and conditions on [data.tg.ch](https://data.tg.ch/) for the authoritative licence text.

---

Generated from the Thurgau Population Data OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
