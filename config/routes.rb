Rails.application.routes.draw do
  devise_for :users
  root 'application#root'

  resources :groups
  resources :tasks
end
