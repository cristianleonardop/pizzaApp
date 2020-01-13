class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.datetime :order_date
      t.datetime :deliver_date
      t.decimal :total
      t.integer :state
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
