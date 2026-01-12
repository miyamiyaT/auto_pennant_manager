class RemoveColumnToPitcherAbility < ActiveRecord::Migration[6.1]
  def up
    remove_column :pitcher_abilities, :w_risp
    remove_column :pitcher_abilities, :heather
    remove_column :pitcher_abilities, :vs_lbh
    remove_column :pitcher_abilities, :agile
    remove_column :pitcher_abilities, :poise
    remove_column :pitcher_abilities, :grit
    remove_column :pitcher_abilities, :recovery
  end

  def down
    add_column :pitcher_abilities, :w_risp, :string, limit: 1, default: 'D', null: false
    add_column :pitcher_abilities, :heather, :string, limit: 1, default: 'D', null: false
    add_column :pitcher_abilities, :vs_lbh, :string, limit: 1, default: 'D', null: false
    add_column :pitcher_abilities, :agile, :string, limit: 1, default: 'D', null: false
    add_column :pitcher_abilities, :poise, :string, limit: 1, default: 'D', null: false
    add_column :pitcher_abilities, :grit, :string, limit: 1, default: 'D', null: false
    add_column :pitcher_abilities, :recovery, :string, limit: 1, default: 'D', null: false
  end
end
