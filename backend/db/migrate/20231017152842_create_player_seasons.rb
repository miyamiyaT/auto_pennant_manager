class CreatePlayerSeasons < ActiveRecord::Migration[6.1]
  def change
    create_table :player_seasons do |t|
      t.integer :player_id, comment: "プレイヤーが所属するチームのID"
      t.integer :year, limit: 4, comment: "年度"
      t.integer :age, null: false, limit: 2, comment: "プレイヤーの年齢"
      t.string :number, limit: 2, comment: "背番号"  
      t.integer :growth_type, limit: 1, comment: "成長タイプ  0:超早熟,1:早熟,2:普通,3:晩成,4:超晩成"
      t.integer :current_growth_type, limit: 1, comment: "現在の成長タイプ 0:成長期前,1:成長期,2:全盛期,3:衰退期"
      t.boolean :is_starter, default: false, comment: "先発カラム"
      t.boolean :is_relief, default: false, comment: "中継ぎカラム"
      t.boolean :is_closer, default: false, comment: "抑えカラム"
      t.boolean :is_catcher, default: false, comment: "捕手カラム"
      t.boolean :is_first, default: false, comment: "一塁手カラム"
      t.boolean :is_second, default: false, comment: "二塁手カラム"
      t.boolean :is_third, default: false, comment: "三塁手カラム"
      t.boolean :is_short, default: false, comment: "遊撃手カラム"
      t.boolean :is_outfielder, default: false, comment: "外野手カラム"
      t.string :plate_appearances, comment: "特性メモ"
      t.string :memo, comment: "メモ"
      t.datetime :deleted_at, comment: "論理削除用のカラム"
      t.timestamps
    end

    add_foreign_key :player_seasons, :players, column: :player_id
  end
end
