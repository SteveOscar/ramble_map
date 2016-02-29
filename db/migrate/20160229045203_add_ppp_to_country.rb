class AddPppToCountry < ActiveRecord::Migration
  def change
    add_column :countries, :ppp, :string
  end
end
