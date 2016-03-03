class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :uid
      t.string :bio
      t.string :image_url
      t.string :token
      t.string :secret
      t.string :provider

      t.timestamps null: false
    end
  end
end
