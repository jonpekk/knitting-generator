Rails.application.routes.draw do

  root to: "home#index"
  get 'about/', to: "home#index"

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Delete once you confirm the app is stable
  # get '*path', to: 'home#index', constraints: lambda { |req|
  #   !req.path.match(%r{^/users/}) && !req.path.match(%r{^/up$}) && req.format == :html
  # }
  # root "home#index"
  # get 'about/', to: "home#index"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
