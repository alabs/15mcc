Webapp::Application.routes.draw do

  get 'connections/search' => 'connections#search'
  resources :connections

  resources :nodes

  devise_for :users, :path_names => { :sign_in => 'login', :sign_out => 'logout', :sign_up => 'signup' }

  resources :videos
  resources :images
  resources :texts

  get 'bank' => 'pages#bank'
  get 'bank/editor' => 'mapmind#editor'

  get 'tags/search' => 'tags#search'
  get 'tags' => 'tags#index'
  match '/tags/show/:tag' => "tags#show"

  get 'maps' => 'maps#index'
  get 'timeline' => 'timeline#index'

  root :to => 'pages#index'

end
