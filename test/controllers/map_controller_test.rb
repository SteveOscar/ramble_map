require 'test_helper'

class MapControllerTest < ActionController::TestCase
  test "should get map" do
    VCR.use_cassette('currency_map_action') do
      get(:currency_map, { "utf8"=>"✓",
                           "country"=>"144",
                           "region"=>"world",
                           "commit"=>"Submit",
                           "controller"=>"map",
                           "action"=>"currency_map"})
      assert_response :success

      all_countries = assigns["data_factory"].countries
      result = assigns["data_factory"].base_country.country_name

      assert session[:region] == "world"
      assert_equal "Ecuador", result
      assert_equal 173, all_countries.count
      assert assigns["data_factory"].rates
    end
  end

  test "should get welcome" do
    get :welcome
    assert_response :success
    assert assigns["countries"]

    all_countries = assigns["countries"]
    assert_equal 173, all_countries.count
  end
end
