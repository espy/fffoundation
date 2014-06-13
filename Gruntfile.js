/*global module:false*/
module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          base: 'dist',
          livereload: true,
          open: true
        }
      }
    },

    clean: ['dist'],

    watch: {
      files: ['<%= jshint.files %>', 'src/scss/*.scss', 'src/*.html'],
      tasks: 'onChange',
      options: {
        livereload: true
      }
    },

    notify: {
      watch: {
        options: {
          message: 'Changes loaded!',
        }
      },
      server: {
        options: {
          message: 'Server is ready!'
        }
      }
    },

    jshint: {
      files: [
        'src/js/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    concat: {
      basic: {
        src: [
          'src/js/components/lodash/dist/lodash.js',
          'src/js/components/jquery/jquery.min.js',
          'src/js/components/imagesloaded/imagesloaded.pkgd.min.js',
          'src/js/components/isInViewport/lib/isInViewport.min.js',
          'src/js/components/jquery.scrollTo/jquery.scrollTo.min.js',
          'src/js/components/marked/lib/marked.js',
          'src/js/app/**/*.js'
        ],
        dest: 'dist/index.min.js',
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/main.min.css': 'src/scss/main.scss'
        }
      }
    },

    autoprefixer: {
      single_file: {
        src: 'dist/main.min.css'
      },
    },

    cssmin: {
      index: {
        files: {
          'dist/css/main.min.css': [
            'dist/css/main.min.css'
          ]
        }
      }
    },

    uglify: {
      index: {
        src: [
          'dist/index.min.js'
        ],
        dest: 'dist/index.min.js'
      }
    },

    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: '*.html',
        dest: 'dist/',
        flatten: true,
        filter: 'isFile'
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-newer');

  // Default task.
  grunt.registerTask('minify', ['jshint', 'uglify', 'cssmin', 'copy']);
  grunt.registerTask('onChange', ['newer:jshint', 'newer:sass', 'newer:autoprefixer:single_file', 'concat', 'newer:copy', 'notify:watch']);
  grunt.registerTask('build', ['clean', 'jshint', 'sass', 'concat', 'copy',]);
  grunt.registerTask('server', ['clean', 'connect', 'onChange', 'watch']);

};
