class AddCardSetsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_reference :card_sets, :user, foreign_key: true
  end
end
