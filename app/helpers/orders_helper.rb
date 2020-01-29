module OrdersHelper
  def product_props
    Product.all.pluck(:description, :id)
  end

  def product_values
    Product.all.pluck(:value, :id)
  end

  def state_props
    Order.states.to_a
  end
end
