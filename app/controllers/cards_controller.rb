class CardsController < ApplicationController
  before_action :authenticate_user!
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
    card = current_user.cards.build(card_params)
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
    def set_card
      @card = current_user.cards.find_by(id: params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white card through.
    def card_params
      params.require(:card).permit(:title, :description)
    end
end
