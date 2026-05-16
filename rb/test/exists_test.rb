# ThurgauPopulationData SDK exists test

require "minitest/autorun"
require_relative "../ThurgauPopulationData_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ThurgauPopulationDataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
