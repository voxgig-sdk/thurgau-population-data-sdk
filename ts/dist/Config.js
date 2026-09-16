"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'ThurgauPopulationData',
        slug: "thurgau-population-data",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
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
        retry: {
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
        test: {
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
        timeout: {
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
    };
    options = {
        base: "https://data.tg.ch/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            population_data: {},
        }
    };
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
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map