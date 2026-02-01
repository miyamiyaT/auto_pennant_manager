class PitcherAbilitySerializer
  include Alba::Resource

  attributes :pitch_velocity, :control, :stamina, :w_risp_rank, :heather_rank, :vs_lbh_rank,
  :agile_rank, :poise_rank, :grit_rank, :recovery_rank, :special_ability
end