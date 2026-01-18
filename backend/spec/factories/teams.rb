Faker::Config.locale = 'ja'

FactoryBot.define do
  factory :team do
    sponsor { "テストチーム" }
    name { Faker::Creature::Animal.name[0, 10] }
  end
end
