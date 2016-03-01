require 'json'
require 'faraday'

class ExchangeRateService

  def initialize(params)
    @currency = Country.find(params[:country]).currency.code
    @type = params["DataType"]
  end

  def get_data
    response = Faraday.get("https://openexchangerates.org/api/latest.json?app_id=#{ENV["OPEN_EXCHANGE_ID"]}&base=" + @currency)
    JSON.parse(response.body)
  end

  def get_historical_data(date)
    response = Faraday.get('http://openexchangerates.org/api/historical/' + date + ".json?app_id=#{ENV["OPEN_EXCHANGE_ID"]}&base=" + @currency)
    JSON.parse(response.body)
  end
end
