class List < ApplicationRecord
  belongs_to :board
  has_many :cards, dependent: :destroy

  default_scope {
    includes :cards
  }
end
