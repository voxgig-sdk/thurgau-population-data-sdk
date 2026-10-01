import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "population_data",
    "accessor": "PopulationData",
    "op": "list",
    "method": "GET",
    "path": "/explore/v2.1/catalog/datasets/sk-stat-56/records",
    "args": [],
    "select": {
      "exclude": "v1",
      "limit": "v1",
      "offset": "v1",
      "order_by": "v1",
      "refine": "v1",
      "select": "v1",
      "where": "v1"
    },
    "headers": [],
    "query": [
      "select",
      "where",
      "limit",
      "offset",
      "order_by",
      "refine",
      "exclude"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "total_count": 1,
      "results": [
        {
          "record": {
            "fields": {},
            "id": "x",
            "timestamp": "2026-01-01T00:00:00Z"
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "population_data",
    "accessor": "PopulationData",
    "op": "list",
    "method": "GET",
    "path": "/explore/v2.1/catalog/datasets/sk-stat-56/exports/json",
    "args": [],
    "select": {
      "refine": "v1",
      "where": "v1"
    },
    "headers": [],
    "query": [
      "where",
      "refine"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {}
    ],
    "idField": "id"
  },
  {
    "entity": "population_data",
    "accessor": "PopulationData",
    "op": "load",
    "method": "GET",
    "path": "/explore/v2.1/catalog/datasets/sk-stat-56/exports/csv",
    "args": [],
    "select": {
      "delimiter": "v1",
      "refine": "v1",
      "where": "v1"
    },
    "headers": [],
    "query": [
      "where",
      "refine",
      "delimiter"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
