# ThurgauPopulationData SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ThurgauPopulationData",
            "slug": "thurgau-population-data",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://data.tg.ch/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "population_data": {},
            },
        },
        "entity": {
      "population_data": {
        "fields": [
          {
            "name": "record",
            "type": "`$OBJECT`",
          },
        ],
        "name": "population_data",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "exclude",
                      "orig": "exclude",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "order_by",
                      "orig": "order_by",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "refine",
                      "orig": "refine",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "select",
                      "orig": "select",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "where",
                      "orig": "where",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/explore/v2.1/catalog/datasets/sk-stat-56/records",
                "segments": [
                  {
                    "lit": "explore",
                  },
                  {
                    "lit": "v2.1",
                  },
                  {
                    "lit": "catalog",
                  },
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "sk-stat-56",
                  },
                  {
                    "lit": "records",
                  },
                ],
                "select": {
                  "exist": [
                    "exclude",
                    "limit",
                    "offset",
                    "order_by",
                    "refine",
                    "select",
                    "where",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "explore",
                  "v2.1",
                  "catalog",
                  "datasets",
                  "sk-stat-56",
                  "records",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "refine",
                      "orig": "refine",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "where",
                      "orig": "where",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/explore/v2.1/catalog/datasets/sk-stat-56/exports/json",
                "segments": [
                  {
                    "lit": "explore",
                  },
                  {
                    "lit": "v2.1",
                  },
                  {
                    "lit": "catalog",
                  },
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "sk-stat-56",
                  },
                  {
                    "lit": "exports",
                  },
                  {
                    "lit": "json",
                  },
                ],
                "select": {
                  "exist": [
                    "refine",
                    "where",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "explore",
                  "v2.1",
                  "catalog",
                  "datasets",
                  "sk-stat-56",
                  "exports",
                  "json",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": ";",
                      "kind": "query",
                      "name": "delimiter",
                      "orig": "delimiter",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "refine",
                      "orig": "refine",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "where",
                      "orig": "where",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/explore/v2.1/catalog/datasets/sk-stat-56/exports/csv",
                "segments": [
                  {
                    "lit": "explore",
                  },
                  {
                    "lit": "v2.1",
                  },
                  {
                    "lit": "catalog",
                  },
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "sk-stat-56",
                  },
                  {
                    "lit": "exports",
                  },
                  {
                    "lit": "csv",
                  },
                ],
                "select": {
                  "exist": [
                    "delimiter",
                    "refine",
                    "where",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "explore",
                  "v2.1",
                  "catalog",
                  "datasets",
                  "sk-stat-56",
                  "exports",
                  "csv",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
