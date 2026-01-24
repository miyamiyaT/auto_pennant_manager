class AllBatterSeasonSerializer
  include Alba::Resource
  root_key :player_data

  one :player 

  many :seasons do
    one :player_season
    one :batter_season
    one :batter_ability
  end

end