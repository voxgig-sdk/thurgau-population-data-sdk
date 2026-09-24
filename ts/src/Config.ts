
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "title": "Record",
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
              "parts": [
                "explore",
                "v2.1",
                "catalog",
                "datasets",
                "sk-stat-56",
                "records"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "args": {
                "query": [
                  {
                    "name": "exclude",
                    "orig": "exclude",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 10
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  },
                  {
                    "name": "order_by",
                    "orig": "order_by",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "refine",
                    "orig": "refine",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "select",
                    "orig": "select",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "where",
                    "orig": "where",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
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
              }
            },
            {
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
              "parts": [
                "explore",
                "v2.1",
                "catalog",
                "datasets",
                "sk-stat-56",
                "exports",
                "json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "refine",
                    "orig": "refine",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "where",
                    "orig": "where",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "refine",
                  "where"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
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
              "parts": [
                "explore",
                "v2.1",
                "catalog",
                "datasets",
                "sk-stat-56",
                "exports",
                "csv"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "delimiter",
                    "orig": "delimiter",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ";"
                  },
                  {
                    "name": "refine",
                    "orig": "refine",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "where",
                    "orig": "where",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "delimiter",
                  "refine",
                  "where"
                ]
              }
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

