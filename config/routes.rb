Rails.application.routes.draw do
  root 'static#welcome'
  get '/display_map', to: 'static#currency_map'
  get '/auth/twitter', as: :login
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
end
