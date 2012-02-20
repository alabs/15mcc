Webapp::Application.routes.draw do

  devise_for :users, :path_names => { :sign_in => 'login', :sign_out => 'logout', :sign_up => 'signup' }

  resources :videos
  resources :images
  resources :texts

  match '/tags/show/:tag' => "tags#show"

  get 'tags/search' => 'tags#search'
  get 'tags' => 'tags#index'

  get 'bank' => 'pages#bank'
  get 'maps' => 'maps#index'
  get 'timeline' => 'timeline#index'

  root :to => 'pages#index'

end
