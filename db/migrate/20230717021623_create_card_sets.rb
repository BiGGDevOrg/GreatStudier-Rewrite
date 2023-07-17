class CreateCardSets < ActiveRecord::Migration[7.1]
  def change
    create_table :card_sets do |t|
      t.string :name
      t.string :slug
      t.timestamps
    end
    add_index :card_sets, :slug, unique: true
  end
end