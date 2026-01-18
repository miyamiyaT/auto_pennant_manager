class BatterAbilitySerializer
  include Alba::Resource

  attributes :trajectory, :hit, :power, :run_speed, :arm_strength, :fielding, :catching, 
  :special_ability, :clutch_rank, :vs_lhp_rank, :stealing_rank, :running_rank,
  :throwing_rank, :catcher_rank, :grit_rank, :recovery_rank
end