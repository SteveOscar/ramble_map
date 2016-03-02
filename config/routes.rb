Rails.application.routes.draw do
  root 'static#welcome'
  get '/display_map', to: 'static#currency_map'

end
