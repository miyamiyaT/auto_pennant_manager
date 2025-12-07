class CreateSpecialAbilities < ActiveRecord::Migration[6.1]
  def change
    create_table :special_abilities do |t|
      t.integer :player_season_id, comment: "シーズン成績のID"
      t.string :name, limit: 12, comment: "特殊能力名"
      t.integer :ability_type, limit: 1, comment: "0:通常,1:赤特,2:金特,3:半々,4:調子・その他"
      t.boolean :position_type, default: false, comment: "0:共通,1:投手,2:野手"
      t.datetime :deleted_at, comment: "論理削除用のカラム"
      t.timestamps
    end

    add_foreign_key :special_abilities, :player_seasons, column: :player_season_id
  end
end
