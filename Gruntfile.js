"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var config = {
    pkg: grunt.file.readJSON("package.json"),

    less: {
      style: {
        files: {
          "build/css/style.css": "source/less/style.less"
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/style.css"
      }
    },

    clean: {
      build: ["build"],
      watch_html: ["build/*.html"],
    },

    watch: {
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    copy:{
      build:{
        files:[{
          expand: true,
          cwd: "source",
          src: [
            "img/**",
            "index.html",
            "form.html",
            "less/**"
          ],
          dest: "build"
        }]
        }
      },
    cmq:{
    style:{
      file:{
        "build/css/style.css":["build/css/style.css"]
      }
    }
  },
    cssmin:{
      options:{
        keepSpecialComments: 0,
        report: "gzip"
      },
      style:{
        files:{
          "build/css/style.min.css":["build/css/style.css"]
        }
      }
    },
    imagemin:{
      images:{
        options:{
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },
    htmlmin:{
      options:{
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive: true,
        keepClosingSlash: false
      },
      html:{
        files:{
          "build/index.min.html":["build/index.html"],
          "build/form.min.html":["build/form.html"]
        }
      }
    },
    uglify: {
      script: {
        files: {
          "build/js/script.min.js": ["build/js/script.js"]
        }
      }
    },
  };
  grunt.registerTask("build",[
    "clean",
    "copy",
    "less",
    "postcss",
    "cmq",
    "cssmin",
    "imagemin",
    "htmlmin",
    "uglify"
  ]);





  // Не редактируйте эту строку
  config = require("./.gosha")(grunt, config);

  grunt.initConfig(config);
};
