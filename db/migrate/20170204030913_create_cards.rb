class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.references :list, foreign_key: true
      t.string :title
      t.text :description
      t.integer :order

      t.timestamps
    end
  end
end
