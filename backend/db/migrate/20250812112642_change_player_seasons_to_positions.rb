class ChangePlayerSeasonsToPositions < ActiveRecord::Migration[6.1]
  def change
    # playersテーブルへ追加
    add_column :players, :draft_year, :integer, null: true
    add_column :players, :draft_rank, :integer, null: true
    add_column :players, :draft_type, :integer, null: true, comment: "0:高卒, 1:大卒, 2:社会人, 3:独立, 4:その他"
    add_column :players, :roy, :boolean, default: false

    # player_seasonsテーブルへ追加
    add_column :player_seasons, :position_code, :integer, null: true, comment: "0: 1番手先発, 1: 2番手先発, 2: 3番手先発, 3: 4番手先発, 4: 5番手先発 ,5: 6番手先発,
      6: 1番手中継ぎ ,7: 2番手中継ぎ, 8: 3番手中継ぎ, 9: 4番手中継ぎ, 10: 5番手中継ぎ, 11: 6番手中継ぎ,12: クローザー
      13: キャッチャー, 14: ファースト, 15: セカンド, 16: ショート, 17: サード, 18: レフト, 19: センター, 20:ライト"
    add_column :player_seasons, :teams, :integer, null: true
  end
end
