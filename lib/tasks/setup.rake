desc 'Setup the local environment'
task :setup => %w[ setup:git setup:bundler setup:symlinks setup:config setup:presentation ]

namespace :setup do
  task :chdir do
    Dir.chdir(File.expand_path('../../../', __FILE__))
  end

  task :git do
    puts "Updating git submodules"
    system "git submodule init && git submodule update"
  end

  task :bundler => :chdir do
    system "gem install bundler --no-ri --no-rdoc" unless %x[gem list] =~ /^bundler/
    puts "Running bundle install"
    system "bundle install"
  end

  task :symlinks => :chdir do
    unless File.exists?('examples')
      puts "Symlinking MagLev migration examples"
      system "ln -s #{ENV['MAGLEV_HOME']}/examples/persistence/migrations examples"
    end
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
    system "cd presentation && npm install"
  end

  task :webtools => :chdir do
    puts "Setting up WebTools"
    system "cd webtools && bundle install && bundle exec gem pristine rack"
  end

  task :spec => :chdir do
    system 'rake spec'
  end

end
