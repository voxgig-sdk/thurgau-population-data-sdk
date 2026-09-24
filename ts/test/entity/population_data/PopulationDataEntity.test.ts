

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"record":{"a":true,"h":"Record","n":"record","r":false,"t":"`$OBJECT`","key$":"record","index$":0}},"name":"population_data","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /explore/v2.1/catalog/datasets/sk-stat-56/records","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"exclude","or":"exclude","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"order_by","or":"order_by","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"refine","or":"refine","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"select","or":"select","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"where","or":"where","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/explore/v2.1/catalog/datasets/sk-stat-56/records","q":{"exist":["exclude","limit","offset","order_by","refine","select","where"]},"r":{},"s":[{"lit":"explore"},{"lit":"v2.1"},{"lit":"catalog"},{"lit":"datasets"},{"lit":"sk-stat-56"},{"lit":"records"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0},{"a":true,"co":{"id":"GET /explore/v2.1/catalog/datasets/sk-stat-56/exports/json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"refine","or":"refine","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"where","or":"where","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/explore/v2.1/catalog/datasets/sk-stat-56/exports/json","q":{"exist":["refine","where"]},"r":{},"s":[{"lit":"explore"},{"lit":"v2.1"},{"lit":"catalog"},{"lit":"datasets"},{"lit":"sk-stat-56"},{"lit":"exports"},{"lit":"json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /explore/v2.1/catalog/datasets/sk-stat-56/exports/csv","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":";","k":"query","n":"delimiter","or":"delimiter","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"refine","or":"refine","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"where","or":"where","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/explore/v2.1/catalog/datasets/sk-stat-56/exports/csv","q":{"exist":["delimiter","refine","where"]},"r":{},"s":[{"lit":"explore"},{"lit":"v2.1"},{"lit":"catalog"},{"lit":"datasets"},{"lit":"sk-stat-56"},{"lit":"exports"},{"lit":"csv"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"population_data","name__orig":"population_data","Name":"PopulationData","name_":"population_data","name-":"population-data","NAME":"POPULATION_DATA","index$":0}, {"active":true,"entity":"population_data","key$":"BasicPopulationDataFlow","kind":"basic","name":"BasicPopulationDataFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"population_data_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"population_data_ref01","srcdatavar":"population_data_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-population_data_ref01"}}],"index$":1}]}, 'PopulationData', {"GET /explore/v2.1/catalog/datasets/sk-stat-56/records":{"protocol":"http","operationId":"getPopulationRecords","responses":{"200":{"description":"Successful response with population records","content":{"application/json":{"schema":{"type":"object","properties":{"total_count":{"description":"Total number of records matching the query","key$":"total_count","type":"integer"},"results":{"items":{"properties":{"record":{"properties":{"fields":{"description":"Population data fields including municipality, year, population counts, and demographic breakdowns","type":"object"},"id":{"description":"Unique record identifier","type":"string"},"timestamp":{"description":"Record timestamp","format":"date-time","type":"string"}},"type":"object","key$":"record"}},"type":"object","index$":0},"key$":"results","type":"array"}}}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}},"404":{"description":"Dataset not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}}},"parameters":[{"name":"select","in":"query","description":"Fields to include in the response","required":false,"schema":{"type":"string"},"index$":0},{"name":"where","in":"query","description":"Filter expression to apply to records","required":false,"schema":{"type":"string"},"index$":1},{"name":"limit","in":"query","description":"Maximum number of records to return","required":false,"schema":{"type":"integer","default":10,"maximum":100},"index$":2},{"name":"offset","in":"query","description":"Number of records to skip for pagination","required":false,"schema":{"type":"integer","default":0},"index$":3},{"name":"order_by","in":"query","description":"Field(s) to order results by","required":false,"schema":{"type":"string"},"index$":4},{"name":"refine","in":"query","description":"Refine results by specific facet values","required":false,"schema":{"type":"string"},"index$":5},{"name":"exclude","in":"query","description":"Exclude specific facet values from results","required":false,"schema":{"type":"string"},"index$":6}],"securitySource":"unspecified"},"GET /explore/v2.1/catalog/datasets/sk-stat-56/exports/json":{"protocol":"http","operationId":"exportPopulationJSON","responses":{"200":{"description":"Successful export of population data","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"Population record with all available fields","key$":"items"}}}}},"400":{"description":"Bad request - invalid parameters"},"404":{"description":"Dataset not found"}},"parameters":[{"name":"where","in":"query","description":"Filter expression to apply to exported records","required":false,"schema":{"type":"string"},"index$":0},{"name":"refine","in":"query","description":"Refine export by specific facet values","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"},"GET /explore/v2.1/catalog/datasets/sk-stat-56/exports/csv":{"protocol":"http","operationId":"exportPopulationCSV","responses":{"200":{"description":"Successful export of population data","content":{"text/csv":{"schema":{"type":"string","description":"CSV formatted population data"}}}},"400":{"description":"Bad request - invalid parameters"},"404":{"description":"Dataset not found"}},"parameters":[{"name":"where","in":"query","description":"Filter expression to apply to exported records","required":false,"schema":{"type":"string"},"index$":0},{"name":"refine","in":"query","description":"Refine export by specific facet values","required":false,"schema":{"type":"string"},"index$":1},{"name":"delimiter","in":"query","description":"CSV delimiter character","required":false,"schema":{"type":"string","default":";"},"index$":2}],"securitySource":"unspecified"}})
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
  
