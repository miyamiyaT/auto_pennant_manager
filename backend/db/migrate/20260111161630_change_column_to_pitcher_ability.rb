class ChangeColumnToPitcherAbility < ActiveRecord::Migration[6.1]
  def change
    # pitcher_abilityテーブルの変更
    # rankのある特殊能力をstringからintegerへ変更するため、カラム追加
    add_column :pitcher_abilities, :w_risp_rank, :integer, default: 3, null: false
    add_column :pitcher_abilities, :heather_rank, :integer, default: 3, null: false
    add_column :pitcher_abilities, :vs_lbh_rank, :integer, default: 3, null: false
    add_column :pitcher_abilities, :agile_rank, :integer, default: 3, null: false
    add_column :pitcher_abilities, :poise_rank, :integer, default: 3, null: false
    add_column :pitcher_abilities, :grit_rank, :integer, default: 3, null: false
    add_column :pitcher_abilities, :recovery_rank, :integer, default: 3, null: false
  end
end
