require 'rails_helper'

RSpec.describe PitcherSeason, type: :model do
  it "Valid pitcher_season can be saved." do
    pitcher_season = build(:pitcher_season)
    expect(pitcher_season).to be_valid
  end
end
