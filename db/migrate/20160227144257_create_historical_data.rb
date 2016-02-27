class CreateHistoricalData < ActiveRecord::Migration
  def change
    create_table :historical_data do |t|
      t.time :date
      t.hstore :data

      t.timestamps null: true
    end
  end
end
