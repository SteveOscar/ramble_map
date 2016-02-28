Rails.application.routes.draw do
  root 'static#welcome'
  get '/view', to: 'static#view'
end
