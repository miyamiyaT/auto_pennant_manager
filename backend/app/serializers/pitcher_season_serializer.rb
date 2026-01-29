class PitcherSeasonSerializer
  include Alba::Resource

  attributes :games, :innings, :thirds, :wins, :loses, :hold_points,
  :strikeouts, :bb, :hits_allowed_numbers, :earned_runs, :win_rate,
  :era, :bb9, :whip
end