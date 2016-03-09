require 'test_helper'

class UserCanUseMapButtonsTest < ActionDispatch::IntegrationTest
  test "all of the button elements are on the page" do
    VCR.use_cassette('using_map_elements') do
      visit root_path

      select('United Kingdom', :from => 'country')
      select('World', :from => 'region')

      click_on "Submit"

      assert_equal display_map_path, current_path
      page.find('#price-legend')['alt'].first(8) == "Cost key"
      assert page.has_content?("2yrs")
      click_on "2yrs"
      assert page.has_content?("3yrs")
      click_on "3yrs"
      assert page.has_content?("1yr")
      click_on "1yr"
      assert page.has_content?("Expense")
      click_on "Expense"
      assert page.has_content?("Peace Index")
      click_on "Peace Index"
      assert page.find('#peace-legend')['alt'].first(9) == "Peace key"
      assert page.has_content?("Sources")
      click_on "Sources"
      assert page.has_content?("Current and historical exchange rates:")
      click_on "View Report"
      assert page.has_content?("Perspective: United Kingdom")
      
      click_on "Title small"
      assert_equal root_path, current_path
    end
  end
end
