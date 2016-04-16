class Api::V1::CountriesController < Api::V1::BaseController
  respond_to :json
  before_filter :setup, except: :index
  attr_reader :data_factory

  def index
    respond_with Country.all
  end

  # Might use this action later
  # def show
  #   generate_data
  #   respond_with @stats
  # end

  def trends
    generate_data(data_factory)
    respond_with @exchange_trend
  end

  def expenses
    params[:id] = Country.find_by(country_name: params["country"]).id
    respond_with data_factory.relative_prices(params)
  end

  private

    def setup
      params[:id] = Country.find_by(country_name: params["country"]).id
      @data_factory = APIDataFactory.new(params)
    end

    def generate_data(data_factory)
      @relative_expenses = data_factory.relative_prices(params)
      generate_yearly_currency_trends(data_factory.exchange_rates(params), @relative_expenses)
    end

    def generate_yearly_currency_trends(latest, relative_expenses)
      time = params["year"].to_i || 1
      @exchange_trend = data_factory.compare_exchange_rates(latest, params, time)
      # @stats = data_factory.stat_card_data(@exchange_trend, relative_expenses)
    end

end
