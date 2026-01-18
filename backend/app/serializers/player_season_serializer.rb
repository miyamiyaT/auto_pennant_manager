class PlayerSeasonSerializer
  include Alba::Resource

  attributes :id, :year, :age, :number, :growth_type, :current_growth_type,
   :is_starter, :is_relief, :is_closer,:is_catcher, :is_first, :is_second,
   :is_third, :is_short, :is_outfielder,:is_catcher, 
   :plate_appearances, :memo
end