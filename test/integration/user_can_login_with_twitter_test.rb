require "test_helper"


class User_Can_Login_With_Twitter < ActionDispatch::IntegrationTest
  test "user can login with twitter" do
    visit root_path
    refute page.has_link?("twitter-signout")
    click_link("twitter-signin")
    sleep 0.6
    assert_equal root_path, current_path
    refute page.has_link?("twitter-signin")
    click_link("twitter-signout")
  end
end
