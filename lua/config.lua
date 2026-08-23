-- ThurgauPopulationData SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "ThurgauPopulationData",
      slug = "thurgau-population-data",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://data.tg.ch/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["population_data"] = {},
      },
    },
    entity = {
      ["population_data"] = {
        ["fields"] = {
          {
            ["name"] = "record",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "population_data",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "exclude",
                      ["orig"] = "exclude",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "order_by",
                      ["orig"] = "order_by",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "refine",
                      ["orig"] = "refine",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "select",
                      ["orig"] = "select",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "where",
                      ["orig"] = "where",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/explore/v2.1/catalog/datasets/sk-stat-56/records",
                ["parts"] = {
                  "explore",
                  "v2.1",
                  "catalog",
                  "datasets",
                  "sk-stat-56",
                  "records",
                },
                ["select"] = {
                  ["exist"] = {
                    "exclude",
                    "limit",
                    "offset",
                    "order_by",
                    "refine",
                    "select",
                    "where",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "refine",
                      ["orig"] = "refine",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "where",
                      ["orig"] = "where",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/explore/v2.1/catalog/datasets/sk-stat-56/exports/json",
                ["parts"] = {
                  "explore",
                  "v2.1",
                  "catalog",
                  "datasets",
                  "sk-stat-56",
                  "exports",
                  "json",
                },
                ["select"] = {
                  ["exist"] = {
                    "refine",
                    "where",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = ";",
                      ["kind"] = "query",
                      ["name"] = "delimiter",
                      ["orig"] = "delimiter",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "refine",
                      ["orig"] = "refine",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "where",
                      ["orig"] = "where",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/explore/v2.1/catalog/datasets/sk-stat-56/exports/csv",
                ["parts"] = {
                  "explore",
                  "v2.1",
                  "catalog",
                  "datasets",
                  "sk-stat-56",
                  "exports",
                  "csv",
                },
                ["select"] = {
                  ["exist"] = {
                    "delimiter",
                    "refine",
                    "where",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
