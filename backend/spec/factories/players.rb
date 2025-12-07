Faker::Config.locale = 'ja'

FactoryBot.define do
  factory :player do
    name { Faker::Name.name }
    birthday { Faker::Date.birthday(min_age: 18, max_age: 40) }

    association :team, factory: :team
  end
end
