class CardSet < ApplicationRecord
  include FriendlyId
  friendly_id :name, use: :slugged
  has_rich_text :description
  has_many :cards, dependent: :destroy
end