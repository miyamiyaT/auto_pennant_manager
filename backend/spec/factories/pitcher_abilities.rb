GRADES = %w[G F E D C B A S].freeze

FactoryBot.define do
  factory :pitcher_ability do
    pitch_velocity { Faker::Number.between(from: 90, to: 180) }
    control { Faker::Number.between(from: 1, to: 100) }
    stamina { Faker::Number.between(from: 1, to: 100) }
    w_risp { GRADES.sample }
    heather { GRADES.sample }
    vs_lbh { GRADES.sample }
    agile { GRADES.sample }
    poise { GRADES.sample }
    grit { GRADES.sample }
    recovery { GRADES.sample }
    special_ability { Faker::Creature::Animal.name[0, 100] }
  end
end
