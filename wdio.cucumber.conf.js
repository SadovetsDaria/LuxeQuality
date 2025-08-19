const { join } = require('path');

exports.config = {
    runner: 'local',

    specs: [
        './features/**/*.feature'
    ],

    exclude: [],

    maxInstances: 1,

    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu'] // если нужен headless режим
        }
    }],

    logLevel: 'info',

    bail: 0,

    baseUrl: 'https://www.saucedemo.com/',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    framework: 'cucumber',

    reporters: ['spec'],

    cucumberOpts: {
        require: ['./features/step-definitions/loginSteps.js'], // путь к твоим шагам
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    }
};