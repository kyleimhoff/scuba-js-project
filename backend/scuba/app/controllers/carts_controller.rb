# frozen_string_literal: true

class CartsController < ApplicationController
  def index
    carts = Cart.all

    render json: carts, except: %i[created_at updated_at]
  end

  def create
    cart = Cart.new(cart_params)
    cart.product_id = params[:id]
    cart.save

    render json: cart, except: %i[created_at updated_at]
  end

  def show
    @cart = current_cart
  end

  def delete; end

  def current_cart
    @cart = Cart.find { params [:id] }
  end

  def cart_params
    # params.require(:cart).permit(:id, :product_id, :quantity)
    params.require(:cart).permit(:product_id, :quantity)
  end
end
