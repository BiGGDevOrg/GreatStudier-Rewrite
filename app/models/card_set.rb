class CardSet < ApplicationRecord
  include FriendlyId
  friendly_id :name, use: :slugged
  has_rich_text :description
  has_many :cards, dependent: :destroy, inverse_of: :card_set
  accepts_nested_attributes_for :cards, reject_if: :all_blank, allow_destroy: true

  paginates_per 50
end
