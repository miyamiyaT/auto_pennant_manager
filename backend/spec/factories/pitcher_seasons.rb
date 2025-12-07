FactoryBot.define do
  factory :pitcher_season do
    games { Faker::Number.between(from: 0, to: 50) }
    innings { Faker::Number.between(from: 0, to: [games * 9, 250].min) }
    thirds { Faker::Number.between(from: 0, to: 3) }
    wins { Faker::Number.between(from: 0, to: [15, games].min) }
    loses { Faker::Number.between(from: 0, to: [15, games].min) }
    saves { Faker::Number.between(from: 0, to: [50, games].min) }
    hold_points { Faker::Number.between(from: 0, to: [50, games].min) }
    strikeouts { Faker::Number.between(from: 0, to: [innings * 3, 250].min) }
    bb { Faker::Number.between(from: 0, to: 50) }
    hits_allowed_numbers { Faker::Number.between(from: 0, to: 50) }
    # 自責点
    earned_runs { Faker::Number.between(from: 0, to: 50) }
    win_rate { nil }
    era { nil }
    k9 { nil }
    bb9 { nil }
    k_bb { nil }
    whip { nil }

    after(:build) do |pitcher_season|
      innings = pitcher_season.innings
      thirds = pitcher_season.thirds
      wins = pitcher_season.wins
      loses = pitcher_season.loses
      strikeouts = pitcher_season.strikeouts 
      bb = pitcher_season.bb 
      hits_allowed_numbers = pitcher_season.hits_allowed_numbers
      earned_runs = pitcher_season.earned_runs

      # win_rate(勝率)の計算
      win_rate = wins == 0 ? 0 : ((wins / (wins + loses)) * 100).round / 100
      pitcher_season.win_rate = win_rate

      # era(防御率)の計算
      era = if innings == 0 && thirds == 0
              earned_runs > 0 ? 99.99 : 0
            else
              [((earned_runs.to_f / (innings + (thirds.to_f / 3)) * 9)*100).round / 100, 99.99].min
            end
      pitcher_season.era = era

      # k/9(奪三振率)の計算
      k9 = if innings == 0 && thirds == 0
             0
           else
             [((strikeouts.to_f / (innings + (thirds.to_f / 3)) * 9)*100).round / 100, 99.99].min
           end
      pitcher_season.k9 = k9

      # bb/9(与四死球率)の計算
      bb9 = if innings == 0 && thirds == 0
              bb > 0 ? 99.99 : 0
            else
              [((bb.to_f / (innings + (thirds.to_f / 3)) * 9)*100).round / 100, 99.99].min
            end
      pitcher_season.bb9 = bb9

      # k_bbの計算
      k_bb = if bb == 0
               strikeouts > 0 ? 99.99 : 0
             else
               [((strikeouts.to_f / bb)*100).round / 100, 99.99].min
             end
      pitcher_season.k_bb = k_bb

      # whipの計算
      whip = if innings == 0 && thirds == 0 && (bb != 0 || hits_allowed_numbers != 0)
               (bb + hits_allowed_numbers) > 0 ? 99.99 : 0
             else
               [(((bb + hits_allowed_numbers).to_f / (innings + (thirds.to_f / 3)))*100).round / 100, 99.99].min
             end
      pitcher_season.whip = whip
    end

    association :player_season, factory: :player_season
  end
end
