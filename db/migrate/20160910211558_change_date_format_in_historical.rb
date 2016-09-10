class ChangeDateFormatInHistorical < ActiveRecord::Migration
  def up
    change_column :historicals, :time, :datetime
  end

  def down
    change_column :historicals, :time, :date
  end
end
