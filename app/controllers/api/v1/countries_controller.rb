class Api::V1::CountriesController < Api::V1::BaseController
  respond_to :json


  attr_reader :data_factory

  def index
    respond_with Country.all
  end

  def show
    @country = Country.find(params["id"])
    respond_with @country
  end

  def ramble_map
    @data_factory = DataFactory.new(params)
    @map = params["region"]
    @country = Country.find(params["country"]).country_name
    generate_map_data
  end

  private

  def generate_map_data
    country = @country
    region = params["region"].gsub("-", "_")
    relative_expenses = data_factory.relative_prices(params)
    peace_index = data_factory.peace_index
    generate_yearly_currency_trends(data_factory.exchange_rates(params))
  end

  def generate_yearly_currency_trends(latest)
    percent_one_year = data_factory.compare_exchange_rates(latest, params, 1)
    percent_two_years = data_factory.compare_exchange_rates(latest, params, 2)
    percent_three_years = data_factory.compare_exchange_rates(latest, params, 3)
    percent_max = percent_two_years.sort_by{|k, v| -v.to_f}[3].last.to_i
    percent_min = percent_two_years.sort_by{|k, v| v.to_f}[3].last.to_i
    @stats = data_factory.stat_card_data(percent_one_year, relative_expenses)
  end

  def save_search_values
    session[:country] = params["country"]
    session[:region] = params["region"]
  end

  def idea_params
    params.require(:idea).permit(:id, :title, :body, :quality)
  end
end
