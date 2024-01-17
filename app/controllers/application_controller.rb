class ApplicationController < ActionController::Base
  def check_for_user
    unless user_signed_in?
      flash[:danger] = 'You must be logged in to perform this action.'
      redirect_to root_path
    end
  end
end
