class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.integer :team_id, comment: "プレイヤーが所属するチームのID"
      t.string :name, null: false, limit: 10, comment: "プレイヤーの名前"
      t.date :birthday, null: false, comment: "生年月日"
      t.boolean :is_favorite, default: false, comment: "お気に入り選手"
      t.boolean :is_active, default: false, comment: "現役選手判定フラグ"
      t.string :memo, comment: "選手所感"
      t.datetime :deleted_at, comment: "論理削除用のカラム"
      t.timestamps
    end

    add_foreign_key :players, :teams, column: :team_id
  end
end
