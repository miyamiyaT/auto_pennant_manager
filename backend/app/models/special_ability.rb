class SpecialAbility < ApplicationRecord
  # バリデーション
  validates :name, length: { maximum: 12 }, presence: true

  # アソシエーション
  belongs_to :player_season
end
