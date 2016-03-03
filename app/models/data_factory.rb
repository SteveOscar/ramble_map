class DataFactory

  def self.relative_prices(params)
    prices = {}
    rates = ExchangeRateService.new(params).get_data["rates"]
    Country.all.each do |country|
      prices[country.map_code] = calc_relative_expense(country, rates, params) unless rates[country.currency.code].nil? || country.ppp.nil?
    end
    # set_range_for_relative_prices(prices)
    trim_outliers(prices)
  end

  def self.trim_outliers(prices)
    prices.each {|k, v| prices[k] = v / 10}
    prices
  end

  def self.calc_relative_expense(country, rates, params)
    base = Country.find(params[:country])
    exchange_rate = rates[country.currency.code]
    expense_factor = (base.ppp.to_f * exchange_rate) / country.ppp.to_f
    expense_factor.round(2)
    # (exchange_rate.to_f / country.ppp.to_f).round(2)
  end

  def self.exchange_rates(params)
    latest = {}
    rates = ExchangeRateService.new(params).get_data["rates"]
    Country.all.each do |country|
      latest[country.map_code] = rates[country.currency.code].to_s unless rates[country.currency.code].nil?
    end
    latest
  end

  def self.compare_exchange_rates(latest, params, years_back)
    date = format_date(years_back)
    old = historical_data(date, params)
    change = {}
    latest.each do |rate|
      change[rate[0]] = (((rate[1].to_f - old[rate[0]].to_f) / rate[1].to_f) * 100).round(1).to_s
    end
    change
  end

  def self.format_date(years_back)
    years_back.year.ago.strftime('%Y-%m-%d')
  end

  def self.historical_data(date, params)
    rates = {}
    rates = ExchangeRateService.new(params).get_historical_data(date)["rates"]
    Country.all.each do |country|
      rates[country.map_code] = rates[country.currency.code].to_s unless rates[country.currency.code].nil?
    end
    rates
  end

  def self.generate_title_from_params(params)
    "Perspective: #{Country.find(params[:country]).country_name}, base currency: #{Country.find(params[:country]).currency.code}"
  end

  def self.time_frame(params)
    time = "#{params[:time]} year" if params[:time] == "1"
    time = "#{params[:time]} years" if params[:time] != "1"
    time
  end

end
