class BoardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_board, only: [:show, :edit, :update, :destroy]

  # GET /boards
  # GET /boards.json
  def index
    @boards = current_user.boards
    render json: @boards.as_json(include: [lists: {include: [cards: {methods: :user_ids}]}])
  end

  # GET /boards/1
  # GET /boards/1.json
  def show
    render json: @board.as_json(include: [lists: {include: [cards: {methods: :user_ids}]}])
  end

  def create
    board = build_board
    if board.save
      render json: board, status: 200
    else
      render json: board.errors.full_messages, status: 422
    end
  end

  def update
    if @board.update(board_params)
      render json: @board, status: 200
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def destroy
    if @board
      @board.destroy
      render json: @board, status: 200
    else
      render json: { error: "Board Not Found" }, status: 422
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_board
      @board = current_user.owned_boards.find_by(id: params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def board_params
      params.require(:board).permit(:title, :lists)
    end

    def build_board
      if params[:board].empty?
        current_user.owned_boards.build()
      else
        current_user.owned_boards.build(board_params)
      end
    end
end
