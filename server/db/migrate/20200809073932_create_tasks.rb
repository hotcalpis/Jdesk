class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.integer :size
      t.date :deadline
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
