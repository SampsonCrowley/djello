class CreateBoardsUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :boards_users do |t|
      t.references :user, foreign_key: true
      t.references :board, foreign_key: true

      t.timestamps
    end
  end
end
