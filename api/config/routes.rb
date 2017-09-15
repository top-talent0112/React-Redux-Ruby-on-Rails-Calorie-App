Rails.application.routes.draw do
  get '/docs' => redirect('/swagger/index.html?url=/apidocs/api-docs.json')
end
