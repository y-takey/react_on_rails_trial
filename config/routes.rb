Rails.application.routes.draw do
  devise_for :users
  root 'application#root'

  get '*path', to: 'application#root', constraints: { format: :html }

  resources :groups
  resources :tasks
end
