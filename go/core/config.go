package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ThurgauPopulationData",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://data.tg.ch/api",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"population_data": map[string]any{},
			},
		},
		"entity": map[string]any{
			"population_data": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "record",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
				},
				"name": "population_data",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "exclude",
											"orig": "exclude",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "order_by",
											"orig": "order_by",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "refine",
											"orig": "refine",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "select",
											"orig": "select",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "where",
											"orig": "where",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/explore/v2.1/catalog/datasets/sk-stat-56/records",
								"parts": []any{
									"explore",
									"v2.1",
									"catalog",
									"datasets",
									"sk-stat-56",
									"records",
								},
								"select": map[string]any{
									"exist": []any{
										"exclude",
										"limit",
										"offset",
										"order_by",
										"refine",
										"select",
										"where",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "refine",
											"orig": "refine",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "where",
											"orig": "where",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/explore/v2.1/catalog/datasets/sk-stat-56/exports/json",
								"parts": []any{
									"explore",
									"v2.1",
									"catalog",
									"datasets",
									"sk-stat-56",
									"exports",
									"json",
								},
								"select": map[string]any{
									"exist": []any{
										"refine",
										"where",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 1,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": ";",
											"kind": "query",
											"name": "delimiter",
											"orig": "delimiter",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "refine",
											"orig": "refine",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "where",
											"orig": "where",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/explore/v2.1/catalog/datasets/sk-stat-56/exports/csv",
								"parts": []any{
									"explore",
									"v2.1",
									"catalog",
									"datasets",
									"sk-stat-56",
									"exports",
									"csv",
								},
								"select": map[string]any{
									"exist": []any{
										"delimiter",
										"refine",
										"where",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
