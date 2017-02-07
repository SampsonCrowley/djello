class Board < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: :user_id
  has_and_belongs_to_many :users
  has_many :lists, dependent: :destroy
  after_create :add_owner_to_users

  private
    def add_owner_to_users
      self.users << self.owner
    end
end
