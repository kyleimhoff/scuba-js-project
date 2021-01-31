# frozen_string_literal: true

class AddColumnsToCarts < ActiveRecord::Migration[6.0]
  def change
    add_column :carts, :product_id, :integer
    add_column :carts, :quantity, :integer
  end
end
