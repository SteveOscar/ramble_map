require 'test_helper'

class Api::V1::CountriesControllerTest < ActionController::TestCase
  test "#index" do
    get :index, format: :json

    countries = JSON.parse(response.body)
    sample_country = countries.first

    assert_response :success
    assert_equal 173, countries.count
  end

  test "#show" do
    id = Country.first.id

    get :show, id: id, format: :json

    data = JSON.parse(response.body)

    assert_response :success
    assert_equal 5, data["cheap"].count
    assert_equal 5, data["highest_price"].count
  end

  test "#trends" do
    country = Country.first

    get :trends, country: country.country_name, format: :json

    data = JSON.parse(response.body)

    assert_response :success
    assert_equal data.count, 171
    assert_equal data.first[0], "Iceland"
  end

  test "#expenses" dog
    get :expenses, country: 'United States', format: :json

    data = JSON.parse(response.body)

    assert_response :success
    assert_equal data.count, 163
    assert_equal data.first[0], "Switzerland"
  end
end
