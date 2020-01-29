class ChangeDefaultStateValueInOrders < ActiveRecord::Migration[6.0]
  def change
    change_column_default :orders, :state, 0
  end
end
