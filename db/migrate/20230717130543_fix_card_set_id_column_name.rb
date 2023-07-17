class FixCardSetIdColumnName < ActiveRecord::Migration[7.1]
  def change
    rename_column :cards, :card_sets_id, :card_set_id
  end
end
