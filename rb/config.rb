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
        "test" => {
          "options" => {
            "active" => false,
          },
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
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "exclude",
                        "orig" => "exclude",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "order_by",
                        "orig" => "order_by",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "refine",
                        "orig" => "refine",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "select",
                        "orig" => "select",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "where",
                        "orig" => "where",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/explore/v2.1/catalog/datasets/sk-stat-56/records",
                  "parts" => [
                    "explore",
                    "v2.1",
                    "catalog",
                    "datasets",
                    "sk-stat-56",
                    "records",
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "refine",
                        "orig" => "refine",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "where",
                        "orig" => "where",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/explore/v2.1/catalog/datasets/sk-stat-56/exports/json",
                  "parts" => [
                    "explore",
                    "v2.1",
                    "catalog",
                    "datasets",
                    "sk-stat-56",
                    "exports",
                    "json",
                  ],
                  "select" => {
                    "exist" => [
                      "refine",
                      "where",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => ";",
                        "kind" => "query",
                        "name" => "delimiter",
                        "orig" => "delimiter",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "refine",
                        "orig" => "refine",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "where",
                        "orig" => "where",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/explore/v2.1/catalog/datasets/sk-stat-56/exports/csv",
                  "parts" => [
                    "explore",
                    "v2.1",
                    "catalog",
                    "datasets",
                    "sk-stat-56",
                    "exports",
                    "csv",
                  ],
                  "select" => {
                    "exist" => [
                      "delimiter",
                      "refine",
                      "where",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
