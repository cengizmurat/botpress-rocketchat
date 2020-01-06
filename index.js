const fs = require('fs');

const configFile = 'config.json';

if (fs.existsSync(configFile)) {
  const config = require('./config');
  const rocketchat = require('./src/rocketchat');

  rocketchat.runbot(config);
} else {
  console.error('"config.json" file not found. Please make sure to create it with necessary fields.');
}
