desc 'Run the node.js server'
task :presentation => 'presentation:server'

namespace :presentation do
  task :server do
    sh 'cd presentation && node server.js'
  end

  desc 'Compile the amber.js file'
  task :compile do
    sh 'cd presentation && grunt'
  end
end
