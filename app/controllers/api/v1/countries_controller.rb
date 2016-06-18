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
    data = generate_data(data_factory)
    respond_with data
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
      trends1 = data_factory.compare_exchange_rates(latest, params, 1)
      trends2 = data_factory.compare_exchange_rates(latest, params, 2)
      trends3 = data_factory.compare_exchange_rates(latest, params, 3)
      compile_trends_by_country(trends1, trends2, trends3)
      # @stats = data_factory.stat_card_data(@exchange_trends, relative_expenses)
    end

    def compile_trends_by_country(trends1, trends2, trends3)
      trends1.each_with_index do |trend, i|
        rate2 = trends2.select {|country, rate| country == trend.first }
        trend << rate2.first.last
        rate3 = trends3.select {|country, rate| country == trend.first }
        trend << rate3.first.last
      end
      trends1
    end

end
