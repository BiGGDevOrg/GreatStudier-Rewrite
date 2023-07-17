class CreateCards < ActiveRecord::Migration[7.1]
  def change
    create_table :cards do |t|
      t.string :term
      t.string :definition
      t.belongs_to :card_sets, null: false, foreign_key: true
    end
  end
end
