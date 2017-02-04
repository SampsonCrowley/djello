class List < ApplicationRecord
  belongs_to :board
  has_many :cards

  default_scope {
    includes :cards
  }
end
