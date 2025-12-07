class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.string :sponsor, null: true, limit: 10, comment: "チームスポンサー名"
      t.string :name, null: true, limit: 10, comment: "チーム名"
      t.datetime :deleted_at, comment: "論理削除用のカラム"
      t.timestamps
    end
  end
end
