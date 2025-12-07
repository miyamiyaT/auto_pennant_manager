FactoryBot.define do
  factory :pitcher_ability do
    pitch_velocity { Faker::Number.between(from: 90, to: 180) }
    control { Faker::Number.between(from: 1, to: 100) }
    stamina { Faker::Number.between(from: 1, to: 100) }
    w_risp { ['G','F','E','D','C','B','A','S'] .sample }
    heather { ['G','F','E','D','C','B','A','S']  .sample }
    vs_lbh { ['G','F','E','D','C','B','A','S'] .sample }
    agile { ['G','F','E','D','C','B','A','S'] .sample }
    poise { ['G','F','E','D','C','B','A','S'] .sample }
    grit { ['G','F','E','D','C','B','A','S'] .sample }
    recovery { ['G','F','E','D','C','B','A','S'] .sample }
    special_ability { Faker::Creature::Animal.name[0, 100] }
  end
end
