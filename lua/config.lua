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
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
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
            ["title"] = "Record",
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
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/explore/v2.1/catalog/datasets/sk-stat-56/records",
                ["segments"] = {
                  {
                    ["lit"] = "explore",
                  },
                  {
                    ["lit"] = "v2.1",
                  },
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "datasets",
                  },
                  {
                    ["lit"] = "sk-stat-56",
                  },
                  {
                    ["lit"] = "records",
                  },
                },
                ["parts"] = {
                  "explore",
                  "v2.1",
                  "catalog",
                  "datasets",
                  "sk-stat-56",
                  "records",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "exclude",
                      ["orig"] = "exclude",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 10,
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                    {
                      ["name"] = "order_by",
                      ["orig"] = "order_by",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "refine",
                      ["orig"] = "refine",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "select",
                      ["orig"] = "select",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "where",
                      ["orig"] = "where",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
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
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/explore/v2.1/catalog/datasets/sk-stat-56/exports/json",
                ["segments"] = {
                  {
                    ["lit"] = "explore",
                  },
                  {
                    ["lit"] = "v2.1",
                  },
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "datasets",
                  },
                  {
                    ["lit"] = "sk-stat-56",
                  },
                  {
                    ["lit"] = "exports",
                  },
                  {
                    ["lit"] = "json",
                  },
                },
                ["parts"] = {
                  "explore",
                  "v2.1",
                  "catalog",
                  "datasets",
                  "sk-stat-56",
                  "exports",
                  "json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "refine",
                      ["orig"] = "refine",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "where",
                      ["orig"] = "where",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "refine",
                    "where",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/explore/v2.1/catalog/datasets/sk-stat-56/exports/csv",
                ["segments"] = {
                  {
                    ["lit"] = "explore",
                  },
                  {
                    ["lit"] = "v2.1",
                  },
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "datasets",
                  },
                  {
                    ["lit"] = "sk-stat-56",
                  },
                  {
                    ["lit"] = "exports",
                  },
                  {
                    ["lit"] = "csv",
                  },
                },
                ["parts"] = {
                  "explore",
                  "v2.1",
                  "catalog",
                  "datasets",
                  "sk-stat-56",
                  "exports",
                  "csv",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "delimiter",
                      ["orig"] = "delimiter",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = ";",
                    },
                    {
                      ["name"] = "refine",
                      ["orig"] = "refine",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "where",
                      ["orig"] = "where",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "delimiter",
                    "refine",
                    "where",
                  },
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
