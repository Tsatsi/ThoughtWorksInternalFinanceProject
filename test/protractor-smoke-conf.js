exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'functional/smoke/*.js'
    ],
    splitTestsBetweenCapabilities: true,
    multiCapabilities: [
        {browserName: 'chrome',
            count: 1,
            shardTestFiles: true,
            maxInstances: 8}
    ],


    baseUrl: 'http://localhost:8000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
