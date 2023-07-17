class CardSetsController < ApplicationController
  before_action :set_card_set, only: [:show, :edit, :update, :destroy]

  def index
    @sets = CardSet.all
  end

  def show
  end

  def new
    @set = CardSet.new
    @cards = @set.cards.build
  end

  def create
    @set = CardSet.new(set_params)
    @set.cards << Card.new(term: 'a', definition: 'b')
    @set.cards << Card.new(term: 'c', definition: 'b')
    @set.cards << Card.new(term: 'e', definition: 'b')
    respond_to do |format|
      if @set.save
        format.html { redirect_to card_set_url(@set), notice: "Set successfully created." }
        format.json { render :show, status: :created, location: @set }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @set.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
    @set.update(set_params)
    respond_to do |format|
      if @set.save
        format.html { redirect_to card_set_url(@set), notice: "Set successfully updated." }
        format.json { render :show, status: :ok, location: @set }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @set.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @set.destroy
    redirect_to card_sets_path
  end

  def new_card
    @cards = Card.new
  end

  private

  def set_card_set
    @set = CardSet.friendly.find(params[:id])
  end

  def set_params
    params.require(:card_set).permit(:name, :description, cards_attributes: [:id, :term, :definition, :_destroy])
  end
end