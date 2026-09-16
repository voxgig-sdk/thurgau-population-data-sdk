# ThurgauPopulationData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ThurgauPopulationDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      ThurgauPopulationDataBaseFeature.new
    when "ratelimit"
      ThurgauPopulationDataRatelimitFeature.new
    when "retry"
      ThurgauPopulationDataRetryFeature.new
    when "test"
      ThurgauPopulationDataTestFeature.new
    when "timeout"
      ThurgauPopulationDataTimeoutFeature.new
    else
      ThurgauPopulationDataBaseFeature.new
    end
  end
end
