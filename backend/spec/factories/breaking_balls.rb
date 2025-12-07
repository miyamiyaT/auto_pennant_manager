FactoryBot.define do
  factory :breaking_ball do
    name { Faker::Creature::Animal.name[0, 12] }
    direction{ Faker::Number.between(from: 0, to: 5) }
    variation{ Faker::Number.between(from: 1, to: 7) }
    is_original { [true, false].sample }
  end
end
