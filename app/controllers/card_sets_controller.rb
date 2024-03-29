class CardSetsController < ApplicationController
  before_action :set_card_set, only: [:show, :edit, :update, :destroy, :download]

  def index
    @page_number = params[:page]
    @sets = CardSet.order(:name).page(CardSet.page(@page_number).out_of_range? ? 1 : @page_number)
  end

  def show
  end

  def new
    @set = CardSet.new
    3.times { @set.cards.build }
  end

  def create
    @set = CardSet.new(set_params)
    respond_to do |format|
      if @set.save
        format.html { redirect_to card_set_url(@set), notice: "Set successfully created." }
        format.json { render :show, status: :created, location: @set }
      else
        flash[:danger] = ["Unable to create set."]
        flash[:danger].push(*@set.errors) 
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
        flash[:danger] = ["Unable to update set."]
        flash[:danger].push(*@set.errors) 
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @set.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    name = @set.name
    @set.cards.destroy_all
    @set.destroy
    flash[:warning] = "Set \"#{name}\" successfully deleted."
    redirect_to card_sets_path
  end

  def download
    cards = @set.cards
    card_data = cards.map { |card| "#{card.term.gsub('::', '') } :: #{card.definition.gsub('::', '') } :: -1 :: 0" }.join("\n")
    send_data(
      "## * greatstudier *\n#{card_data}",
      :filename => @set.name.underscore
    )
  end


  private

  def set_card_set
    @set = CardSet.friendly.find(params[:id])
  end

  def set_params
    params.require(:card_set).permit(:name, :description, cards_attributes: [:id, :term, :definition, :_destroy])
  end
end
