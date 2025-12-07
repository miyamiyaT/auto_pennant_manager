Faker::Config.locale = 'ja'

FactoryBot.define do
  factory :player_season do
    year { year }
    age { nil }
    number { number.to_s }
    growth_type { Faker::Number.between(from: 0, to: 4) }
    current_growth_type { Faker::Number.between(from: 0, to: 3) }
    is_starter { [true, false].sample }
    is_relief { [true, false].sample }
    is_closer { [true, false].sample }
    is_catcher { [true, false].sample }
    is_first { [true, false].sample }
    is_second { [true, false].sample }
    is_third { [true, false].sample }
    is_short { [true, false].sample }
    is_outfielder { [true, false].sample }
    plate_appearances { Faker::Superhero.power }
    memo { Faker::Movie.title }

    association :player, factory: :player

    after(:build) do |player_season|
      player = player_season.player
      age = player_season.year - player.birthday.year
      player_season.age = age
    end
  end
end
