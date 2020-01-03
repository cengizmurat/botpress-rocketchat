const axios = require('axios');

const host = 'https://route4vls7xee-codeready-workspaces.apps.ocp.lab-nxtit.com';

const instance = axios.create({
    baseURL: host + '/api/v1/bots',
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
