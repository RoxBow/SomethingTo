module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      css: {
        files: ['web/scss/*/*.scss', 'web/scss/*.scss'],
        tasks: ['sass:dist']
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed', // css minify
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'web/scss/',
          src: ['*/*.scss', '*.scss'],
          dest: 'web/css/',
          ext: '.css'
      }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify'); // minify
  grunt.loadNpmTasks('grunt-contrib-sass'); // compass
  grunt.loadNpmTasks('grunt-contrib-watch'); // watcher

  // Default task(s).
  grunt.registerTask('default', ['sass:dist','watch']);

};