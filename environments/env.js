const environments = {};

environments.staging = {
    port: 4242,
    envName: "staging",
    secret: "fxdkthnddljsglksnglksngslkgnslkgn"
}

environments.production = {
    port: 5252,
    envName: "production",
    secret: "fxdkthnddljsglksnglksngslkgnslkgn"
}

// determine which environment was passed
const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToUse = typeof (environments[currentEnvironment]) === 'object'
    ? environments[currentEnvironment]
    : environments.staging;

module.exports = environmentToUse;