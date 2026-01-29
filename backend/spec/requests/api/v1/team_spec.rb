require 'rails_helper'

RSpec.describe 'Api::V1::Teams', type: :request do
  describe 'GET /show' do
    let!(:team) { create(:team) }
    let!(:player) { create(:player, team: team) }
    let!(:player_season) { create(:player_season, player: player) }

    it "returns team data" do

      get "/api/v1/teams/#{team.id}"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      pp response.body

      expect(json).to include("team", "active_players", "retire_players", "season_list")
    end
  end
end
