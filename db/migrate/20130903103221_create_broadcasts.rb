class CreateBroadcasts < ActiveRecord::Migration
  def change
    create_table :broadcasts do |t|
      t.text :content, null: :no # Must have some text, empty broadcasts not allowed
      t.references :user, null: :no, index: true  # Must have been initiated by someone

      t.timestamps  # Created at will double up as broadcast date
    end
  end
end
