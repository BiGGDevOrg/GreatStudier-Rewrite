Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "articles#index"
  get :upload, to: "uploads#new", as: :new_upload
  post :upload, to: "uploads#create"

  resources :card_sets, path: 's' do
    get "learn", to: "activities#learn"
    get "review", to: "activities#review"
    get "study", to: "activities#study"
  end

  root "main#index"

end
