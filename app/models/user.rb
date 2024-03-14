class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :card_sets, dependent: :destroy
  has_many :cards, through: :card_sets

  validates :email, uniqueness: true
  validates :username, uniqueness: true
end
