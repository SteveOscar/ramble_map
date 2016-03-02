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
    gon.percent = DataFactory.compare_exchange_rates(latest, params)
    gon.relative_prices = DataFactory.relative_prices(params)
  end

end
