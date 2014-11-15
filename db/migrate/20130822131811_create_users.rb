class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :surname,  null: false
      t.string :firstname, null: false
      t.string :phone
      t.integer :grad_year, null: false
      t.boolean :jobs, default: false
      t.string :email , null: false

      t.timestamps
    end

    add_index :users, :surname
    add_index :users, :email
  end
end
