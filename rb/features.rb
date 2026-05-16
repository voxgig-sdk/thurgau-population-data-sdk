# ThurgauPopulationData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ThurgauPopulationDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      ThurgauPopulationDataBaseFeature.new
    when "test"
      ThurgauPopulationDataTestFeature.new
    else
      ThurgauPopulationDataBaseFeature.new
    end
  end
end
