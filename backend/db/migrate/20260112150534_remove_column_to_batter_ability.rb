class RemoveColumnToBatterAbility < ActiveRecord::Migration[6.1]
  def up
    remove_column :batter_abilities, :clutch
    remove_column :batter_abilities, :vs_lhp
    remove_column :batter_abilities, :stearing
    remove_column :batter_abilities, :runnning
    remove_column :batter_abilities, :throwing
    remove_column :batter_abilities, :catcher
    remove_column :batter_abilities, :grit
    remove_column :batter_abilities, :recovery
  end

  def down
    add_column :batter_abilities, :clutch, :string, limit: 1, default: 'D', null: false
    add_column :batter_abilities, :vs_lhp, :string, limit: 1, default: 'D', null: false
    # タイポあり
    add_column :batter_abilities, :stearing, :string, limit: 1, default: 'D', null: false
    add_column :batter_abilities, :runnning, :string, limit: 1, default: 'D', null: false
    add_column :batter_abilities, :throwing, :string, limit: 1, default: 'D', null: false
    add_column :batter_abilities, :catcher, :string, limit: 1, null: true
    add_column :batter_abilities, :grit, :string, limit: 1, default: 'D', null: false
    add_column :batter_abilities, :recovery, :string, limit: 1, default: 'D', null: false
  end
end
