class CardSet < ApplicationRecord
  include FriendlyId
  friendly_id :name, use: :slugged
  has_rich_text :description
  has_many :cards, dependent: :destroy, inverse_of: :card_set
  accepts_nested_attributes_for :cards, reject_if: :all_blank, allow_destroy: true

  validates :name, presence: true
  validates_associated :cards 

  validate :has_required_cards?

  paginates_per 50

  private

  def has_required_cards?
    errors.add(:minimum, "You must have at least 3 terms in a set.") if cards.length < 3
  end
end
