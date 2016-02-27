require 'json'
require 'csv'
require 'faraday'

class Stats

  def get_data
    response = Faraday.get('https://openexchangerates.org/api/latest.json?app_id=d89861a2fc9f4018b72156cbea82cd4a')
    JSON.parse(response.body)
  end

  def get_historical_data(date)
    response = Faraday.get('http://openexchangerates.org/api/historical/' + date + '.json?app_id=d89861a2fc9f4018b72156cbea82cd4a')
    JSON.parse(response.body)
  end

  def country_codes

  end

end
