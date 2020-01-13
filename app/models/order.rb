class Order < ApplicationRecord
  has_many :product_orders
  belongs_to :user
end
