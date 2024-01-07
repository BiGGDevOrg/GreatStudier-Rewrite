class CardSet < ApplicationRecord
  include FriendlyId
  friendly_id :name, use: :slugged
  has_rich_text :description
  has_many :cards, dependent: :destroy, inverse_of: :card_set
  accepts_nested_attributes_for :cards, reject_if: :all_blank, allow_destroy: true

  validates_presence_of :name, message: "cannot be blank."
  validates_associated :cards, message: "must be valid."

  validate :has_required_cards?

  paginates_per 50

  private

  def has_required_cards?
    errors.add(:minimum, "three terms in a set.") if cards.length < 3
  end
end
