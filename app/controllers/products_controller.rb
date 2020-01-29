class ProductsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_product, only: :edit

  def index
    @products = Product.all
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      flash[:notice] = "The product was create"
      redirect_to products_path
    else
      flash[:notice] = "Error creating the product"
      redirect_to new_product_path
    end
  end

  def update
    @product = Product.find(params[:id])

    if @product.update(product_params)
      flash[:notice] = "The product was updated"
      redirect_to products_path
    else
      flash[:notice] = "Error updating the product"
      redirect_to edit_product_path(@product.id)
    end
  end

  def destroy
    Product.find(params[:id])
  end

  private

  def product_params
    params.require(:product).permit(:description, :value, :stock)
  end

  def set_product
    @product = Product.find(params[:id])
  end
end
