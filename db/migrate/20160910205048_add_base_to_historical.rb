class AddBaseToHistorical < ActiveRecord::Migration
  def change
    add_column :historicals, :base, :string
  end
end
