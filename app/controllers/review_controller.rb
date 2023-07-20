class ReviewController < ApplicationController
  before_action :set_card_set

  def show
    @card_set_id = @card_set.friendly_id
    @cards = @card_set.cards.to_json
  end

  private

  def set_card_set
    @card_set = CardSet.friendly.find(params[:card_set_id])
  end

end
