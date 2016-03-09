require "test_helper"

class It_Remembers_Previous_Search_Test < ActionDispatch::IntegrationTest
  test "when visiting the hope page after search, it remembers search" do
    VCR.use_cassette('remember_search') do
      visit root_path

      select('Russia', :from => 'country')
      select('Asia', :from => 'region')

      click_on "Submit"

      assert_equal display_map_path, current_path
      visit root_path
      assert page.has_content?("Russia")
    end
  end
end
