class ChangeColumnToBatterAbility < ActiveRecord::Migration[6.1]
  def change
    # batter_abilityテーブルの変更
    # rankのある特殊能力をstringからintegerへ変更するため、カラム追加
    add_column :batter_abilities, :clutch_rank, :integer, default: 3, null: false
    add_column :batter_abilities, :vs_lhp_rank, :integer, default: 3, null: false
    add_column :batter_abilities, :stealing_rank, :integer, default: 3, null: false
    add_column :batter_abilities, :running_rank, :integer, default: 3, null: false
    add_column :batter_abilities, :throwing_rank, :integer, default: 3, null: false
    add_column :batter_abilities, :catcher_rank, :integer, default: 0, null: true
    add_column :batter_abilities, :grit_rank, :integer, default: 3, null: false
    add_column :batter_abilities, :recovery_rank, :integer, default: 3, null: false
  end
end
