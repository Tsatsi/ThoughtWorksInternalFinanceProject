module.exports = function (config) {
    config.set({

        basePath: '../',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/lodash/dist/lodash.min.js',
            'app/bower_components/js-xlsx/xlsx.js',
            'app/js/**/*.js',
            'test/unit/**/*.js',
            'app/assets/*.json'

        ],

        ngJson2JsPreprocessor: {
            stripPrefix: 'app/assets/',
            prependPrefix: 'served/'
        },

        reporters: ['progress', 'coverage'],

        preprocessors: {
            'app/js/controllers.js': ['coverage'],
            'app/js/directives.js': ['coverage'],
            'app/js/filters.js': ['coverage'],
            'app/js/services.js': ['coverage'],
            'app/assets/*.json': ['json2js']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-ng-json2js-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
