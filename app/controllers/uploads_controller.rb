class UploadsController < ApplicationController

  def new
  end

  def create
    @file = upload_params[:file]
    if @file
      file_name = @file.original_filename
      file_data = @file.read.split("\n")

      if file_data.empty?
        render :new, notice: "File is not a valid greatstudier file."
      elsif file_data[0].strip != '## * greatstudier *'
        render :new, notice: "File is not a valid greatstudier file."
      else

        card_set = CardSet.new(name: file_name)

        file_data.shift
        file_data.each do |line|
          line_data = line.split('::')
          card_set.cards << Card.new(term: line_data[0].strip, definition: line_data[1].strip)
        end
        card_set.save
        redirect_to card_set_path(card_set), notice: "File successfully uploaded."
      end
    else
      redirect_to new_upload_path, notice: "No file selected."
    end
  end

  private

  def upload_params
    params.require(:upload).permit(:file)
  end

end