class CreateBatterSeasons < ActiveRecord::Migration[6.1]
  def change
    create_table :batter_seasons do |t|
      t.integer :player_season_id, comment: "プレイヤーが所属するチームのID"
      t.integer :games, limit: 3, default: 0 , comment: "試合数"
      t.integer :at_bat, limit: 3, default: 0 , comment: "打数"
      t.integer :hits, limit: 3, default: 0 , comment: "安打数"
      t.integer :hr,  limit: 3, default: 0 , comment: "本塁打数"
      t.integer :works, limit: 3, default: 0 , comment: "四死球数"
      t.integer :total_bases, limit: 3, default: 0 , comment: "塁打数"
      t.integer :rbi, limit: 3, default: 0 , comment: "打点数"
      t.integer :steals, limit: 3, default: 0 , comment: "盗塁数"
      t.float :batting_average, comment: "打率"
      t.float :ab_hr, comment: "本塁打率"
      t.float :slg, comment: "長打率"
      t.float :oba, comment: "擬似出塁率"
      t.float :ops, comment: "ops"

      t.datetime :deleted_at, comment: "論理削除用のカラム"
      t.timestamps
    end

    add_foreign_key :batter_seasons, :player_seasons, column: :player_season_id
  end
end
