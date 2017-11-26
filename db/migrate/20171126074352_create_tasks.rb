class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :desc
      t.references :group
      t.boolean :done

      t.timestamps
    end
  end
end
