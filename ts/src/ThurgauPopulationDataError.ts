
import { Context } from './Context'


class ThurgauPopulationDataError extends Error {

  isThurgauPopulationDataError = true

  sdk = 'ThurgauPopulationData'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ThurgauPopulationDataError
}

