require 'rails_helper'

RSpec.describe PlayerSeason, type: :model do
  it "Valid player_season can be saved." do
    player_season = build(:player_season)
    expect(player_season).to be_valid
  end
end
