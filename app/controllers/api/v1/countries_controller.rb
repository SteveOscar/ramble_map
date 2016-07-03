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
    respond_with data_factory.relative_prices(params)
  end

  def combined_response
    trends = generate_data(data_factory)
    expenses = data_factory.relative_prices(params)
    results = trends.map do |trend|
      if trend.class == Array
        expense = expenses.select{ |name, one, two, three| name == trend.first }
        trend << expense[0].last if expense[0]
        trend
      else
        trend
      end
    end
    peace = data_factory.peace_index
    final_results = results[2..results.length-1].map do |trend|
      peace_score = peace.select{ |name, scores| name == trend.first }
      peace_score = 'NA' if peace_score.empty?
      peace_score == 'NA' ? trend << peace_score : trend << peace_score.values[0].last.to_i
    end
    respond_with final_results.select{ |data| data.length == 6 }
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
      country = Country.find_by(country_name: params['country'])
      currency_code = Currency.find(country.currency_id).code
      results = trends1.select{|trend| trend[0] != country.country_name}
      results.insert(0, currency_code)
      results.insert(1, country.id)
      results
    end

end
