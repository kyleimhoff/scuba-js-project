# frozen_string_literal: true

class CartsController < ApplicationController
  def show
    @cart = current_cart
  end

  def destroy
    @cart = current_cart
    @cart.destroy
  end

  def current_cart
    @cart = Cart.find[params { :id }]
  end
end
