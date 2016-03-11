require 'json'
require 'csv'

class MapController < ApplicationController
  attr_reader :data_factory
  before_action :save_search_values, only: :ramble_map
  before_action :ua_firefox?
  caches_page :welcome

  def welcome
    session[:tweeted] = false
    @countries = Country.all.order(:country_name).map{|u| [ u.country_name, u.id ] }
  end

  def ramble_map
    @data_factory = DataFactory.new(params)
    @map = params["region"]
    @title = data_factory.generate_title_from_params(params)
    @country = Country.find(params["country"]).country_name
    generate_map_data
  end

  private

  def generate_map_data
    gon.country = @country
    gon.region = params["region"].gsub("-", "_")
    gon.relative_expenses = data_factory.relative_prices(params)
    gon.peace_index = data_factory.peace_index
    generate_yearly_currency_trends(data_factory.exchange_rates(params))
  end

  def generate_yearly_currency_trends(latest)
    gon.percent_one_year = data_factory.compare_exchange_rates(latest, params, 1)
    gon.percent_two_years = data_factory.compare_exchange_rates(latest, params, 2)
    gon.percent_three_years = data_factory.compare_exchange_rates(latest, params, 3)
    gon.percent_max = gon.percent_two_years.sort_by{|k, v| -v.to_f}[3].last.to_i
    gon.percent_min = gon.percent_two_years.sort_by{|k, v| v.to_f}[3].last.to_i
    @stats = data_factory.stat_card_data(gon.percent_one_year, gon.relative_expenses)
  end

  def save_search_values
    session[:country] = params["country"]
    session[:region] = params["region"]
  end

end
