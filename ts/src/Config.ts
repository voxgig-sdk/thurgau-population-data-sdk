
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'ThurgauPopulationData',
        slug: "thurgau-population-data",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://data.tg.ch/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      population_data: {
      },

    }
  }


  entity = {
    "population_data": {
      "fields": [
        {
          "name": "record",
          "type": "`$OBJECT`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "order_by",
                    "orig": "order_by",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "refine",
                    "orig": "refine",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "select",
                    "orig": "select",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "where",
                    "orig": "where",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/explore/v2.1/catalog/datasets/sk-stat-56/records",
              "segments": [
                {
                  "lit": "explore"
                },
                {
                  "lit": "v2.1"
                },
                {
                  "lit": "catalog"
                },
                {
                  "lit": "datasets"
                },
                {
                  "lit": "sk-stat-56"
                },
                {
                  "lit": "records"
                }
              ],
              "select": {
                "exist": [
                  "exclude",
                  "limit",
                  "offset",
                  "order_by",
                  "refine",
                  "select",
                  "where"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "explore",
                "v2.1",
                "catalog",
                "datasets",
                "sk-stat-56",
                "records"
              ]
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "refine",
                    "orig": "refine",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "where",
                    "orig": "where",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/explore/v2.1/catalog/datasets/sk-stat-56/exports/json",
              "segments": [
                {
                  "lit": "explore"
                },
                {
                  "lit": "v2.1"
                },
                {
                  "lit": "catalog"
                },
                {
                  "lit": "datasets"
                },
                {
                  "lit": "sk-stat-56"
                },
                {
                  "lit": "exports"
                },
                {
                  "lit": "json"
                }
              ],
              "select": {
                "exist": [
                  "refine",
                  "where"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "explore",
                "v2.1",
                "catalog",
                "datasets",
                "sk-stat-56",
                "exports",
                "json"
              ]
            }
          ]
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "refine",
                    "orig": "refine",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "where",
                    "orig": "where",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/explore/v2.1/catalog/datasets/sk-stat-56/exports/csv",
              "segments": [
                {
                  "lit": "explore"
                },
                {
                  "lit": "v2.1"
                },
                {
                  "lit": "catalog"
                },
                {
                  "lit": "datasets"
                },
                {
                  "lit": "sk-stat-56"
                },
                {
                  "lit": "exports"
                },
                {
                  "lit": "csv"
                }
              ],
              "select": {
                "exist": [
                  "delimiter",
                  "refine",
                  "where"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "explore",
                "v2.1",
                "catalog",
                "datasets",
                "sk-stat-56",
                "exports",
                "csv"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

