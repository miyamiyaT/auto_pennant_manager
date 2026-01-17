GRADES = %w[G F E D C B A S].freeze

FactoryBot.define do
  factory :pitcher_ability do
    pitch_velocity { Faker::Number.between(from: 90, to: 180) }
    control { Faker::Number.between(from: 1, to: 100) }
    stamina { Faker::Number.between(from: 1, to: 100) }
    w_risp_rank { GRADES.sample }
    heather_rank { GRADES.sample }
    vs_lbh_rank { GRADES.sample }
    agile_rank { GRADES.sample }
    poise_rank { GRADES.sample }
    grit_rank { GRADES.sample }
    recovery_rank { GRADES.sample }
    special_ability { Faker::Creature::Animal.name[0, 100] }

    association :player_season, factory: :player_season
  end
end
