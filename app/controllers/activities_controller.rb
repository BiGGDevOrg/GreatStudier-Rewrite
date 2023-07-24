class ActivitiesController < ApplicationController
  before_action :set_cards

  def learn
  end

  def review
    @is_review = true
  end

  def study
    @is_review = false
  end

  private

  def set_cards
    @card_set = CardSet.friendly.find(params[:card_set_id])
    @card_set_id = @card_set.friendly_id
    @cards = @card_set.cards.to_json
  end
end