class CardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_board
  before_action :set_list
  before_action :set_card, only: [:show, :edit, :update, :destroy]

  # GET /cards
  # GET /cards.json
  def index
    @cards = current_user.cards
    render json: @cards
  end

  # GET /cards/1
  # GET /cards/1.json
  def show
    render json: @card.as_json(include: [cards: {include: [cards: {methods: :user_ids}]}])
  end

  def create
    card = build_card
    if card.save
      render json: card, status: 200
    else
      render json: card.errors.full_messages, status: 422
    end
  end

  def update
    if @card.update(card_params)
      render json: @card, status: 200
    else
      render json: @card.errors.full_messages, status: 422
    end
  end

  def destroy
    if @card
      @card.destroy
      render json: @card, status: 200
    else
      render json: { error: "Card Not Found" }, status: 422
    end
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_board
      @board = current_user.boards.includes(:lists).find_by(id: params[:board_id])
      render(json: {error: "Board Not Found"}, status: 404) if !@board
    end

    def set_list
      @list = @board.lists.find_by(id: params[:list_id])
      render(json: {error: "List Not Found"}, status: 404) if !@list
    end

    def set_card
      @card = @list.cards.find_by(id: params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white card through.
    def card_params
      params.require(:card).permit(:title, :description)
    end

    def build_card
      if params[:card].empty?
        @list.cards.build()
      else
        @list.cards.build(card_params)
      end
    end
end
