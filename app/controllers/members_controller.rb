class MembersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_board

  def index
  end


  private

    # Use callbacks to share common setup or constraints between actions.
    def set_board
      @board = current_user.boards.find_by(id: params[:board_id])
      render(json: {error: "Board Not Found"}, status: 404) if !@board
    end
end
