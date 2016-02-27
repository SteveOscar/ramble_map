namespace :db do
  namespace :enable do
    desc "enable hstore extension"
    task :hstore => [:environment, :load_config] do
      ActiveRecord::Base.connection.execute('CREATE EXTENSION IF NOT EXISTS hstore;')
    end
  end

  Rake::Task['db:schema:load'].enhance ['db:enable:hstore']
end
