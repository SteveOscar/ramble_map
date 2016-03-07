class ApplicationController < ActionController::Base
  helper_method :current_user
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  include ActionController::Caching::Pages
  self.page_cache_directory = "#{Rails.root.to_s}/public/page_cache"

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end
end
