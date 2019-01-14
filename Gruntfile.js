module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'yanivbyd7@gmail.com',
                password: 'fgh4RT2!',
                branch: grunt.option('branch') || 'default',
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}