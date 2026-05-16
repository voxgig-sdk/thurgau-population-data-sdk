# ThurgauPopulationData SDK utility: make_context
require_relative '../core/context'
module ThurgauPopulationDataUtilities
  MakeContext = ->(ctxmap, basectx) {
    ThurgauPopulationDataContext.new(ctxmap, basectx)
  }
end
