class Order < ApplicationRecord
  enum state: [:pending, :doing, :done]
  has_many :product_orders
  belongs_to :user

  accepts_nested_attributes_for :product_orders
  # before_save :set_state

  private

  def set_state
    self.state = 0
  end
end
