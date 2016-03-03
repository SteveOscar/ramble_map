class SessionsController < ApplicationController
  before_action :omniath?, only: [:create]

  def new
  end

  def create
    @user = User.find_or_create_by_auth(request.env["omniauth.auth"])
    if @user
      session[:user_id] = @user.id
      redirect_to root_path
    else
      redirect_to root_path
    end
  end

  def destroy
    session.destroy
    redirect_to root_path
  end

  private

    def omniath?
      redirect_to root_path if request.env["omniauth.auth"].nil?
    end
end
