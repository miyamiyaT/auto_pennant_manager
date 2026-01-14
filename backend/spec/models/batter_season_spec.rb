require 'rails_helper'

RSpec.describe BatterSeason, type: :model do
  it "Valid batter_season can be saved." do
    batter_season = build(:batter_season)
    expect(batter_season).to be_valid
  end
end
