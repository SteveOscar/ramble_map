require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "invalid auth provider is rejected" do
    auth = {
            'provider' => 'github',
            'uid' => '12345',
            'info' => { 'name' => 'Carl Sagan',
                        'image' => 'http://pbs.twimg.com/profile_images/676288331215335424/xFUgQmzk_normal.jpg'
                      }
            }

    before = User.count
    User.find_or_create_by_auth(auth)
    after = User.count
    assert_equal before, after
  end

  test "valid auth creates a user" do
    auth = {
            'provider' => 'twitter',
            'uid' => '47382',
            'info' => { 'name' => 'Carl Sagan',
                        'image' => 'http://pbs.twimg.com/profile_images/676288331215335424/xFUgQmzk_normal.jpg'
                      },
                      'credentials' => {
                          'token' => 234234,
                          'secret' => 234234
                      }
            }

    before = User.count
    User.find_or_create_by_auth(auth)
    after = User.count

    refute_equal before, after
    assert_equal User.last.name, "Carl Sagan"
  end
end
