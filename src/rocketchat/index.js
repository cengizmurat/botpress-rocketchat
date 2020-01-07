const { driver } = require('@rocket.chat/sdk');

const utils = require('./utils');
const botpress = require('../botpress');

var myUserId;
var botUsername;

async function processMessages(error, message, messageOptions) {
  if (!error) {
    // Do not process own messages
    if (message.u._id === myUserId) {
      return;
    }

    const conversationId = message.u.username;
    const responses = await botpress.response(message.msg, conversationId, botUsername);
    console.log('[responses]');
    console.log(responses);

    // Loop through each response message
    for (const j in responses) {
      const response = responses[j];
      if (response.type === 'custom' && response.component === 'QuickReplies') { // Buttons message
        await utils.sendAttachmentMessage(response, message.rid);
      } else if (response.type === 'text') { // Text message
        await utils.sendTextMessage(response, message.rid);
      }
    }
  }
}

async function runbot(config) {
  const conn = await driver.connect({ host: config.rocketchatHost, useSsl: config.ssl });
  myUserId = await driver.login({ username: config.botUsername, password: config.botPassword });
  botUsername = config.botUsername;

  // set up subscriptions - rooms we are interested in listening to
  const subscribed = await driver.subscribeToMessages();

  // connect the processMessages callback
  await driver.reactToMessages(processMessages);
}

exports.runbot = runbot;
