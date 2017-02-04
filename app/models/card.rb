class Card < ApplicationRecord
  belongs_to :list
  has_and_belongs_to_many :users

  def user_ids
    CardsUser.select(:user_id).where(card_id: self.id).pluck(:user_id)
  end
end
