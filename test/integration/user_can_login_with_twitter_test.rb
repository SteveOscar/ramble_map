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

  test "user can tweet" do
    VCR.use_cassette('tweet_map') do
      visit root_path

      click_link("twitter-signin")

      assert User.first
      click_on "Submit"

      assert_equal display_map_path, current_path

      click_on("send-tweet")

      assert page.has_content?('(Tweeted!)')
    end
  end
end
