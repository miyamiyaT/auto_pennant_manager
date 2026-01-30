require 'rails_helper'

RSpec.describe 'Api::V1::BatterSeason', type: :request do
  describe 'GET' do
    let!(:team) { create(:team) }
    let!(:player) { create(:player, team: team) }
    # 1セット目
    let!(:player_season) { create(:player_season, player: player) }
    let!(:batter_season) { create(:batter_season, player_season: player_season) }
    let!(:batter_ability) { create(:batter_ability, player_season: player_season) }

    # 2セット目（同一選手に別シーズンを追加）
    let!(:player_season2)  { create(:player_season, player: player, year: 2027) }
    let!(:batter_season2)  { create(:batter_season, player_season: player_season2) }
    let!(:batter_ability2) { create(:batter_ability, player_season: player_season2) }

    it "returns batter detail" do

      get "/api/v1/batter_seasons/#{team.id}?year=2026"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      pp response.body

      expect(json).to include("players")
    end
  end

  describe 'POST' do
    let!(:team) { create(:team) }
    let!(:player) { create(:player, team: team) }

    let(:params) do
      {
        player: {
          id: player.id,
          is_active: true
        },
        player_season: {
          player_id: player.id,
          year: 2026,
          age: 30,
          memo: "衰退はしてきているが、確実に成績を残してくれる存在。チームリーダーって感じする。",
          growth_type: "normal",
          current_growth_type: "decline_phase",
          is_starter: false,
          is_relief: false,
          is_closer: false,
          is_first: false,
          is_second: false,
          is_third: false,
          is_short: false,
          is_outfielder: false,
          is_catcher: true
        },
        batter_season: {
          games: 80,
          at_bat: 257,
          hits: 60,
          hr: 7,
          works: 21,
          total_bases: 87,
          rbi: 34,
          steals: 0,
          batting_average: 0.233,
          ab_hr: 36.714,
          slg: 0.339,
          oba: 0.291,
          ops: 0.63
        },
        batter_ability: {
          trajectory: 3,
          hit: 51,
          power: 73,
          run_speed: 26,
          arm_strength: 79,
          fielding: 76,
          catching: 61,
          special_ability: "パワー型　プルヒッター　ホーム死守　ホーム突入　初球",
          clutch_rank: "E",
          vs_lhp_rank: "D",
          stealing_rank: "D",
          running_rank: "D",
          throwing_rank: "D",
          catcher_rank: "A",
          grit_rank: "D",
          recovery_rank: "C"
        }
      }
    end

    it '野手登録が成功し 201 を返す' do
      post '/api/v1/batter_seasons', params: params

      expect(response).to have_http_status(:created)

      json = JSON.parse(response.body)

      expect(json).to include("player_params", "player_season_params", "batter_season_params", "batter_ability_params")
    end
  end
end
