class AddPeaceRankToCountries < ActiveRecord::Migration
  def change
    add_column :countries, :peace_rank, :integer
  end
end
