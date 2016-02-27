require 'net/http'
require 'json'
require 'csv'

class Stats

  def get_data
    uri = URI('https://openexchangerates.org/api/latest.json?app_id=d89861a2fc9f4018b72156cbea82cd4a')
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

  def get_historical_data(date)
    uri = URI('http://openexchangerates.org/api/historical/' + date + '.json?app_id=d89861a2fc9f4018b72156cbea82cd4a')
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

  def country_codes

  end

end
