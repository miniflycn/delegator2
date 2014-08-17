module.exports = function( grunt ) {
    'use strict';

    grunt.initConfig({
        mocha_phantomjs: {
            report: {
                options: {
                    'reporter': 'xunit',
                    'output': 'tests/results/result.xml',
                    urls: ['test/index.html']
                }
            },
            all: ['test/index.html']
        }
    });

    grunt.loadNpmTasks('grunt-mocha-phantomjs');

    grunt.registerTask('default', ['mocha_phantomjs:all']);
    grunt.registerTask('report', ['mocha_phantomjs:report']);
};