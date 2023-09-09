class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :session_token
      t.string :display_name
      t.boolean :is_admin, default: false

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
