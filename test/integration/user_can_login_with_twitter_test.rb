require "test_helper"


class User_Can_Login_With_Twitter < ActionDispatch::IntegrationTest
  test "user can login with twitter" do
    visit root_path

    refute page.has_link?("twitter-signout")
    refute User.first

    click_link("twitter-signin")

    assert User.first
    assert_equal root_path, current_path
    refute page.has_link?("twitter-signin")

    click_link("twitter-signout")

    assert page.has_link?("twitter-signin")
  end
end
