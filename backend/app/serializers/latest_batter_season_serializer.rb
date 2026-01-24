class LatestBatterSeasonSerializer
  include Alba::Resource
  root_key :player_data

  one :player 
  one :player_season
  one :batter_season
  one :batter_ability
end