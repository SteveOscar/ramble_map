require 'test_helper'

class DataFactoryTest < ActiveSupport::TestCase
  attr_reader :params, :df, :rates

  def setup
    @params = {utf8: "✓", country: "128",
              region: "south_america",
              commit: "Submit", controller: "map",
              action: "ramble_map"}

    @df = DataFactory.new(@params)
    VCR.use_cassette('rates_for_data_factory') do
      @rates = ExchangeRateService.new(params).get_data["rates"]
    end
  end

  test "data relative prices" do
    VCR.use_cassette('df_relative_prices') do
      relative_prices = df.relative_prices(params)
      assert_equal 163, relative_prices.count
    end
  end

  test "data relative expenses" do
    VCR.use_cassette('relative_expenses') do
      country = Country.find(51)
      relative_expenses = df.calc_relative_expense(country, rates, params)
      assert relative_expenses
      assert_equal 2.48, relative_expenses
    end
  end

  test "data exchange rates" do
    countries = Country.includes(:currency).all
    exchange_rates = df.exchange_rates(params)
    assert exchange_rates
    assert_equal ["FK", "0.08320955"], exchange_rates.first
  end

  # Also hits format_date and historical_data methods
  test "compare_exchange_rates" do
    countries = Country.includes(:currency).all
    exchange_rates = df.exchange_rates(params)
    assert exchange_rates
    assert_equal ["FK", "0.08320955"], exchange_rates.first

    VCR.use_cassette('historical_data') do
      compared = df.compare_exchange_rates(exchange_rates, params, 2)
      assert compared
      assert_equal ["FK", "-13.3"], compared.first
    end
  end

  test "peace index" do
    index = df.peace_index
    assert index
    assert_equal ["ME", ["1.854", "57"]], index.first
  end


end
