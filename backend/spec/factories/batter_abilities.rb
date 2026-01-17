GRADES = %w[G F E D C B A S].freeze

FactoryBot.define do
  factory :batter_ability do
    trajectory { Faker::Number.between(from: 1, to: 4) }
    hit { Faker::Number.between(from: 1, to: 100) }
    power { Faker::Number.between(from: 1, to: 100) }
    run_speed { Faker::Number.between(from: 1, to: 100) }
    arm_strength { Faker::Number.between(from: 1, to: 100) }
    fielding { Faker::Number.between(from: 1, to: 100) }
    catching { Faker::Number.between(from: 1, to: 100) }
    clutch_rank { GRADES.sample }
    vs_lhp_rank { GRADES.sample }
    stealing_rank { GRADES.sample }
    running_rank { GRADES.sample }
    throwing_rank { GRADES.sample }
    catcher_rank { GRADES.sample }
    grit_rank { GRADES.sample }
    recovery_rank { GRADES.sample }
    special_ability { Faker::Creature::Animal.name[0, 100] }

    association :player_season, factory: :player_season
  end
end
