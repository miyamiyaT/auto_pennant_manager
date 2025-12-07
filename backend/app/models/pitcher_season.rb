class PitcherSeason < ApplicationRecord
  acts_as_paranoid

  # バリデーション
  validates :games, presence: true, inclusion: 0..200
  validates :innings, presence: true, inclusion: 0..250
  validates :thirds, presence: true, inclusion: 0..3
  validates :wins, presence: true, inclusion: 0..200
  validates :loses, presence: true, inclusion: 0..200
  validates :saves, presence: true, inclusion: 0..200
  validates :hold_points, presence: true, inclusion: 0..200
  validates :strikeouts, presence: true, inclusion: 0..999
  validates :bb, presence: true, inclusion: 0..999
  validates :hits_allowed_numbers, presence: true, inclusion: 0..999
  validates :earned_runs, presence: true, inclusion: 0..999
  validates :win_rate, numericality: { less_than_or_equal_to: 1 }
  validates :era, numericality: { less_than_or_equal_to: 99.99 }
  validates :k9, numericality: { less_than_or_equal_to: 99.99 }
  validates :bb9, numericality: { less_than_or_equal_to: 99.99 }
  validates :whip, numericality: { less_than_or_equal_to: 99.99 }

  # アソシエーション
  belongs_to :player_season
end
