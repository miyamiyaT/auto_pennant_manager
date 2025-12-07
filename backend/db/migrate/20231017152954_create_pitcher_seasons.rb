class CreatePitcherSeasons < ActiveRecord::Migration[6.1]
  def change
    create_table :pitcher_seasons do |t|
      t.integer :player_season_id, comment: "プレイヤーが所属するチームのID"
      t.integer :games, limit: 3, default: 0 ,comment: "登板数"
      t.integer :innings, limit: 3, default: 0 , comment: "イニング数"
      t.integer :thirds, limit: 1, default: 0 , comment: "1/3イニング"
      t.integer :wins, limit: 3, default: 0 , comment: "勝利数"
      t.integer :loses, limit: 3, default: 0 , comment: "敗北数"
      t.integer :saves, limit: 3, default: 0 , comment: "セーブ数"
      t.integer :hold_points, limit: 3, default: 0 , comment: "ホールド数"
      t.integer :strikeouts, limit: 3, default: 0 , comment: "奪三振数"
      t.integer :bb, limit: 3, default: 0 , comment: "与四死球数"
      t.integer :hits_allowed_numbers, default: 0 , limit: 3, comment: "被安打数"
      t.integer :earned_runs, limit: 3, default: 0 , comment: "自責点"
      t.float :win_rate, comment: "勝率"
      t.float :era, comment: "防御率"
      t.float :k9, comment: "奪三振率"
      t.float :bb9, comment: "四死球率"
      t.float :k_bb, comment: "K/BB (あえて四死球で計算しています)"
      t.float :whip, comment: "whip"
      t.datetime :deleted_at, comment: "論理削除用のカラム"
      t.timestamps
    end

    add_foreign_key :pitcher_seasons, :player_seasons, column: :player_season_id
  end
end
