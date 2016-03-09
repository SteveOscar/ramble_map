require "test_helper"

class It_Remembers_Previous_Search_Test < ActionDispatch::IntegrationTest
  test "when visiting the hope page after search, it remembers search" do
    VCR.use_cassette('remember_search') do
      visit root_path
      default_selection = find_field('country').value
      country = Country.find(default_selection).country_name
      refute country == "Russia"

      select('Russia', :from => 'country')
      select('Asia', :from => 'region')

      click_on "Submit"

      assert_equal display_map_path, current_path

      visit root_path
      remembered_selection = find_field('country').value
      new_country = Country.find(remembered_selection).country_name
      
      assert_equal new_country, "Russia"
    end
  end
end
