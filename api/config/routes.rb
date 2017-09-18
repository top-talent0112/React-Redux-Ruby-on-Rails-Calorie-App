Rails.application.routes.draw do
  get '/docs' => redirect('/swagger/index.html?url=/apidocs/api-docs.json')

  namespace :v1 do
    resource :auth, only: [] do
      post  :sign_up
      post  :sign_in
    end
  end
end
