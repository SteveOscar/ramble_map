class PostsController < ApplicationController

  def create
    TwitterService.new(current_user).tweet(params["q"])
    respond_to do |format|
      format.html {redirect_to :back}
      format.js
      session[:tweeted] = true
    end
  end

end
