class DataFactory

  def exchange_rates(params)
    latest = {}
    rates = ExchangeRateService.new(params).get_data["rates"]
    Country.all.each do |country|
      latest[country.map_code] = rates[country.currency.code].to_s unless rates[country.currency.code].nil?
    end
    latest
  end

  def compare(latest, params)
    date = format_date(params)
    old = historical_data(date, params)
    change = {}
    latest.each do |rate|
      change[rate[0]] = ((rate[1].to_f - old[rate[0]].to_f) / rate[1].to_f).to_s[0..4]
    end
    change
  end

  def format_date(params)
    params["time"].to_i.year.ago.strftime('%Y-%m-%d')
  end

  def historical_data(date, params)
    rates = {}
    rates = ExchangeRateService.new(params).get_historical_data(date)["rates"]
    Country.all.each do |country|
      rates[country.map_code] = rates[country.currency.code].to_s unless rates[country.currency.code].nil?
    end
    rates
  end

  # Breaks up the data for the colorscale on the map.
  def set_range(change)
    data = {}
    change.each do |rate|
      diff = rate[1].to_f
      data[rate[0]] = 1 if diff < -0.1
      data[rate[0]] = 2 if diff >= -0.1 && diff < 0
      data[rate[0]] = 3 if diff > 0 && diff < 0.01
      data[rate[0]] = 4 if diff >= 0.01 && diff < 0.02
      data[rate[0]] = 5 if diff >= 0.02 && diff < 0.03
      data[rate[0]] = 1 if diff >= 0.03
    end
    data
  end


end
