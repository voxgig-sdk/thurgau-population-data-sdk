<?php
declare(strict_types=1);

// ThurgauPopulationData SDK configuration

class ThurgauPopulationDataConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
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
              'name' => 'record',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'population_data',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'exclude',
                        'orig' => 'exclude',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'order_by',
                        'orig' => 'order_by',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'refine',
                        'orig' => 'refine',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'select',
                        'orig' => 'select',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'where',
                        'orig' => 'where',
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
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'refine',
                        'orig' => 'refine',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'where',
                        'orig' => 'where',
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
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => ';',
                        'kind' => 'query',
                        'name' => 'delimiter',
                        'orig' => 'delimiter',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'refine',
                        'orig' => 'refine',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'where',
                        'orig' => 'where',
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
                ],
              ],
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
