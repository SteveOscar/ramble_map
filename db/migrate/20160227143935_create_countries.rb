class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.string :country_name
      t.string :map_code
      t.references :currency, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
