-- ThurgauPopulationData SDK error

local ThurgauPopulationDataError = {}
ThurgauPopulationDataError.__index = ThurgauPopulationDataError


function ThurgauPopulationDataError.new(code, msg, ctx)
  local self = setmetatable({}, ThurgauPopulationDataError)
  self.is_sdk_error = true
  self.sdk = "ThurgauPopulationData"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ThurgauPopulationDataError:error()
  return self.msg
end


function ThurgauPopulationDataError:__tostring()
  return self.msg
end


return ThurgauPopulationDataError
