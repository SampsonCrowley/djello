class ListsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_list, only: [:show, :edit, :update, :destroy]

  # GET /lists
  # GET /lists.json
  def index
    @lists = current_user.lists
    render json: @lists
  end

  # GET /lists/1
  # GET /lists/1.json
  def show
    render json: @list.as_json(include: [lists: {include: [cards: {methods: :user_ids}]}])
  end

  def create
    list = current_user.lists.build(list_params)
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
    if @list
      @list.destroy
      render json: @list, status: 200
    else
      render json: { error: "Card Not Found" }, status: 422
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_list
      list = List.includes(:board).find_by(id: params[:id])
      @list = list if(current_user.board_ids.include?(list.board.id))
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def list_params
      params.require(:list).permit(:title)
    end
end
