class CreatePitcherAbilities < ActiveRecord::Migration[6.1]
  def change
    create_table :pitcher_abilities do |t|
      t.integer :player_season_id, comment: "プレイヤーが所属するチームのID"
      t.integer :pitch_velocity, limit: 3, default: 120 , comment: "球速"
      t.integer :control, limit: 3, default: 0 , comment: "コントロール"
      t.integer :stamina, limit: 3, default: 0 , comment: "スタミナ"
      t.string :w_risp, limit: 1, comment: "対ピンチ"
      t.string :heather, limit: 1, comment: "ノビ"  
      t.string :vs_lbh, limit: 1, comment: "対左打者"  
      t.string :agile, limit: 1, comment: "クイック"  
      t.string :poise, limit: 1, comment: "打たれ強さ"  
      t.string :grit, limit: 1, comment: "ケガしにくさ" 
      t.string :recovery, limit: 1, comment: "回復"
      t.string :special_ability, limit: 255, comment: "特殊能力"  
      t.datetime :deleted_at, comment: "論理削除用のカラム"
      t.timestamps
    end

    add_foreign_key :pitcher_abilities, :player_seasons, column: :player_season_id
  end
end
