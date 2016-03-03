require "test_helper"

class User_Can_Login_With_Twitter < ActionDispatch::IntegrationTest
  test "user can login with twitter" do
    VCR.use_cassette('basic_USD_trend') do
      visit root_path

      click_link("twitter")

      assert_equal display_map_path, current_path

    end
  end
end
