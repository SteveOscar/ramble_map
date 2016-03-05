# require 'test_helper'
#
# class SessionsControllerTest < ActionController::TestCase
#
#   test "twitter login" do
#       request.env['omniauth.auth'] = OmniAuth.config.mock_auth[:twitter]
#
#       ApplicationController.any_instance.stubs(:current_user).returns(user)
#       visit '/sessiontest'
#       assert_equal root_path, current_path
#
#   end
#
#
#
# end
