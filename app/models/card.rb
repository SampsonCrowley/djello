class Card < ApplicationRecord
  belongs_to :list
  has_and_belongs_to_many :users

  def user_ids
    CardsUser.select(:user_id).where(card_id: self.id).pluck(:user_id)
  end

  def self.reorder(params)
    conn = ActiveRecord::Base.connection
    Card.transaction do
      params[:reorder].each do |card|
        query = ActiveRecord::Base.send(:sanitize_sql_array,
  ["UPDATE cards SET \"order\" = ? WHERE id = ?", card[:order], card[:id]])
        query = conn.execute(query)
      end
    end
  end
end
