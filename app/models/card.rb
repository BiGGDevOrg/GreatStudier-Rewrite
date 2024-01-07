class Card < ApplicationRecord
  belongs_to :card_set

  validates_presence_of :term, message: "cannot be blank."
  validates_presence_of :definition, message: "cannot be blank."
end