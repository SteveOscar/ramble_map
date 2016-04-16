class Api::V1::CountriesController < Api::V1::BaseController
  respond_to :json
  attr_reader :data_factory

  def index
    respond_with Country.all
  end

  def show
    @country = Country.find(params["id"])
    @data_factory = DataFactory.new(params)
    generate_data
    respond_with @stats
  end

  def trends
    country = Country.find_by(country_name: params["country"])
    params[:id] = country.id
    @data_factory = APIDataFactory.new(params)
    generate_data
    respond_with @percent_one_year
  end

  def expenses
    country = Country.find_by(country_name: params["country"])
    params[:id] = country.id
    @data_factory = APIDataFactory.new(params)
    generate_data
    respond_with @relative_expenses
  end

  private

    def generate_data
      country = @country
      if params["region"].nil?
        region = 'world'
      else
        region = params["region"].gsub("-", "_")
      end
      @relative_expenses = data_factory.relative_prices(params)
      peace_index = data_factory.peace_index
      generate_yearly_currency_trends(data_factory.exchange_rates(params), @relative_expenses)
    end

    def generate_yearly_currency_trends(latest, relative_expenses)
      @percent_one_year = data_factory.compare_exchange_rates(latest, params, 1)
      @percent_two_years = data_factory.compare_exchange_rates(latest, params, 2)
      @percent_three_years = data_factory.compare_exchange_rates(latest, params, 3)
      percent_max = @percent_two_years.sort_by{|k, v| -v.to_f}[3].last.to_i
      percent_min = @percent_two_years.sort_by{|k, v| v.to_f}[3].last.to_i
      @stats = data_factory.stat_card_data(@percent_one_year, relative_expenses)
    end

    def save_search_values
      session[:country] = params["country"]
      session[:region] = params["region"]
    end

    def idea_params
      params.require(:idea).permit(:id, :title, :body, :quality)
    end
end
