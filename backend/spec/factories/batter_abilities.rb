FactoryBot.define do
  factory :batter_ability do
    trajectory { Faker::Number.between(from: 1, to: 4) }
    hit { Faker::Number.between(from: 1, to: 100) }
    power { Faker::Number.between(from: 1, to: 100) }
    run_speed { Faker::Number.between(from: 1, to: 100) }
    arm_strength { Faker::Number.between(from: 1, to: 100) }
    fielding { Faker::Number.between(from: 1, to: 100) }
    catching { Faker::Number.between(from: 1, to: 100) }
    clutch { ['G','F','E','D','C','B','A','S'] .sample }
    vs_lhp { ['G','F','E','D','C','B','A','S']  .sample }
    stearing { ['G','F','E','D','C','B','A','S'] .sample }
    runnning { ['G','F','E','D','C','B','A','S'] .sample }
    throwing { ['G','F','E','D','C','B','A','S'] .sample }
    catcher { ['G','F','E','D','C','B','A','S'] .sample }
    grit { ['G','F','E','D','C','B','A','S'] .sample }
    recovery { ['G','F','E','D','C','B','A','S'] .sample }
    special_ability { Faker::Creature::Animal.name[0, 100] }
  end
end
