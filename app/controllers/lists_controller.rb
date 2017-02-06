class ListsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_board
  before_action :set_list, only: [:show, :edit, :update, :destroy]

  # GET /lists
  # GET /lists.json
  def index
    @lists = @board.lists
    render json: @lists.as_json(include: [cards: {methods: :user_ids}])
  end

  # GET /lists/1
  # GET /lists/1.json
  def show
    render json: @list.as_json(include: [lists: {include: [cards: {methods: :user_ids}]}])
  end

  def create
    list = build_list
    if list.save
      render json: list, status: 200
    else
      render json: list.errors.full_messages, status: 422
    end
  end

  def update
    if @list.update(list_params)
      render json: @list, status: 200
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def destroy
    @list.destroy
    render json: @list, status: 200
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_board
      @board = current_user.boards.find_by(id: params[:board_id])
      render(json: {error: "Board Not Found"}, status: 404) if !@board
    end

    def set_list
      @list = @board.lists.find_by(id: params[:id])
      render(json: {error: "List Not Found"}, status: 404) if !@list
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def list_params
      params.require(:list).permit(:title)
    end

    def build_list
      if params[:list].empty?
        @board.lists.build()
      else
        @board.lists.build(list_params)
      end
    end
end
