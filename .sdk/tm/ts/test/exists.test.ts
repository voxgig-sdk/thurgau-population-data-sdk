
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ThurgauPopulationDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ThurgauPopulationDataSDK.test()
    equal(testsdk instanceof ThurgauPopulationDataSDK, true,
      'ThurgauPopulationDataSDK.test() must return a client synchronously')
  })

})
