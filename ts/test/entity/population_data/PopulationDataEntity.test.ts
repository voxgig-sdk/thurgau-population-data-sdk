

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ThurgauPopulationDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('PopulationDataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when THURGAU_POPULATION_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('THURGAU_POPULATION_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ThurgauPopulationDataSDK.test()
    const ent = testsdk.PopulationData()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.THURGAU_POPULATION_DATA_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'population_data.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"record","req":false,"type":"`$OBJECT`","index$":0}],"name":"population_data","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"exclude","orig":"exclude","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"order_by","orig":"order_by","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"refine","orig":"refine","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"kind":"query","name":"select","orig":"select","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"where","orig":"where","reqd":false,"type":"`$STRING`","index$":6}]},"contract":{"id":"GET /explore/v2.1/catalog/datasets/sk-stat-56/records","json":"{\"operationId\":\"getPopulationRecords\",\"parameters\":[{\"description\":\"Fields to include in the response\",\"in\":\"query\",\"name\":\"select\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter expression to apply to records\",\"in\":\"query\",\"name\":\"where\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum number of records to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"type\":\"integer\"}},{\"description\":\"Number of records to skip for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Field(s) to order results by\",\"in\":\"query\",\"name\":\"order_by\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Refine results by specific facet values\",\"in\":\"query\",\"name\":\"refine\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Exclude specific facet values from results\",\"in\":\"query\",\"name\":\"exclude\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"results\":{\"items\":{\"properties\":{\"record\":{\"properties\":{\"fields\":{\"description\":\"Population data fields including municipality, year, population counts, and demographic breakdowns\",\"type\":\"object\"},\"id\":{\"description\":\"Unique record identifier\",\"type\":\"string\"},\"timestamp\":{\"description\":\"Record timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"total_count\":{\"description\":\"Total number of records matching the query\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with population records\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Dataset not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/explore/v2.1/catalog/datasets/sk-stat-56/records","segments":[{"lit":"explore"},{"lit":"v2.1"},{"lit":"catalog"},{"lit":"datasets"},{"lit":"sk-stat-56"},{"lit":"records"}],"select":{"exist":["exclude","limit","offset","order_by","refine","select","where"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"refine","orig":"refine","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"where","orig":"where","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /explore/v2.1/catalog/datasets/sk-stat-56/exports/json","json":"{\"operationId\":\"exportPopulationJSON\",\"parameters\":[{\"description\":\"Filter expression to apply to exported records\",\"in\":\"query\",\"name\":\"where\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Refine export by specific facet values\",\"in\":\"query\",\"name\":\"refine\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Population record with all available fields\",\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful export of population data\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"404\":{\"description\":\"Dataset not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/explore/v2.1/catalog/datasets/sk-stat-56/exports/json","segments":[{"lit":"explore"},{"lit":"v2.1"},{"lit":"catalog"},{"lit":"datasets"},{"lit":"sk-stat-56"},{"lit":"exports"},{"lit":"json"}],"select":{"exist":["refine","where"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":";","kind":"query","name":"delimiter","orig":"delimiter","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"refine","orig":"refine","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"where","orig":"where","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /explore/v2.1/catalog/datasets/sk-stat-56/exports/csv","json":"{\"operationId\":\"exportPopulationCSV\",\"parameters\":[{\"description\":\"Filter expression to apply to exported records\",\"in\":\"query\",\"name\":\"where\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Refine export by specific facet values\",\"in\":\"query\",\"name\":\"refine\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"CSV delimiter character\",\"in\":\"query\",\"name\":\"delimiter\",\"required\":false,\"schema\":{\"default\":\";\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/csv\":{\"schema\":{\"description\":\"CSV formatted population data\",\"type\":\"string\"}}},\"description\":\"Successful export of population data\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"404\":{\"description\":\"Dataset not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/explore/v2.1/catalog/datasets/sk-stat-56/exports/csv","segments":[{"lit":"explore"},{"lit":"v2.1"},{"lit":"catalog"},{"lit":"datasets"},{"lit":"sk-stat-56"},{"lit":"exports"},{"lit":"csv"}],"select":{"exist":["delimiter","refine","where"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"population_data","name__orig":"population_data","Name":"PopulationData","name_":"population_data","name-":"population-data","NAME":"POPULATION_DATA","index$":0}, {"active":true,"entity":"population_data","key$":"BasicPopulationDataFlow","kind":"basic","name":"BasicPopulationDataFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"population_data_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"population_data_ref01","srcdatavar":"population_data_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-population_data_ref01"}}],"index$":1}]}, 'PopulationData')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let population_data_ref01_data = Object.values(setup.data.existing.population_data)[0] as any

    // LIST
    const population_data_ref01_ent = client.PopulationData()
    const population_data_ref01_match: any = {}

    const population_data_ref01_list = (await population_data_ref01_ent.list(population_data_ref01_match)).map((e: any) => e.data())


    // LOAD
    const population_data_ref01_match_dt0: any = {}
    const population_data_ref01_data_dt0 = (await population_data_ref01_ent.load(population_data_ref01_match_dt0)).data()
    assert(null != population_data_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/population_data/PopulationDataTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ThurgauPopulationDataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['population_data01','population_data02','population_data03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'THURGAU_POPULATION_DATA_TEST_POPULATION_DATA_ENTID': idmap,
    'THURGAU_POPULATION_DATA_TEST_LIVE': 'FALSE',
    'THURGAU_POPULATION_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['THURGAU_POPULATION_DATA_TEST_POPULATION_DATA_ENTID']

  const live = 'TRUE' === env.THURGAU_POPULATION_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['THURGAU_POPULATION_DATA_TEST_POPULATION_DATA_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ThurgauPopulationDataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.THURGAU_POPULATION_DATA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
