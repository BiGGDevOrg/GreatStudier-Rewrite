class UploadsController < ApplicationController
  before_action :authenticate_user!

  def new
  end

  def create
    @file = upload_params[:file]
    if @file
      file_name = @file.original_filename
      file_data = @file.read.split("\n")

      if file_data.empty? || file_data[0].strip != '## * greatstudier *'
        flash[:danger] = "File is not a valid greatstudier file."
        redirect_to new_upload_path and return
      end

      card_set = current_user.card_sets.build(name: file_name)

      file_data.shift
      file_data.each do |line|
        line_data = line.split('::')
        card_set.cards << Card.new(term: line_data[0].strip, definition: line_data[1].strip)
      end

      respond_to do |format|
        if card_set.save
          format.html { redirect_to card_set_url(card_set), notice: "Set successfully created." }
          format.json { render :show, status: :created, location: card_set }
        else
          flash[:danger] = ["Unable to create set."]
          flash[:danger].push(*card_set.errors) 
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: card_set.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  private

  def upload_params
    params.require(:upload).permit(:file)
  end
end
