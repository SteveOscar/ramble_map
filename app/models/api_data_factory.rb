class APIDataFactory
  attr_reader :countries, :rates, :base_country, :country_names

  def initialize(params)
    @countries = Rails.cache.fetch("#{:updated_at}/countries_and_currency") do
      Country.includes(:currency).all
    end
    @rates = ExchangeRateService.new(params).get_data["rates"]
    if !params[:id].nil?
      @base_country = Country.includes(:currency).find(params[:id])
    else
      @base_country = Country.includes(:currency).find(params[:country])
    end
    remove_outliers
  end

  def relative_prices(params)
    prices = countries.each_with_object({}) do |country, hash|
      hash[country.country_name] = calc_relative_expense(country, rates, params) unless rates[country.currency.code].nil? || country.ppp.nil?
    end
  end

  def calc_relative_expense(country, rates, params)
    exchange_rate = rates[country.currency.code]
    expense_factor = (base_country.ppp.to_f * exchange_rate) / country.ppp.to_f
    expense_factor.round(2)
  end

  def exchange_rates(params)
    countries.each_with_object({}) do |country, hash|
      hash[country.country_name] = rates[country.currency.code].to_s unless rates[country.currency.code].nil?
    end
  end

  def compare_exchange_rates(latest, params, years_back)
    date = format_date(years_back)
    old = historical_data(date, params)
    results = latest.each_with_object({}) do |rate, hash|
      hash[rate[0]] = (((rate[1].to_f - old[rate[0]].to_f) / rate[1].to_f) * 100).round(1).to_s
    end
    results.sort_by{|k, v| v.to_f}
  end

  def format_date(years_back)
    years_back.year.ago.strftime('%Y-%m-%d')
  end

  def historical_data(date, params)
    rates = ExchangeRateService.new(params).get_historical_data(date)["rates"]
    countries.each_with_object({}) do |country, hash|
      hash[country.country_name] = rates[country.currency.code].to_s unless rates[country.currency.code].nil?
    end
  end

  def peace_index
    countries.each_with_object({}) do |country, hash|
      hash[country.country_name] = [country.peace_score.to_s, country.peace_rank.to_s] unless country.peace_score.nil?
    end
  end

  def country_names
    Hash[countries.pluck(:country_name).zip(countries.pluck(:country_name))]
  end

  def stat_card_data(currency_trends, country_expenses)
    stats = {"cheap": [], "expensive": [], "highest_price": [], "lowest_price": [] }
    rate_trends = currency_trends.sort_by{|k, v| v.to_f}
    rate_trends[0..4].each {|data| stats[:expensive] << [country_names[data.first], data.last] }
    rate_trends[-5..-1].each {|data| stats[:cheap] << [country_names[data.first], data.last] }
    expense = country_expenses.sort_by{|k, v| v.to_f}
    expense[0..4].each {|data| stats[:highest_price] << country_names[data.first] }
    expense.reverse[0..4].each {|data| stats[:lowest_price] << country_names[data.first] }
    stats
  end

  def remove_outliers
    rates.delete("SOS")
    country_names.delete("XS")
    country_names.delete("SO") #remove Somalia from report, an extreme outlier
  end
end
