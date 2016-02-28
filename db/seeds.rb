require 'csv'

class Seed

  def initialize
    currency_codes
    country_data
    historical_data
  end

  def currency_codes
    data = CSV.read("./public/currencies.csv")
    data.each do |code|
      Currency.create(code: code[0])
      puts "made currency code #{code[0]}"
    end
  end

  def country_data
    data = CSV.read("./public/currency_and_map.csv")
    data.each do |country|
      input = country.first.split("\t")
      Country.create(country_name: input[0],
                     map_code: input[2],
                     currency_id: Currency.find_by(code: input[1]).id)
      puts "created #{input[0]}"
    end
  end

  def historical_data
    @stats = {}
    rates = ExchangeRateService.new.get_historical_data('2015-02-16')["rates"]
    Country.all.each do |country|
      @stats[country.map_code] = rates[country.currency.code].to_s unless rates[country.currency.code].nil?
    end
    HistoricalData.create(date: "2015-02-16", data: @stats)
  end


end

Seed.new
