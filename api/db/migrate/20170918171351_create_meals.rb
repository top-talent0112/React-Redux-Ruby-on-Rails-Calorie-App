class CreateMeals < ActiveRecord::Migration[5.1]
  def change
    create_table :meals do |t|
      t.references    :user,      null: false
      t.string        :title,     null: false
      t.datetime      :time,      null: false
      t.integer       :calories,  null: false
      t.timestamps
    end
  end
end
