require 'json'
require 'csv'

class StaticController < ApplicationController

  def welcome
    @countries = Country.all.map{|u| [ u.country_name, u.id ] }
  end

  def view
    get_region(params)
    gon.stats = @stats
  end

  private

  def get_region(params)
    world_map if params[:region] == "World"
  end

  def world_map
    @latest = DataFactory.new.exchange_rates(params)
    # @latest = {}
    # rates = ExchangeRateService.new(params).get_data["rates"]
    # Country.all.each do |country|
    #   @latest[country.map_code] = rates[country.currency.code].to_s unless rates[country.currency.code].nil?
    # end

    @stats = compare_rates(@latest)
  end

  def compare_rates(latest)
    old = HistoricalData.first[:data]
    change = {}
    latest.each do |rate|
      change[rate[0]] = ((rate[1].to_f - old[rate[0]].to_f) / rate[1].to_f).to_s[0..4]
    end
    @percent = change
    gon.percent = @percent
    set_range(change)
  end

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
