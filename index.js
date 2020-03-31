const fs = require('fs');

const configFile = 'config.json';

let config = {};
const variables = ['BOTPRESS_URL', 'BOTPRESS_BOT', 'ROCKETCHAT_HOST', 'ROCKETCHAT_USERNAME', 'ROCKETCHAT_PASSWORD', 'ROCKETCHAT_SSL'];
// Optional variables and their default values
const optionalVariables = {
  'MENTION_ONLY': false,
  'DELAY': '0',
};

if (fs.existsSync(configFile)) {
  console.log(`Loading "${configFile}" file...`);
  config = require('./' + configFile);
} else {
  console.log(`"${configFile}" file not found, checking for environment variables...`);
  for (const variable of variables.concat(Object.keys(optionalVariables))) {
    const value = process.env[variable];
    if (value !== undefined) {
      config[variable] = value;
    }
  }
}

for (const [optionalVariable, defaultValue] of Object.entries(optionalVariables)) {
  const definedValue = config[optionalVariable];
  if (definedValue === undefined) {
    console.log(`Optional configuration variable ${optionalVariable} not defined, using default value "${defaultValue}"`);
    config[optionalVariable] = defaultValue;
  }
}

let allVariables = true;
for (const variable of variables) {
  const value = config[variable];
  if (value === undefined) {
    console.log(`Configuration variable ${variable} is missing.`);
    allVariables = false;
  }
}

if (allVariables) {
  const rocketchat = require('./src/rocketchat');
  rocketchat.runbot(config);
} else {
  console.error('Cannot run the server due to missing configuration variable(s).');
}
