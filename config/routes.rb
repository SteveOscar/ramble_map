Rails.application.routes.draw do
  resources :posts
  root 'map#welcome'
  get '/display_map', to: 'map#ramble_map'
  post '/posts/tweet', to: 'posts#tweet'
  get '/auth/twitter', as: :login
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
end
