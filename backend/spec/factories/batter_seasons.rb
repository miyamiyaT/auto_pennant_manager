FactoryBot.define do
  factory :batter_season do
    games { Faker::Number.between(from: 0, to: 144) }
    at_bat { Faker::Number.between(from: 0, to: [450,games].min) }
    hits { Faker::Number.between(from: 0, to: [at_bat,211].min) }
    works { Faker::Number.between(from: 0, to: [games,50].min) }
    hr { Faker::Number.between(from: 0, to: [hits,60].min) }
    rbi { Faker::Number.between(from: 0, to: 120) }
    steals { Faker::Number.between(from: 0, to: 50) }
    batting_average { nil }
    ab_hr { nil }
    slg { nil }
    oba { nil }
    ops { nil }

    after(:build) do |batter_season|
      at_bat = batter_season.at_bat
      hits = batter_season.hits
      works = batter_season.works
      hr = batter_season.hr ? batter_season.hr : rand(0..hits)
      total_bases = (hits - hr) + (hr * 4)

      # batting_average(打率)の計算
      batting_average = if at_bat == 0
                          0
                        else
                          (hits.to_f / at_bat).round(3)
                        end
      batter_season.batting_average = batting_average

      # ab_hr(本塁打率)の計算
      ab_hr = if hr == 0
                0
              else
                (at_bat.to_f / hr.to_f).round(1)
              end
      batter_season.ab_hr = ab_hr

      # slg(長打率)の計算
      slg = if at_bat == 0
              0
            else
              (total_bases.to_f / at_bat).round(3)
            end
      batter_season.slg = slg

      # oba(擬似出塁率)の計算
      oba = if at_bat == 0
              0
            else
              ((hits + works).to_f / (at_bat + works)).round(3)
            end
      batter_season.oba = oba

      # ops(長打率 + 擬似出塁率)の計算
      ops = slg + oba
      batter_season.ops = ops
    end
  end
end
