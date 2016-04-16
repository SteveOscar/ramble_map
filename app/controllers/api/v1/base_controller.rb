class Api::V1::BaseController < ApplicationController
  respond_to :json, :xml
  TOKEN = ENV["RAMBLE_MAP_ID"]
  before_action :authenticate

  private

  def authenticate

    authenticate_or_request_with_http_token do |token, options|
      token == TOKEN
    end
  end
end
