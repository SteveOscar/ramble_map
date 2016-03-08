require 'test_helper'

class DataFactoryTest < ActiveSupport::TestCase
  test "data factory method responses" do
    params = {utf8: "✓", country: "128",
              region: "south_america",
              commit: "Submit", controller: "map",
              action: "currency_map"}

    df = DataFactory.new(params)

    VCR.use_cassette('df_relative_prices') do
      relative_prices = df.relative_prices(params)
      assert_equal 163, relative_prices.count
    end

    # VCR.use_cassette('df_relative_prices') do
    #   relative_prices = df.relative_prices(params)
    #   assert_equal 163, relative_prices.count
    # end

  end
end
