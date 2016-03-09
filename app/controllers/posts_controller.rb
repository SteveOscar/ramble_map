class PostsController < ApplicationController

  def tweet
    TwitterService.new(current_user).tweet(params["tweet"])
    respond_to do |format|
      format.html {redirect_to :back}
      format.js
      session[:tweeted] = true
    end
  end
end
