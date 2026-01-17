require 'rails_helper'

RSpec.describe BreakingBall, type: :model do
  it "Valid breaking_ball can be saved." do
    breaking_ball = build(:breaking_ball)
    expect(breaking_ball).to be_valid
  end
end
