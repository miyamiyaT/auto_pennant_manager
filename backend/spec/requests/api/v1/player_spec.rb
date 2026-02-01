require 'rails_helper'

RSpec.describe 'Api::V1::Players', type: :request do
  describe 'POST' do
    let!(:team) { create(:team) }

    let(:params) do
      {
        player: {
          team_id: team.id,
          birthday: "2019-12-18",
          name: "テストテスト",
          memo: "テストテスト",
          id_favorite: false,
          roy: false,
          draft_year: 2025,
          draft_type: "high_school"
        },
        player_season: {
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
        }
      }
    end

    it '選手登録が成功し 201 を返す' do
      post '/api/v1/players', params: params

      expect(response).to have_http_status(:created)

      json = JSON.parse(response.body)
      pp response.body

      expect(json).to include("birthday")
    end
  end
end
