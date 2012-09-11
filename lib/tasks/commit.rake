namespace :commit do
  desc "Commit the v1 code to the repository"
  task :v1 do
    sh %{ ruby -Mcommit -e 'require "app/v1"' }
  end
end
