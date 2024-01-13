class Card < ApplicationRecord
  belongs_to :card_set

  validates_presence_of :term, message: "Term cannot be blank."
  validates_presence_of :definition, message: "Definition cannot be blank."
end
