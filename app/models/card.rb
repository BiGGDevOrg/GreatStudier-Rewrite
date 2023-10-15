class Card < ApplicationRecord
  belongs_to :card_set

  validates :term, presence: true
  validates :definition, presence: true
end
