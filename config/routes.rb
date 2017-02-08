Rails.application.routes.draw do
  root to: 'angular#index'
  devise_for :users

  scope :api do
    scope :v1 do
      resources :boards do
        resources :members
        resources :lists do
          resources :cards
        end
      end
    end
  end
end
