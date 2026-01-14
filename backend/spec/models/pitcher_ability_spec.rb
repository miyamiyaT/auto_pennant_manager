require 'rails_helper'

RSpec.describe PitcherAbility, type: :model do
  it "Valid pitcher_ability can be saved." do
    pitcher_ability = build(:pitcher_ability)
    expect(pitcher_ability).to be_valid
  end
end
