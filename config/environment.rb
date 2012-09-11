base_path = File.expand_path('../', File.dirname(__FILE__))
$LOAD_PATH.unshift base_path unless $LOAD_PATH.include?(base_path)

# require 'bundler/setup'
# Bundler.require

%w[ app/models/*.rb lib/*.rb ].each do |files_to_load|
  Dir[File.join(base_path, files_to_load)].each{ |file| require file }
end
