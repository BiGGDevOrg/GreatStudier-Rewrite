class MainController < ApplicationController
  def index
    if user_signed_in?
      render :welcome
    else
      render :index
    end
  end
end
