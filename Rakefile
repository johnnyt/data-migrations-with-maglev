rake_files = File.expand_path('./lib/tasks/*.rake', File.dirname(__FILE__))
Dir[rake_files].each{ |file| load file }

task :default  => :spec
