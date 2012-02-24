Webapp::Application.routes.draw do

  devise_for :users, :path_names => { :sign_in => 'login', :sign_out => 'logout', :sign_up => 'signup' }

  resources :videos do 
    post 'priority', :on => :member
  end

  resources :images do
    member do
      post 'priority'
      get 'new_step'
      put 'create_step'
    end
  end

  resources :texts do 
    post 'priority', :on => :member
  end

  resources :audios do 
    post 'priority', :on => :member
  end

  resources :nodes

  resources :connections do
    get 'search', :on => :collection
  end

  get 'bank' => 'pages#bank'
  get 'bank/editor' => 'mapmind#editor'
  get 'tags/search' => 'tags#search'
  get 'tags' => 'tags#index'
  match '/tags/show/:tag' => "tags#show"
  get 'maps' => 'maps#index'
  get 'timeline' => 'timeline#index'
  match '/profile/:username' => 'pages#profile'

  get 'admin/users' => 'admin/users#index'
  get 'admin/users/search' => 'admin/users#search'
  put 'admin/users/:username/update' => 'admin/users#update', :as => 'admin_users_update'

  root :to => 'pages#index'

end
