module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', 'amber concat');

  grunt.initConfig({
    amber: {
      'lib/js/amber.compiled': [ 'Cards', 'Presentation-MagLev' ]
    },
    concat: {
      'js/app.js': [
        'lib/js/jquery-1.7.min.js',
        'lib/js/handlebars.js',
        'lib/js/reveal.min.js',
        // Amber IDE dependencies
        'amber/js/lib/jQuery/jquery-ui-1.8.16.custom.min.js',
        'amber/js/lib/jQuery/jquery.textarea.js',
        'amber/js/lib/CodeMirror/codemirror.js',
        'amber/js/lib/CodeMirror/smalltalk.js',
        'lib/js/amber.compiled.js'
      ],
      'css/app.css': [
        'css/main.css',
        'css/theme/default.css',
        'lib/css/zenburn.css',
        'amber/css/amber.css',
        'amber/js/lib/CodeMirror/codemirror.css',
        'amber/js/lib/CodeMirror/amber.css',
        'lib/css/amber-overrides.css'
      ]
    }
  });

  grunt.registerMultiTask('amber', 'Compile Amber Smalltalk', function() {
    var libraries = this.data.map(function(package){ return '../../js/'+package; });
    libraries = 'parser,Compiler,Canvas,IDE,SUnit,'+libraries;
    var cmd = './amber/bin/amberc -l ' + libraries + ' ' + this.target;
    grunt.log.writeln('Executing: ' + cmd);
    grunt.helper('exec', cmd);
    grunt.log.writeln('File "' + this.target + '.js" created.');
  });

};
