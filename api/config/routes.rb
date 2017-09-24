Rails.application.routes.draw do
  get '/docs' => redirect('/swagger/index.html?url=/apidocs/api-docs.json')

  namespace :v1 do
    resource :auth, only: [] do
      post  :sign_up
      post  :sign_in
      post  :me
    end

    resources :users, only: [:index, :show, :create, :update, :destroy] do
      get :regulars, on: :collection
    end

    resources :meals, only: [:index, :show, :create, :update, :destroy] do
      get :calories_today, on: :collection
    end
  end
end
