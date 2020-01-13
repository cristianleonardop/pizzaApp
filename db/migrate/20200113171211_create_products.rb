class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :description, default: ""
      t.decimal :value, default: 0.0
      t.integer :stock, default: 0

      t.timestamps
    end
  end
end
