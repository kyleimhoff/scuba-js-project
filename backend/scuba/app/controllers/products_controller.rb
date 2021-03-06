# frozen_string_literal: true

class ProductsController < ApplicationController
  def index
    products = Product.all
    render json: products, except: %i[created_at updated_at]
  end
end
