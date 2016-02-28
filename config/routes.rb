Rails.application.routes.draw do
  root 'static#welcome'
  get '/home', to: 'static#home'
end
