class StudyController < CardSetsController
  before_action :set_card_set

  def show
    @cards = @card_set.cards.to_json
    @index = 0
  end

  private

  def set_card_set
    @card_set = CardSet.friendly.find(params[:card_set_id])
  end

end