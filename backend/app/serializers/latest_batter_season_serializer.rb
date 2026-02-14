class LatestBatterSeasonSerializer
  include Alba::Resource

  one :player 
  one :player_season
  one :batter_season
  one :batter_ability
end