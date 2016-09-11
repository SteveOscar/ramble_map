class Historical < ActiveRecord::Base
  validates_uniqueness_of :time, scope: :base
end
