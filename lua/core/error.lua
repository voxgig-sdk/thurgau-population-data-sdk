-- ThurgauPopulationData SDK error

local json = require("dkjson")

local ThurgauPopulationDataError = {}
ThurgauPopulationDataError.__index = ThurgauPopulationDataError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function ThurgauPopulationDataError.new(code, msg, ctx)
  local self = setmetatable({}, ThurgauPopulationDataError)
  self.is_sdk_error = true
  self.sdk = "ThurgauPopulationData"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function ThurgauPopulationDataError:context()
  return CONTEXT[self]
end


function ThurgauPopulationDataError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function ThurgauPopulationDataError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function ThurgauPopulationDataError:to_json()
  return json.encode(self:to_table())
end


function ThurgauPopulationDataError:__tostring()
  return self.msg
end


function ThurgauPopulationDataError.__tojson(self)
  return self:to_json()
end


return ThurgauPopulationDataError
