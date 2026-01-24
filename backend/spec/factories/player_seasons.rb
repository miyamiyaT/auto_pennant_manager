Faker::Config.locale = 'ja'

FactoryBot.define do
  factory :player_season do
    year { 2026 }
    age { 26 }
    number { 000.to_s }
    growth_type { :normal }
    current_growth_type { :prime }
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
  end
end
