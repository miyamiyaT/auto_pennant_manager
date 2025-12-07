class BreakingBall < ApplicationRecord
  # バリデーション
  validates :name, length: { maximum: 12 }, presence: true
  validates :direction, presence: true, inclusion: 0..5
  validates :variation, presence: true, inclusion: 1..7
  validates :is_original, inclusion: { in: [true, false] }


  # アソシエーション
  belongs_to :player_season
end
