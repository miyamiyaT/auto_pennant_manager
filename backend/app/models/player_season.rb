class PlayerSeason < ApplicationRecord
  acts_as_paranoid

  # バリデーション
  validates :age, presence: true, inclusion: 16..99, numericality: { only_integer: true }
  validates :year, presence: true, inclusion: 1000..9999
  validates :growth_type, inclusion: 0..4, allow_nil: true
  validates :current_growth_type, inclusion: 0..3, allow_nil: true
  validates :number, length: { maximum: 2 }, allow_nil: true
  validates :is_starter, inclusion: { in: [true, false] }
  validates :is_relief, inclusion: { in: [true, false] }
  validates :is_closer, inclusion: { in: [true, false] }
  validates :is_catcher, inclusion: { in: [true, false] }
  validates :is_first, inclusion: { in: [true, false] }
  validates :is_second, inclusion: { in: [true, false] }
  validates :is_third, inclusion: { in: [true, false] }
  validates :is_short, inclusion: { in: [true, false] }
  validates :is_outfielder, inclusion: { in: [true, false] }
  validates :plate_appearances, length: { maximum: 80 }
  validates :memo, length: { maximum: 80 }

  # アソシエーション
  belongs_to :player
  has_many :pitcher_season, dependent: :destroy
  has_many :batter_season, dependent: :destroy
  has_many :pitcher_ability, dependent: :destroy
  has_many :batter_ability, dependent: :destroy
  has_many :breaking_ball, dependent: :destroy
  has_many :special_ability, dependent: :destroy

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
