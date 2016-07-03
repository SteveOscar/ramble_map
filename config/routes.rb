Rails.application.routes.draw do
  resources :posts
  root 'map#welcome'
  get '/display_map', to: 'map#ramble_map'
  post '/posts/tweet', to: 'posts#tweet'
  get '/auth/twitter', as: :login
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'

  namespace :api do
    namespace :v1, defaults: {format: :json} do
      resources :countries, defaults: {format: :json}
      get '/trends/:country', to: 'countries#trends'
      get '/expenses/:country', to: 'countries#combined_response'
    end
  end
end
