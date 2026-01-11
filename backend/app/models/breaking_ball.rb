class BreakingBall < ApplicationRecord
  # バリデーション
  validates :name, length: { maximum: 12 }, presence: true
  validates :direction, presence: true, inclusion: 0..5
  validates :variation, presence: true, inclusion: 1..7

  # アソシエーション
  belongs_to :player_season
end
