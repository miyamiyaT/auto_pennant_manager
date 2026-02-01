require 'rails_helper'

RSpec.describe 'Api::V1::Pitcher', type: :request do
  describe 'GET' do
    let!(:team) { create(:team) }
    let!(:player) { create(:player, team: team) }
    # 1セット目
    let!(:player_season) { create(:player_season, player: player) }
    let!(:pitcher_season) { create(:pitcher_season, player_season: player_season) }
    let!(:pitcher_ability) { create(:pitcher_ability, player_season: player_season) }
    let!(:breaking_ball) { create(:breaking_ball, player_season: player_season) }

    # 2セット目（同一選手に別シーズンを追加）
    let!(:player_season2)  { create(:player_season, player: player, year: 2027) }
    let!(:pitcher_season2)  { create(:pitcher_season, player_season: player_season2) }
    let!(:pitcher_ability2) { create(:pitcher_ability, player_season: player_season2) }
    let!(:breaking_ball2) { create(:breaking_ball, player_season: player_season2) }
    it "returns batter detail" do

      get "/api/v1/pitchers/#{player.id}"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      expect(json).to include("player_data")
      expect(json['player_data']).to include('player', 'seasons')
    end

    it "returns batter detail" do

      get "/api/v1/pitchers/#{player.id}/register"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      expect(json).to include("player_data")
      expect(json['player_data']).to include('player', 'player_season', 'pitcher_season', 'pitcher_ability', 'breaking_ball')
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
          is_relief: true,
          is_closer: false,
          is_first: false,
          is_second: false,
          is_third: false,
          is_short: false,
          is_outfielder: false,
          is_catcher: true
        },
        pitcher_season: {
          games: 21,
          innings: 34,
          thirds: 0,
          wins: 2,
          loses: 0,
          hold_points: 5,
          strikeouts: 34,
          bb: 15,
          hits_allowed_numbers: 22,
          earned_runs: 2,
          win_rate: 1,
          era: 0.53,
          bb9: 3.97,
          whip: 1.09
        },
        pitcher_ability: {
          pitch_velocity: 149,
          control: 50,
          stamina: 64,
          w_risp_rank: "D",
          heather_rank: "B",
          vs_lbh_rank: "D",
          agile_rank: "D",
          poise_rank: "D",
          grit_rank: "D",
          recovery_rank: "D",
          special_ability: "本格派　逃げ玉　奪三振"
        },
        breaking_ball: [
          {
              direction: 1,
              is_original: false,
              name: "スライダー",
              variation: 2
          },
          {
              direction: 3,
              is_original: false,
              name: "フォーク",
              variation: 2
          },
          {
              direction: 4,
              is_original: false,
              name: "シンカー",
              variation: 2
          },
          {
              direction: 2,
              is_original: false,
              name: "ナックルカーブ",
              variation: 2
          }
        ]
      }
    end

    it '投手登録が成功し 201 を返す' do
      post '/api/v1/pitchers', params: params

      expect(response).to have_http_status(:created)

      json = JSON.parse(response.body)
      pp response.body

      expect(json).to include("player_params", "player_season_params", "pitcher_season_params", "pitcher_ability_params")
    end
  end
end
