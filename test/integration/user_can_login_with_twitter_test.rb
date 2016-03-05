require "test_helper"


class User_Can_Login_With_Twitter < ActionDispatch::IntegrationTest
  test "user can login with twitter" do
    visit root_path
    click_link("twitter")
    sleep 0.6

    assert_equal root_path, current_path
    assert page.has_content?("hello, Steven Olson")
  end
end
