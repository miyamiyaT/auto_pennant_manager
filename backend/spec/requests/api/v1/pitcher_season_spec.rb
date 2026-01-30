require 'rails_helper'

RSpec.describe 'Api::V1::PitcherSeasons', type: :request do
  describe 'GET' do
    let!(:team) { create(:team) }
    let!(:player) { create(:player, team: team) }
    # 1セット目
    let!(:player_season) { create(:player_season, player: player) }
    let!(:pitcher_season) { create(:pitcher_season, player_season: player_season) }
    let!(:pitcher_ability) { create(:pitcher_ability, player_season: player_season) }

    # 2セット目（同一選手に別シーズンを追加）
    let!(:player_season2)  { create(:player_season, player: player, year: 2027) }
    let!(:pitcher_season2)  { create(:pitcher_season, player_season: player_season2) }
    let!(:pitcher_ability2) { create(:pitcher_ability, player_season: player_season2) }

    it "returns batter detail" do

      get "/api/v1/pitcher_seasons/#{team.id}?year=2026"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      pp response.body

      expect(json).to include("players")
    end
  end
end
