# frozen_string_literal: true

class CartItemsController < ApplicationController
  def create
    @cart_item = CartItem.create(cart_item_params)
    render json: @cart_item
  end

  def delete
    @cart_item = CartItem.find_by_id(:id)
    @cart_item.destroy
  end

  def cart_item_params
    params.permit(:product_id, :quantity, :carts_id)
  end
end
