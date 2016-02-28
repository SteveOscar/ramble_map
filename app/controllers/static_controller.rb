require 'json'
require 'csv'

class StaticController < ApplicationController

  def welcome
    @countries = Country.all.map{|u| [ u.country_name, u.id ] }
  end

  def view
    world_map
    @map = get_region(params)
    gon.stats = @stats
  end

  private

  def get_region(params)
    'world-map' if params[:region] == "World"
    'europe-map' if params[:region] == "Europe"
  end

  def world_map
    @latest = DataFactory.new.exchange_rates(params)
    @stats = compare_rates(@latest)
  end

  def compare_rates(latest)
    changes_in_rates = DataFactory.new.compare(latest)
    gon.percent = changes_in_rates
    DataFactory.new.set_range(changes_in_rates)
  end

end
