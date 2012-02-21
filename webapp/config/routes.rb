Webapp::Application.routes.draw do

  devise_for :users, :path_names => { :sign_in => 'login', :sign_out => 'logout', :sign_up => 'signup' }

  resources :videos
  resources :images
  resources :texts
  resources :audios
  resources :connections
  resources :nodes

  get 'connections/search' => 'connections#search'
  get 'bank' => 'pages#bank'
  get 'bank/editor' => 'mapmind#editor'
  get 'tags/search' => 'tags#search'
  get 'tags' => 'tags#index'
  match '/tags/show/:tag' => "tags#show"
  get 'maps' => 'maps#index'
  get 'timeline' => 'timeline#index'
  match '/profile/:username' => 'pages#profile'
  get 'admin/users' => 'admin/users#index'
  put 'admin/users/:username/edit' => 'admin/users#update_role', :as => 'admin_users_update_role'
  root :to => 'pages#index'

end
