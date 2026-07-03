# ThurgauPopulationData SDK

Thurgau Population Data client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { ThurgauPopulationDataSDK } from 'thurgau-population-data'

const client = new ThurgauPopulationDataSDK({
  apikey: process.env.THURGAU-POPULATION-DATA_APIKEY,
})

// List all populationdatas
const populationdatas = await client.PopulationData().list()
console.log(populationdatas.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **PopulationData** |  | `/explore/v2.1/catalog/datasets/sk-stat-56/records` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from thurgaupopulationdata_sdk import ThurgauPopulationDataSDK

client = ThurgauPopulationDataSDK({
    "apikey": os.environ.get("THURGAU-POPULATION-DATA_APIKEY"),
})

# List all populationdatas
populationdatas, err = client.PopulationData().list()
print(populationdatas)

# Load a specific populationdata
populationdata, err = client.PopulationData().load({"id": "example_id"})
print(populationdata)
```

### PHP

```php
<?php
require_once 'thurgaupopulationdata_sdk.php';

$client = new ThurgauPopulationDataSDK([
    "apikey" => getenv("THURGAU-POPULATION-DATA_APIKEY"),
]);

// List all populationdatas
[$populationdatas, $err] = $client->PopulationData()->list();
print_r($populationdatas);

// Load a specific populationdata
[$populationdata, $err] = $client->PopulationData()->load(["id" => "example_id"]);
print_r($populationdata);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/thurgau-population-data-sdk/go"

client := sdk.NewThurgauPopulationDataSDK(map[string]any{
    "apikey": os.Getenv("THURGAU-POPULATION-DATA_APIKEY"),
})

// List all populationdatas
populationdatas, err := client.PopulationData(nil).List(nil, nil)
fmt.Println(populationdatas)
```

### Ruby

```ruby
require_relative "ThurgauPopulationData_sdk"

client = ThurgauPopulationDataSDK.new({
  "apikey" => ENV["THURGAU-POPULATION-DATA_APIKEY"],
})

# List all populationdatas
populationdatas, err = client.PopulationData().list
puts populationdatas

# Load a specific populationdata
populationdata, err = client.PopulationData().load({ "id" => "example_id" })
puts populationdata
```

### Lua

```lua
local sdk = require("thurgau-population-data_sdk")

local client = sdk.new({
  apikey = os.getenv("THURGAU-POPULATION-DATA_APIKEY"),
})

-- List all populationdatas
local populationdatas, err = client:PopulationData():list()
print(populationdatas)

-- Load a specific populationdata
local populationdata, err = client:PopulationData():load({ id = "example_id" })
print(populationdata)
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
client = ThurgauPopulationDataSDK.test()
result, err = client.PopulationData().load({"id": "test01"})
```

### PHP

```php
$client = ThurgauPopulationDataSDK::test();
[$result, $err] = $client->PopulationData()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.PopulationData(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ThurgauPopulationDataSDK.test
result, err = client.PopulationData().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:PopulationData():load({ id = "test01" })
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

---

Generated from the Thurgau Population Data OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
