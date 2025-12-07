class CreateBreakingBalls < ActiveRecord::Migration[6.1]
  def change
    create_table :breaking_balls do |t|
      t.integer :player_season_id, comment: "プレイヤーが所属するチームのID"
      t.string :name, limit: 12, comment: "変化球名"
      t.integer :direction, limit: 1, comment: "変化方向"
      t.integer :variation, limit: 1, comment: "変化量"
      t.boolean :is_original, default: false, comment: "オリジナル変化球"
      t.datetime :deleted_at, comment: "論理削除用のカラム"
      t.timestamps
    end

    add_foreign_key :breaking_balls, :player_seasons, column: :player_season_id
  end
end
