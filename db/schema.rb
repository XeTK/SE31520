# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20130904124852) do

  create_table "broadcasts", force: true do |t|
    t.text     "content"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "broadcasts", ["user_id"], name: "index_broadcasts_on_user_id"

  create_table "broadcasts_feeds", id: false, force: true do |t|
    t.integer "broadcast_id"
    t.integer "feed_id"
  end

  add_index "broadcasts_feeds", ["broadcast_id"], name: "index_broadcasts_feeds_on_broadcast_id"
  add_index "broadcasts_feeds", ["feed_id"], name: "index_broadcasts_feeds_on_feed_id"

  create_table "feeds", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "images", force: true do |t|
    t.integer  "user_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  add_index "images", ["user_id"], name: "index_images_on_user_id"

  create_table "user_details", force: true do |t|
    t.string  "login",            limit: 40
    t.string  "salt",             limit: 40
    t.string  "crypted_password", limit: 40
    t.integer "user_id"
  end

  add_index "user_details", ["user_id"], name: "index_user_details_on_user_id"

  create_table "users", force: true do |t|
    t.string   "surname",                    null: false
    t.string   "firstname",                  null: false
    t.string   "phone"
    t.integer  "grad_year",                  null: false
    t.boolean  "jobs",       default: false
    t.string   "email",                      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email"
  add_index "users", ["surname"], name: "index_users_on_surname"

end
