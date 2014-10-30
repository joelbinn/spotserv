module.exports = function (grunt) {

  var os = require('os');
  grunt.log.writeln('OS: '+os.platform());
  var nodeSpotTarget;
  if (os.platform() === 'linux' && os.arch() === 'arm') {
    nodeSpotTarget = 'raspberry';
  } else if (os.platform() === 'darwin') {
    nodeSpotTarget = 'osx';
  } else {
    grunt.log.writeln('OS: '+os.platform() + ' arch: '+os.arch() +' is not supported');
    process.exit(1);
  }
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      js: {
        expand: true,
        cwd: 'src/js',
        src: ['**/*.js'],
        dest: 'dist/js'
      },
      appkey: {
        expand: true,
        cwd: './',
        flatten: true,
        src: ['spotify_appkey.key'],
        dest: 'node_modules/spotserv'
      },
      dist: {
        expand: true,
        cwd: 'target',
        src: ['**'],
        dest: 'dist'
      },
      nodespotify_osx: {
        expand: true,
        flatten: true,
        cwd: 'node-spotify',
        src: ['osx/**'],
        dest: 'node_modules/spotserv/node-spotify'
      },
      nodespotify_raspberry: {
        expand: true,
        flatten: true,
        cwd: 'node-spotify',
        src: ['raspberry/*'],
        dest: 'node_modules/spotserv/node-spotify'
      }

    },
    ts: {
      compile: {
        expand: true,
        src: ['src/ts/**/*.ts'],
        outDir: 'node_modules/spotserv',
        options: {
          module: 'commonjs', //amd or commonjs
          target: 'es5', //or es3
          sourceRoot: 'src/ts',
          watch: 'src/ts'
        }
      }
    },
    clean: ["target", "dist", "node_modules/spotserv"]
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask('build', [
    'ts:compile',
    'copy:js',
    'copy:appkey']);

  grunt.registerTask('build-osx', [
    'build',
    'copy:nodespotify_osx',
    'copy:dist']);
  grunt.registerTask('build-raspberry', [
    'build',
    'copy:nodespotify_raspberry',
    'copy:dist']);

  grunt.registerTask('default', ['clean', 'build-'+nodeSpotTarget]);
};