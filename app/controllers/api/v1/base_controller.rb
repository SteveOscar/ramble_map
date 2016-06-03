class Api::V1::BaseController < ApplicationController
  include ActionController::HttpAuthentication::Token::ControllerMethods

  respond_to :json, :xml
  TOKEN = ENV["RAMBLE_MAP_ID"]
  before_action :authenticate

  private

  def authenticate
    render :file => "public/404.html", :status => :unauthorized unless request.headers['token'] == TOKEN
  end
end
