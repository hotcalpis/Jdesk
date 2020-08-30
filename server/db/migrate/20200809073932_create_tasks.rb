class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.integer :size
      t.integer :x
      t.integer :y
      t.date :deadline
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
