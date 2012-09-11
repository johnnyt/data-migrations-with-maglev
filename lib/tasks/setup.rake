desc 'Setup the local environment'
task :setup => %w[ setup:git setup:bundler setup:config setup:presentation setup:spec ]

namespace :setup do
  task :chdir do
    Dir.chdir(File.expand_path('../../../', __FILE__))
  end

  task :git do
    puts "Updating git submodules"
    `git submodule init && git submodule update`
  end

  task :bundler => :chdir do
    `gem install bundler --no-ri --no-rdoc` unless %x[gem list] =~ /^bundler/
    puts "Running bundle install"
    `bundle install`
  end

  task :config => :chdir do
    Dir['config/*.sample'].each do |sample_file|
      # root/config/database.yml.sample => root/config/database.yml
      # root/config/_env.sample => root/.env
      config_file = File.expand_path(sample_file.gsub(/\.sample$/,'').gsub(%r</_>,'/../'))

      sh "cp #{sample_file} #{config_file}" unless File.exists?(config_file)
    end
  end

  task :presentation => :chdir do
    puts "Running npm install in the presentation directory"
    `cd presentation && npm install`
  end

  task :spec => :chdir do
    system 'rake spec'
  end

end
