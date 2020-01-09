const fs = require('fs');

const configFile = 'config.json';

let config = {};
const variables = ['BOTPRESS_URL', 'ROCKETCHAT_HOST', 'ROCKETCHAT_USERNAME', 'ROCKETCHAT_PASSWORD', 'ROCKETCHAT_SSL'];

if (fs.existsSync(configFile)) {
  console.error(`Loading "${configFile}" file...`);
  config = require('./' + configFile);
} else {
  console.error(`"${configFile}" file not found, checking for environment variables...`);
  for (const variable of variables) {
    const value = process.env[variable];
    if (value) {
      config[variable] = value;
    }
  }
}

let allVariables = true;
for (const variable of variables) {
  const value = config[variable];
  if (!value) {
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
