require 'json'
require 'csv'

class StaticController < ApplicationController

  def welcome
    @countries = Country.all.order(:country_name).map{|u| [ u.country_name, u.id ] }
  end

  def display_map
    generate_map_data
    @map = get_region(params)
    gon.stats = @stats
  end

  private

  def get_region(params)
    region = 'world-map' if params[:region] == "World"
    region = 'europe-map' if params[:region] == "Europe"
    region = 'south-america-map' if params[:region] == "South America"
    region = 'north-america-map' if params[:region] == "North America"
    region = 'asia-map' if params[:region] == "Asia"
    region = 'oceana-map' if params[:region] == "Oceana"
    region = 'africa-map' if params[:region] == "Africa"
    region
  end

  def generate_map_data
    @latest = DataFactory.new.exchange_rates(params)
    @stats = compare_rates(@latest)
  end

  def compare_rates(latest)
    changes_in_rates = DataFactory.new.compare(latest, params)
    gon.percent = changes_in_rates
    DataFactory.new.set_range(changes_in_rates)
  end

end
