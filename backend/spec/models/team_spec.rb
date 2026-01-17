require 'rails_helper'

RSpec.describe Team, type: :model do
  it "Valid team can be saved." do
    team = build(:team)
    expect(team).to be_valid
  end
end
