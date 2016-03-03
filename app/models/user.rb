class User < ActiveRecord::Base
  validates_presence_of :provider, :uid, :name

  def self.find_or_create_by_auth(auth)
    return if invalid_attributes?(auth)
    user = User.find_or_create_by(provider: auth['provider'], uid: auth['uid'])
    user.name = auth['info']['name']
    user.bio = auth['info']['description']
    user.image_url = auth['info']['image'].sub("_normal", "")
    user.email = auth['info']['email']
    user.token = auth['credentials']['token']
    user.secret = auth['credentials']['secret']
    user.save
    user
  end

  def self.invalid_attributes?(auth)
    auth["provider"] != 'twitter' || auth["uid"].nil? ? true : false
  end
end
