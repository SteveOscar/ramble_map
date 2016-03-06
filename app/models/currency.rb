class Currency < ActiveRecord::Base
  has_many :countries
end
