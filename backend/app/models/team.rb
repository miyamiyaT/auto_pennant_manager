class Team < ApplicationRecord
  acts_as_paranoid

  # バリデーション
  validates :sponsor, length: { maximum: 8 }, presence: true
  validates :name, length: { maximum: 10 }, presence: true
  validates :deleted_at, absence: true

  # アソシエーション
  has_many :player, dependent: :destroy

  # 削除
  def delete_item
    update(deleted_at: Time.current)
  end

  # 一覧取得
  def self.get_all_items
    where(deleted_at: nil)
  end

  # 歴代シーズン一覧
  def self.get_all_years(id)
    find_by(id: id, deleted_at: nil).player.joins(:player_season).pluck('player_seasons.year').uniq
  end

  # 詳細取得
  def self.get_item(id)
    find_by(id: id, deleted_at: nil)
  end
end
