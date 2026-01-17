require 'rails_helper'

RSpec.describe Player, type: :model do
  it "Valid player can be saved." do
    player = build(:player)
    expect(player).to be_valid
  end
end
