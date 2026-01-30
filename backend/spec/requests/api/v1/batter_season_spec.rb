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
end
