# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2025_08_12_112642) do

  create_table "batter_abilities", force: :cascade do |t|
    t.integer "player_season_id"
    t.integer "trajectory", limit: 1, default: 1
    t.integer "hit", limit: 3, default: 0
    t.integer "power", limit: 3, default: 0
    t.integer "run_speed", limit: 3, default: 0
    t.integer "arm_strength", limit: 3, default: 0
    t.integer "fielding", limit: 3, default: 0
    t.integer "catching", limit: 3, default: 0
    t.string "clutch", limit: 1
    t.string "vs_lhp", limit: 1
    t.string "stearing", limit: 1
    t.string "runnning", limit: 1
    t.string "throwing", limit: 1
    t.string "catcher", limit: 1
    t.string "grit", limit: 1
    t.string "recovery", limit: 1
    t.string "special_ability", limit: 255
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "batter_seasons", force: :cascade do |t|
    t.integer "player_season_id"
    t.integer "games", limit: 3, default: 0
    t.integer "at_bat", limit: 3, default: 0
    t.integer "hits", limit: 3, default: 0
    t.integer "hr", limit: 3, default: 0
    t.integer "works", limit: 3, default: 0
    t.integer "total_bases", limit: 3, default: 0
    t.integer "rbi", limit: 3, default: 0
    t.integer "steals", limit: 3, default: 0
    t.float "batting_average"
    t.float "ab_hr"
    t.float "slg"
    t.float "oba"
    t.float "ops"
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "breaking_balls", force: :cascade do |t|
    t.integer "player_season_id"
    t.string "name", limit: 12
    t.integer "direction", limit: 1
    t.integer "variation", limit: 1
    t.boolean "is_original", default: false
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "pitcher_abilities", force: :cascade do |t|
    t.integer "player_season_id"
    t.integer "pitch_velocity", limit: 3, default: 120
    t.integer "control", limit: 3, default: 0
    t.integer "stamina", limit: 3, default: 0
    t.string "w_risp", limit: 1
    t.string "heather", limit: 1
    t.string "vs_lbh", limit: 1
    t.string "agile", limit: 1
    t.string "poise", limit: 1
    t.string "grit", limit: 1
    t.string "recovery", limit: 1
    t.string "special_ability", limit: 255
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "pitcher_seasons", force: :cascade do |t|
    t.integer "player_season_id"
    t.integer "games", limit: 3, default: 0
    t.integer "innings", limit: 3, default: 0
    t.integer "thirds", limit: 1, default: 0
    t.integer "wins", limit: 3, default: 0
    t.integer "loses", limit: 3, default: 0
    t.integer "saves", limit: 3, default: 0
    t.integer "hold_points", limit: 3, default: 0
    t.integer "strikeouts", limit: 3, default: 0
    t.integer "bb", limit: 3, default: 0
    t.integer "hits_allowed_numbers", limit: 3, default: 0
    t.integer "earned_runs", limit: 3, default: 0
    t.float "win_rate"
    t.float "era"
    t.float "k9"
    t.float "bb9"
    t.float "k_bb"
    t.float "whip"
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "player_seasons", force: :cascade do |t|
    t.integer "player_id"
    t.integer "year", limit: 4
    t.integer "age", limit: 2, null: false
    t.string "number", limit: 2
    t.integer "growth_type", limit: 1
    t.integer "current_growth_type", limit: 1
    t.boolean "is_starter", default: false
    t.boolean "is_relief", default: false
    t.boolean "is_closer", default: false
    t.boolean "is_catcher", default: false
    t.boolean "is_first", default: false
    t.boolean "is_second", default: false
    t.boolean "is_third", default: false
    t.boolean "is_short", default: false
    t.boolean "is_outfielder", default: false
    t.string "plate_appearances"
    t.string "memo"
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "position_code"
    t.integer "teams"
  end

  create_table "players", force: :cascade do |t|
    t.integer "team_id"
    t.string "name", limit: 10, null: false
    t.date "birthday", null: false
    t.boolean "is_favorite", default: false
    t.boolean "is_active", default: false
    t.string "memo"
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "draft_year"
    t.integer "draft_rank"
    t.integer "draft_type"
    t.boolean "roy", default: false
  end

  create_table "special_abilities", force: :cascade do |t|
    t.integer "player_season_id"
    t.string "name", limit: 12
    t.integer "ability_type", limit: 1
    t.boolean "position_type", default: false
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string "sponsor", limit: 10
    t.string "name", limit: 10
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "batter_abilities", "player_seasons"
  add_foreign_key "batter_seasons", "player_seasons"
  add_foreign_key "breaking_balls", "player_seasons"
  add_foreign_key "pitcher_abilities", "player_seasons"
  add_foreign_key "pitcher_seasons", "player_seasons"
  add_foreign_key "player_seasons", "players"
  add_foreign_key "players", "teams"
  add_foreign_key "special_abilities", "player_seasons"
end
