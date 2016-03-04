class AddPeaceScoreToCountries < ActiveRecord::Migration
  def change
    add_column :countries, :peace_score, :float
  end
end
