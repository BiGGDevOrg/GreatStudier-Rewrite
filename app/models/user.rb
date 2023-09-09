class User < ApplicationRecord
  has_many :card_set, dependent: :destroy, inverse_of: :user
  has_many :cards, through: :card_set, dependent: :destroy, inverse_of: :user
end