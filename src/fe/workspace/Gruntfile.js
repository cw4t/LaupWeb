module.exports = function (grunt) {
  'use strict';

  grunt.util.linefeed = '\n';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jqueryCheck: 'if (typeof jQuery === \'undefined\') {\n' +
                 '  throw new Error(\'laup\\\'s JavaScript requires jQuery\')\n' +
                 '}\n',
    jqueryVersionCheck: '+function ($) {\n' +
                        '  var version = $.fn.jquery.split(\' \')[0].split(\'.\')\n' +
                        '  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {\n' +
                        '    throw new Error(\'laup\\\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0\')\n' +
                        '  }\n' +
                        '}(jQuery);\n\n',

    clean: {
      dist: 'dist',
      tmp: 'tmp'
    },

    stamp: {
      options: {
        banner: '<%= jqueryCheck %>\n<%= jqueryVersionCheck %>\n+function ($) {\n',
        footer: '\n}(jQuery);'
      },
      bootstrap: {
        files: {
          src: '<%= concat.scripts.dest %>'
        }
      }
    },

    mkdir: {
      all: {
        options: {
          create: ['tmp', 'tmp/js']
        }
      }
    },

    concat: {
      options: {
        // Custom function to remove all export and import statements
        process: function (src) {
          return src.replace(/^(export|import).*/gm, '');
        },
        stripBanners: false
      },
      scripts: {
        // 需要被合并的js文件需要写在这里，这里的文件都是babel生成的，需要和babel对应
        src: [
          'tmp/js/*.js',
        ],
        dest: 'dist/laup.js'
      }
    },

    uglify: {
      core: {
        files: {
          'dist/laup.min.js': 'dist/laup.js'
        }
      }
    },

    sass: {
      laup: {
        files: {
          'dist/laup.css': ['scss/laup.scss']
        }
      }
    },

    cssmin: {
      laup: {
        files: {
          'dist/laup.min.css': 'dist/laup.css'
        }
      }
    },

    babel: {
      dev: {
        options: {
          sourceMap: true,
          modules: 'ignore'
        },
        files: {
          'tmp/js/action_analysis.js'      : 'js/vue/action_analysis.js',
          'tmp/js/over_view.js'      : 'js/vue/over_view.js',
          'tmp/js/alarm_configuration.js'      : 'js/vue/alarm_configuration.js',
          'tmp/js/auth.js'      : 'js/auth.js',
          'tmp/js/ajax.js'      : 'js/ajax.js',
          'tmp/js/not_found.js'      : 'js/vue/not_found.js',
          'tmp/js/router.js'      : 'js/vue/router.js'
        }
      },
      dist: {
        options: {
          modules: 'ignore'
        },
        files: {
          '<%= concat.scripts.dest %>' : '<%= concat.scripts.dest %>'
        }
      }
    },

  })

  require('load-grunt-tasks')(grunt, { scope: 'devDependencies',
    pattern: ['grunt-*'] });

  grunt.registerTask('dist-js', ['babel:dev', 'concat', 'babel:dist', 'stamp', 'uglify:core']);
  //grunt.registerTask('dist-css', ['sass', 'cssmin']);
  //grunt.registerTask('dist', ['clean:dist', 'clean:tmp', 'mkdir', 'dist-css', 'dist-js']);
  grunt.registerTask('dist', ['clean:dist', 'clean:tmp', 'mkdir', 'dist-js']);

}
