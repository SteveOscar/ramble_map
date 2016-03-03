Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, ENV['TWITTER_ID'], ENV['TWITTER_SECRET']
end
