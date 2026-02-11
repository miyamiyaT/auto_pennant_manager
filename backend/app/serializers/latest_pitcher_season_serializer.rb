class LatestPitcherSeasonSerializer
  include Alba::Resource

  one :player 

  one :player_season
  one :pitcher_season
  one :pitcher_ability
  one :breaking_ball
end