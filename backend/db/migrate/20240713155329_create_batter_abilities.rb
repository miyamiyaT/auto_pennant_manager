class CreateBatterAbilities < ActiveRecord::Migration[6.1]
  def change
    create_table :batter_abilities do |t|
      t.integer :player_season_id, comment: "プレイヤーが所属するチームのID"
      t.integer :trajectory, limit: 1, default: 1 , comment: "弾道"
      t.integer :hit, limit: 3, default: 0 , comment: "ミート"
      t.integer :power, limit: 3, default: 0 , comment: "パワー"
      t.integer :run_speed,  limit: 3, default: 0 , comment: "走力"
      t.integer :arm_strength, limit: 3, default: 0 , comment: "肩力"
      t.integer :fielding, limit: 3, default: 0 , comment: "守備力"
      t.integer :catching, limit: 3, default: 0 , comment: "捕球"
      t.string :clutch, limit: 1, comment: "チャンス"
      t.string :vs_lhp, limit: 1, comment: "対左打者"  
      t.string :stearing, limit: 1, comment: "盗塁"  
      t.string :runnning, limit: 1, comment: "走塁"  
      t.string :throwing, limit: 1, comment: "送球" 
      t.string :catcher, limit: 1, comment: "キャッチャー"   
      t.string :grit, limit: 1, comment: "ケガしにくさ"  
      t.string :recovery, limit: 1, comment: "回復"  
      t.string :special_ability, limit: 255, comment: "特殊能力"  
      t.datetime :deleted_at, comment: "論理削除用のカラム"
      t.timestamps
    end

    add_foreign_key :batter_abilities, :player_seasons, column: :player_season_id
  end
end
