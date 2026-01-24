FactoryBot.define do
  factory :player do
    name { Faker::Name.name }
    birthday { Faker::Date.birthday(min_age: 18, max_age: 40) }
    is_favorite {[true, false].sample }
    is_active {[true, false].sample }
    memo { Faker::Movie.title }
    draft_year { 2027 }
    draft_rank { Faker::Number.between(from: 1, to: 12) }
    draft_type { :high_school }

    association :team, factory: :team
  end
end
