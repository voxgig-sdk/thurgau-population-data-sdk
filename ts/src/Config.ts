
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ThurgauPopulationData',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
              "parts": [
                "explore",
                "v2.1",
                "catalog",
                "datasets",
                "sk-stat-56",
                "records"
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
              }
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
              "parts": [
                "explore",
                "v2.1",
                "catalog",
                "datasets",
                "sk-stat-56",
                "exports",
                "json"
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
              }
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
              "parts": [
                "explore",
                "v2.1",
                "catalog",
                "datasets",
                "sk-stat-56",
                "exports",
                "csv"
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
  config
}

