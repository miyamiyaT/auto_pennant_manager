# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

2.times do
  team = FactoryBot.create(:team)
  40.times do
    player = FactoryBot.create(:player, team: team) # プレイヤーを作成し、チームを関連付ける
    year = 2024
    number = 0
    20.times do
      player_season = FactoryBot.create(:player_season, player: player, year: year, number: number) # プレイヤーを作成し、チームを関連付ける
      if player_season.is_starter || player_season.is_relief || player_season.is_closer
        FactoryBot.create(:pitcher_season, player_season: player_season) 
        FactoryBot.create(:pitcher_ability, player_season: player_season)
        FactoryBot.create(:breaking_ball, player_season: player_season)
        FactoryBot.create(:batter_season, player_season: player_season)
        FactoryBot.create(:batter_ability, player_season: player_season)
      else
        FactoryBot.create(:batter_season, player_season: player_season)
        FactoryBot.create(:batter_ability, player_season: player_season)
      end
      year += 1
      number += 1
    end
  end
end