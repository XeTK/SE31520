class CreateBroadcastsFeeds < ActiveRecord::Migration
	def change
    # No primary key id since a join table
    # Add indexes on to foreign keys to allow efficient lookup
		create_table "broadcasts_feeds", id: false, force: true do |t|
			t.references :broadcast, null: :no, index: true
			t.references :feed, null: :no, index: true
		end
	end
end
