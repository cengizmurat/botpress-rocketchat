const axios = require('axios');

let instance;
let botId;

function init(config) {
  let botpressUrl = config.BOTPRESS_URL;

  const l = botpressUrl.length;
  if (botpressUrl.charAt(l - 1) === '/') {
    botpressUrl = botpressUrl.substring(0, l - 1);
  }

  instance = axios.create({
    baseURL: botpressUrl + '/api/v1/bots',
  });
  botId = config.ROCKETCHAT_USERNAME;
}

async function response(text, userId) {
  const msg = {
    type: 'text',
    text: text,
  };
  const r = await instance.post(`/${botId}/converse/${userId}`, msg);
  return r.data.responses;
}

exports.init = init;
exports.response = response;
