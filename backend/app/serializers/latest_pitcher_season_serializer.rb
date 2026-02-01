class LatestPitcherSeasonSerializer
  include Alba::Resource
  root_key :player_data

  one :player 

  one :player_season
  one :pitcher_season
  one :pitcher_ability
  one :breaking_ball
end