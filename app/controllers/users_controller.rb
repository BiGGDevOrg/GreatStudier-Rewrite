class UsersController < ApplicationController
  before_action :set_user, only: [:show, :sets] 

  def index
  end

  def show
  end
  
  def sets
    @sets = @user.card_sets
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
