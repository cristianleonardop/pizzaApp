class OrdersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_product_orders_attribute, only: [:create, :update]
  def index
    @orders = current_user.admin? Order.all : current_user.orders
  end

  def new
    @order = Order.new
  end

  def show
    @order = Order.find(params[:id])
    @product_orders = @order.product_orders
  end

  def create
    @order = Order.new(order_params)
    if @order.save
      flash[:notice] = "The order was create"
      redirect_to orders_path
    else
      flash[:notice] = "Error creating the order"
      redirect_to new_order_path
    end
  end

  def update
    @order = Order.find(params[:id])

    if @order.update(state: order_params[:state].to_i)
      flash[:notice] = "The order was updated"
      redirect_to orders_path
    else
      flash[:notice] = "Error updating the order"
      redirect_to edit_order_path(@order.id)
    end
  end

  private

  def order_params
    params.require(:order).permit(:state, :user_id, :total, :deliver_date, :order_date, product_orders_attributes: [:total, :quantity, :product_id])
  end

  def set_product_orders_attribute
    params[:order][:product_orders_attributes] = JSON.parse(params[:order][:product_orders_attributes]) if params[:order][:product_orders_attributes]
  end
end
