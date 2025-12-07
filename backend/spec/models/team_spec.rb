require 'rails_helper'

RSpec.describe Team, type: :model do
  it '一覧取得' do
    team = Team.get_all_items
    puts "team: #{team}"

    expect(team).not_to be_nil
  end

  it '詳細取得' do
    team = Team.get_item(1)

    puts "team: #{team.inspect}"
    expect(team).not_to be_nil
  end


end
