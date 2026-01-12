class MigrateBatterAbilityRankData < ActiveRecord::Migration[6.1]
  def up
    migrate_rank(:clutch, :clutch_rank)
    migrate_rank(:vs_lhp, :vs_lhp_rank)
    migrate_rank(:stearing, :stealing_rank)
    migrate_rank(:runnning, :running_rank)
    migrate_rank(:throwing, :throwing_rank)
    migrate_catcher_rank(:catcher, :catcher_rank)
    migrate_rank(:grit, :grit_rank)
    migrate_rank(:recovery, :recovery_rank)
  end

  def down
    rollback_rank(:clutch, :clutch_rank)
    rollback_rank(:vs_lhp, :vs_lhp_rank)
    rollback_rank(:stearing, :stealing_rank)
    rollback_rank(:runnning, :running_rank)
    rollback_rank(:throwing, :throwing_rank)
    rollback_catcher_rank(:catcher, :catcher_rank)
    rollback_rank(:grit, :grit_rank)
    rollback_rank(:recovery, :recovery_rank)
  end

  private

  def migrate_rank(old_col, new_col)
    execute <<~SQL
      UPDATE batter_abilities
      SET #{new_col} = CASE #{old_col}
        WHEN 'G' THEN 0
        WHEN 'F' THEN 1
        WHEN 'E' THEN 2
        WHEN 'D' THEN 3
        WHEN 'C' THEN 4
        WHEN 'B' THEN 5
        WHEN 'A' THEN 6
        WHEN 'S' THEN 7
        ELSE 3
      END
    SQL
  end

  def migrate_catcher_rank(old_col, new_col)
    execute <<~SQL
      UPDATE batter_abilities
      SET #{new_col} = CASE #{old_col}
        WHEN 'G' THEN 0
        WHEN 'F' THEN 1
        WHEN 'E' THEN 2
        WHEN 'D' THEN 3
        WHEN 'C' THEN 4
        WHEN 'B' THEN 5
        WHEN 'A' THEN 6
        WHEN 'S' THEN 7
        ELSE NULL
      END
    SQL
  end

  def rollback_rank(old_col, new_col)
    execute <<~SQL
      UPDATE batter_abilities
      SET #{old_col} = CASE #{new_col}
        WHEN 0 THEN 'G'
        WHEN 1 THEN 'F'
        WHEN 2 THEN 'E'
        WHEN 3 THEN 'D'
        WHEN 4 THEN 'C'
        WHEN 5 THEN 'B'
        WHEN 6 THEN 'A'
        WHEN 7 THEN 'S'
        ELSE 'D'
      END
    SQL
  end

  def rollback_catcher_rank(old_col, new_col)
    execute <<~SQL
      UPDATE batter_abilities
      SET #{old_col} = CASE #{new_col}
        WHEN 0 THEN 'G'
        WHEN 1 THEN 'F'
        WHEN 2 THEN 'E'
        WHEN 3 THEN 'D'
        WHEN 4 THEN 'C'
        WHEN 5 THEN 'B'
        WHEN 6 THEN 'A'
        WHEN 7 THEN 'S'
        ELSE NULL
      END
    SQL
  end
end