<?php
declare(strict_types=1);

// ThurgauPopulationData SDK configuration

class ThurgauPopulationDataConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "ThurgauPopulationData",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://data.tg.ch/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "population_data" => [],
                ],
            ],
            "entity" => [
        'population_data' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'record',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
          ],
          'name' => 'population_data',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'exclude',
                        'orig' => 'exclude',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'order_by',
                        'orig' => 'order_by',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'refine',
                        'orig' => 'refine',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'select',
                        'orig' => 'select',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'where',
                        'orig' => 'where',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/explore/v2.1/catalog/datasets/sk-stat-56/records',
                  'parts' => [
                    'explore',
                    'v2.1',
                    'catalog',
                    'datasets',
                    'sk-stat-56',
                    'records',
                  ],
                  'select' => [
                    'exist' => [
                      'exclude',
                      'limit',
                      'offset',
                      'order_by',
                      'refine',
                      'select',
                      'where',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'refine',
                        'orig' => 'refine',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'where',
                        'orig' => 'where',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/explore/v2.1/catalog/datasets/sk-stat-56/exports/json',
                  'parts' => [
                    'explore',
                    'v2.1',
                    'catalog',
                    'datasets',
                    'sk-stat-56',
                    'exports',
                    'json',
                  ],
                  'select' => [
                    'exist' => [
                      'refine',
                      'where',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'list',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => ';',
                        'kind' => 'query',
                        'name' => 'delimiter',
                        'orig' => 'delimiter',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'refine',
                        'orig' => 'refine',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'where',
                        'orig' => 'where',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/explore/v2.1/catalog/datasets/sk-stat-56/exports/csv',
                  'parts' => [
                    'explore',
                    'v2.1',
                    'catalog',
                    'datasets',
                    'sk-stat-56',
                    'exports',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'delimiter',
                      'refine',
                      'where',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ThurgauPopulationDataFeatures::make_feature($name);
    }
}
