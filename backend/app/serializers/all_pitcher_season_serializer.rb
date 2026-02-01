class AllPitcherSeasonSerializer
  include Alba::Resource
  root_key :player_data

  one :player 

  many :seasons do
    one :player_season
    one :pitcher_season
    one :pitcher_ability
    one :breaking_ball
  end

end