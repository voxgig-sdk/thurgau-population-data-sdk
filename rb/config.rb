# ThurgauPopulationData SDK configuration

module ThurgauPopulationDataConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "ThurgauPopulationData",
        "slug" => "thurgau-population-data",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://data.tg.ch/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "population_data" => {},
        },
      },
      "entity" => {
        "population_data" => {
          "fields" => [
            {
              "name" => "record",
              "title" => "Record",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "population_data",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/explore/v2.1/catalog/datasets/sk-stat-56/records",
                  "segments" => [
                    {
                      "lit" => "explore",
                    },
                    {
                      "lit" => "v2.1",
                    },
                    {
                      "lit" => "catalog",
                    },
                    {
                      "lit" => "datasets",
                    },
                    {
                      "lit" => "sk-stat-56",
                    },
                    {
                      "lit" => "records",
                    },
                  ],
                  "parts" => [
                    "explore",
                    "v2.1",
                    "catalog",
                    "datasets",
                    "sk-stat-56",
                    "records",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "exclude",
                        "orig" => "exclude",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "order_by",
                        "orig" => "order_by",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "refine",
                        "orig" => "refine",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "select",
                        "orig" => "select",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "where",
                        "orig" => "where",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "exclude",
                      "limit",
                      "offset",
                      "order_by",
                      "refine",
                      "select",
                      "where",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/explore/v2.1/catalog/datasets/sk-stat-56/exports/json",
                  "segments" => [
                    {
                      "lit" => "explore",
                    },
                    {
                      "lit" => "v2.1",
                    },
                    {
                      "lit" => "catalog",
                    },
                    {
                      "lit" => "datasets",
                    },
                    {
                      "lit" => "sk-stat-56",
                    },
                    {
                      "lit" => "exports",
                    },
                    {
                      "lit" => "json",
                    },
                  ],
                  "parts" => [
                    "explore",
                    "v2.1",
                    "catalog",
                    "datasets",
                    "sk-stat-56",
                    "exports",
                    "json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "refine",
                        "orig" => "refine",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "where",
                        "orig" => "where",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "refine",
                      "where",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/explore/v2.1/catalog/datasets/sk-stat-56/exports/csv",
                  "segments" => [
                    {
                      "lit" => "explore",
                    },
                    {
                      "lit" => "v2.1",
                    },
                    {
                      "lit" => "catalog",
                    },
                    {
                      "lit" => "datasets",
                    },
                    {
                      "lit" => "sk-stat-56",
                    },
                    {
                      "lit" => "exports",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "parts" => [
                    "explore",
                    "v2.1",
                    "catalog",
                    "datasets",
                    "sk-stat-56",
                    "exports",
                    "csv",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "delimiter",
                        "orig" => "delimiter",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => ";",
                      },
                      {
                        "name" => "refine",
                        "orig" => "refine",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "where",
                        "orig" => "where",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "delimiter",
                      "refine",
                      "where",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ThurgauPopulationDataFeatures.make_feature(name)
  end
end
