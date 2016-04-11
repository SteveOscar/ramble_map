require 'test_helper'

class Api::V1::CountriesControllerTest < ActionController::TestCase
  test "#index" do
    get :index, format: :json

    countries = JSON.parse(response.body)
    sample_country = countries.first

    assert_response :success
    assert_equal 173, countries.count
  end

  # test "#show" do
  #   id = Country.first.id
  #
  #   get :show, id: id, format: :json
  #
  #   country = JSON.parse(response.body)
  #
  #   assert_response :success
  #   assert_equal 1, country["id"]
  #   assert_equal country["country_name"], "Heavy Cotton Pants"
  # end
end
