Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :teams
      resources :team_seasons
      resources :players
      resources :batters
      resources :pitchers


      resources :batter_seasons
      get 'batter_seasons/:id/years', to: 'batter_seasons#years'

      resources :pitcher_seasons
      get 'pitcher_seasons/:id/years', to: 'pitcher_seasons#years'

    end
  end
end
