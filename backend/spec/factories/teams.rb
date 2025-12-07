Faker::Config.locale = 'ja'

FactoryBot.define do
  factory :team do
    sponsor { Faker::Company.name[0, 10] }
    name { Faker::Creature::Animal.name[0, 15] }
  end
end
