class PlayerSeason < ApplicationRecord
  acts_as_paranoid

  enum growth_type: { super_early: 0, early: 1, normal: 2, late: 3, super_late: 4 }
  enum current_growth_type: { pre_growth: 0, growth_phase: 1, prime: 2, decline_phase: 3 }

  # バリデーション
  validates :age, presence: true, inclusion: 16..99, numericality: { only_integer: true }
  validates :year, presence: true, inclusion: 2000..9999
  validates :number, length: { maximum: 3 }, allow_nil: true
  validates :plate_appearances, length: { maximum: 80 }
  validates :memo, length: { maximum: 80 }
  validates :growth_type, :current_growth_type, presence: true

  # アソシエーション
  belongs_to :player
  has_many :pitcher_seasons, dependent: :destroy
  has_many :batter_seasons, dependent: :destroy
  has_many :pitcher_abilities, dependent: :destroy
  has_many :batter_abilities, dependent: :destroy
  has_many :breaking_balls, dependent: :destroy
  has_many :special_abilities, dependent: :destroy

    # 削除
    def delete_item
      update(deleted_at: Time.current)
    end
  
    # 詳細取得
    def self.get_item(id)
      find_by(id: id, deleted_at: nil)
    end

    # 投手の選手記録一覧取得
    def self.get_pitcher_all_item(id)
      find_by(id: id, deleted_at: nil)
    end
end
