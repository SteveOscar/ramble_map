Rails.application.routes.draw do
  root 'map#welcome'
  get '/display_map', to: 'map#currency_map'
  get '/auth/twitter', as: :login
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
end
