class CreateHistoricals < ActiveRecord::Migration
  def change
    create_table :historicals do |t|
      t.date :time
      t.hstore :data

      t.timestamps null: false
    end
  end
end
