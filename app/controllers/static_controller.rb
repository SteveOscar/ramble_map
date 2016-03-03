require 'json'
require 'csv'

class StaticController < ApplicationController

  def welcome
    @countries = Country.all.order(:country_name).map{|u| [ u.country_name, u.id ] }
  end

  def currency_map
    generate_map_data
    @country = params["country"]
    @map = params["region"]
    @title = DataFactory.generate_title_from_params(params)
    gon.region = params["region"]
  end

  private

  def get_region(params)
    region = 'world-map' if params[:region] == "world"
    region = 'europe-map' if params[:region] == "Europe"
    region = 'south-america-map' if params[:region] == "South America"
    region = 'north-america-map' if params[:region] == "North America"
    region = 'asia-map' if params[:region] == "Asia"
    region = 'oceana-map' if params[:region] == "Oceana"
    region = 'africa-map' if params[:region] == "Africa"
    region
  end

  def generate_map_data
    latest = DataFactory.exchange_rates(params)
    gon.relative_expenses = DataFactory.relative_prices(params)
    gon.expenses_max = gon.relative_expenses.sort_by{|k, v| -v.to_f}[3].last.to_f.round(4)
    gon.expenses_min = gon.relative_expenses.sort_by{|k, v| v.to_f}[3].last.to_f.round(4)
    generate_yearly_currency_trends(latest)
  end

  def generate_yearly_currency_trends(latest)
    gon.percent_one_year = DataFactory.compare_exchange_rates(latest, params, 1)
    gon.percent_two_years = DataFactory.compare_exchange_rates(latest, params, 2)
    gon.percent_three_years = DataFactory.compare_exchange_rates(latest, params, 3)
    gon.percent_max = gon.percent_two_years.sort_by{|k, v| -v.to_f}[3].last.to_i
    gon.percent_min = gon.percent_two_years.sort_by{|k, v| v.to_f}[3].last.to_i
  end

end
