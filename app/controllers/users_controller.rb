class UsersController < ApplicationController
  before_action :set_user, only: [:show, :sets] 

  def index
  end

  def show
  end
  
  def sets
    @page_number = params[:page]
    @sets = @user.card_sets.order(:name).page(@user.card_sets.page(@page_number).out_of_range? ? 1 : @page_number)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
