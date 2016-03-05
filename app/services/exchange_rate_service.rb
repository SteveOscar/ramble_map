require 'json'
require 'faraday'

class ExchangeRateService

  def initialize(params)
    @currency = Country.find(params[:country]).currency.code
    @type = params["DataType"]
  end

  def get_data
    Rails.cache.fetch("rates-for-#{@currency}", expires_in: 12.hours) do
      response = Faraday.get("https://openexchangerates.org/api/latest.json?app_id=#{ENV["OPEN_EXCHANGE_ID"]}&base=" + @currency)
      JSON.parse(response.body)
    end
  end

  def get_historical_data(date)
    Rails.cache.fetch("rates-for-#{@currency} on #{date}", expires_in: 12.hours) do
      response = Faraday.get('http://openexchangerates.org/api/historical/' + date + ".json?app_id=#{ENV["OPEN_EXCHANGE_ID"]}&base=" + @currency)
      JSON.parse(response.body)
    end
  end
end
