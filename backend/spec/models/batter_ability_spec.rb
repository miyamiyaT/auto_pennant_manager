require 'rails_helper'

RSpec.describe BatterAbility, type: :model do
  it "Valid batter_ability can be saved." do
    batter_ability = build(:batter_ability)
    expect(batter_ability).to be_valid
  end
end
