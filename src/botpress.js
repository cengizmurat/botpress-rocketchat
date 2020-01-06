const axios = require('axios');

const config = require('../config');

const instance = axios.create({
    baseURL: config.botpressHost + '/api/v1/bots',
});

async function response(text, userId, botId) {
  const msg = {
    type: 'text',
    text: text,
  };
  const r = await instance.post(`/${botId}/converse/${userId}`, msg);
  return r.data.responses;
}

exports.response = response;
