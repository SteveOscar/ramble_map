require "test_helper"

class User_Can_Create_USD_Exchange_Map_Test < ActionDispatch::IntegrationTest
  test "user can create a map for USD currency trend for 1 year" do
    VCR.use_cassette('basic_USD_trend') do
      visit root_path

      assert_equal '/', current_path
      assert page.has_css?('.welcome-form')

      select('United States', :from => 'country')
      select('World', :from => 'region')

      click_on "Submit"

      assert_equal display_map_path, current_path
      assert page.has_content?('Now viewing changes in currency')
    end
  end

  test "user can create a map for other currency and timeframe" do
    VCR.use_cassette('foreign_currency_multi_year') do
      visit root_path

      select('Russia', :from => 'country')
      select('World', :from => 'region')

      click_on "Submit"

      assert_equal display_map_path, current_path
      assert page.has_content?('Now viewing changes in currency')
    end
  end
end
