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
    clutch { GRADES.sample }
    vs_lhp { GRADES.sample }
    stearing { GRADES.sample }
    runnning { GRADES.sample }
    throwing { GRADES.sample }
    catcher { GRADES.sample }
    grit { GRADES.sample }
    recovery { GRADES.sample }
    special_ability { Faker::Creature::Animal.name[0, 100] }
  end
end
