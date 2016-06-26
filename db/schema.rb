l encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160304011000) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "countries", force: :cascade do |t|
    t.string   "country_name"
    t.string   "map_code"
    t.integer  "currency_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "ppp"
    t.integer  "peace_rank"
    t.float    "peace_score"
  end

  add_index "countries", ["currency_id"], name: "index_countries_on_currency_id", using: :btree

  create_table "currencies", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "code"
  end

  create_table "historical_data", force: :cascade do |t|
    t.time     "date"
    t.hstore   "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "uid"
    t.string   "bio"
    t.string   "image_url"
    t.string   "token"
    t.string   "secret"
    t.string   "provider"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "email"
  end

  add_foreign_key "countries", "currencies"
end
