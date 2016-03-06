require 'json'
require 'csv'

class MapController < ApplicationController
  attr_reader :data_factory

  def welcome
    @countries = Country.all.order(:country_name).map{|u| [ u.country_name, u.id ] }
  end

  def currency_map
    generate_map_data
    @map = params["region"]
    @title = data_factory.generate_title_from_params(params)
    @country = Country.find(params["country"]).country_name
    gon.country = @country
    gon.region = params["region"].gsub("-", "_")
  end

  private

  def generate_map_data
    @data_factory = DataFactory.new(params)
    latest = data_factory.exchange_rates(params)
    gon.relative_expenses = data_factory.relative_prices(params)
    gon.expenses_max = gon.relative_expenses.sort_by{|k, v| -v.to_f}[2].last.to_f.round(4)
    gon.expenses_min = gon.relative_expenses.sort_by{|k, v| v.to_f}[2].last.to_f.round(4)
    currency_trends = data_factory.compare_exchange_rates(latest, params, 1)
    generate_yearly_currency_trends(latest, currency_trends)
    @stats = data_factory.stat_card_data(currency_trends, gon.relative_expenses)
  end

  def generate_yearly_currency_trends(latest, currency_trends)
    gon.percent_one_year = currency_trends
    gon.percent_two_years = data_factory.compare_exchange_rates(latest, params, 2)
    gon.percent_three_years = data_factory.compare_exchange_rates(latest, params, 3)
    gon.percent_max = gon.percent_two_years.sort_by{|k, v| -v.to_f}[3].last.to_i
    gon.percent_min = gon.percent_two_years.sort_by{|k, v| v.to_f}[3].last.to_i
    gon.peace_index = data_factory.peace_index
  end
end
