module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: [{
                    expand: true,
                    cwd: './public/static/less',
                    src: ['*.less'],
                    dest: './public/static/css',
                    ext: '.css'
                }]
      }
    },
    watch: {
      styles: {
        files: ['public/static/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};