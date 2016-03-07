class ApplicationController < ActionController::Base
  helper_method :current_user, :tweeted?, :country_to_view, :region_to_view
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  include ActionController::Caching::Pages
  self.page_cache_directory = "#{Rails.root.to_s}/public/page_cache"

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def tweeted?
    session[:tweeted]
  end

  def country_to_view
    if session[:country]
      session[:country]
    else
      Country.find_by(country_name: 'United States')
    end
  end

  def region_to_view
    if session[:region]
      session[:region]
    else
      'world'
    end
  end
end
