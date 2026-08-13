
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { ThurgauPopulationDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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
      if (maybeSkipControl(t, 'entityOp', 'population_data.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set THURGAU_POPULATION_DATA_TEST_POPULATION_DATA_ENTID JSON to run live')
      return
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['THURGAU_POPULATION_DATA_TEST_POPULATION_DATA_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'THURGAU_POPULATION_DATA_TEST_POPULATION_DATA_ENTID': idmap,
    'THURGAU_POPULATION_DATA_TEST_LIVE': 'FALSE',
    'THURGAU_POPULATION_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['THURGAU_POPULATION_DATA_TEST_POPULATION_DATA_ENTID']

  const live = 'TRUE' === env.THURGAU_POPULATION_DATA_TEST_LIVE

  if (live) {
    client = new ThurgauPopulationDataSDK(merge([
      {
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
