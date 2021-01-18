# frozen_string_literal: true

class CartItemsController < ApplicationController
  def create
    @cart_item = CartItem.create(cart_item_params)
    json_response(@cart_item, :created)
  end

  def json_response(object, status = :ok)
    render json: object, status: status
  end

  def cart_item_params
    params.permit(:product_id, :cart_id, :quantity)
  end
end
