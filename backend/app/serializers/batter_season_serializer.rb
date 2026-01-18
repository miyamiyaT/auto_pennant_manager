class BatterSeasonSerializer
  include Alba::Resource

  attributes :games, :at_bat, :hits, :hr, :works, :total_bases, :rbi, :steals,
  :batting_average, :ab_hr, :slg, :oba, :ops
end