class BatterSeason < ApplicationRecord
  acts_as_paranoid

  # バリデーション
  validates :games, presence: true, inclusion: 0..200
  validates :at_bat, presence: true, inclusion: 0..999
  validates :hits, presence: true, inclusion: 0..999
  validates :hr, presence: true, inclusion: 0..999
  validates :works, presence: true, inclusion: 0..999
  validates :total_bases, presence: true, inclusion: 0..999
  validates :rbi, presence: true, inclusion: 0..999
  validates :steals, presence: true, inclusion: 0..999
  validates :batting_average, numericality: { less_than_or_equal_to: 1 }
  validates :ab_hr, numericality: { less_than_or_equal_to: 999.99 }
  validates :slg, numericality: { less_than_or_equal_to: 4 }
  validates :oba, numericality: { less_than_or_equal_to: 9.999 }
  validates :ops, numericality: { less_than_or_equal_to: 9.999 }

  # アソシエーション
  belongs_to :player_season
end
