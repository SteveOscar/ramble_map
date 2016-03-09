require 'test_helper'

class ExchangeRateServiceTest < ActiveSupport::TestCase
  attr_reader :service

  def setup
    params = {utf8: "✓", country: "128",
              region: "south_america",
              commit: "Submit", controller: "map",
              action: "ramble_map"}
    @service = ExchangeRateService.new(params)
  end

  test '#get_data' do
    VCR.use_cassette('ers_get_data') do
      data = @service.get_data

      assert_equal 171, data["rates"].count
    end
  end

  test '#get_historical' do
    VCR.use_cassette('ers_get_historical_data') do
      data1 = @service.get_historical_data("2015-03-08")
      data2 = @service.get_historical_data("2014-03-08")

      refute_equal data2["rates"]["AED"], data1["rates"]["AED"]
    end
  end

end
