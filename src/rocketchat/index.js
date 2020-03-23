const { driver } = require('@rocket.chat/sdk');

const utils = require('./utils');
const botpress = require('../botpress');

var rocketchatId;

async function processMessages(error, message, messageOptions) {
  if (!error) {
    // Do not process own messages
    if (message.u._id === rocketchatId  || !messageOptions.roomParticipant) {
      return;
    }

    const conversationId = message.u.username;
    const responses = await botpress.response(message.msg, conversationId);
    console.log('[responses]');
    console.log(responses);

    // Loop through each response message
    for (const response of responses) {
      if (response.type === 'custom' && response.component === 'QuickReplies') { // Buttons message
        await utils.sendAttachmentMessage(response, message.rid);
      } else if (response.type === 'text') { // Text message
        await utils.sendTextMessage(response, message.rid);
      }
    }
  }
}

async function runbot(config) {
  const conn = await driver.connect({ host: config.ROCKETCHAT_HOST, useSsl: config.ROCKETCHAT_SSL });
  rocketchatId = await driver.login({ username: config.ROCKETCHAT_USERNAME, password: config.ROCKETCHAT_PASSWORD });

  botpress.init(config);

  // set up subscriptions - rooms we are interested in listening to
  const subscribed = await driver.subscribeToMessages();

  // connect the processMessages callback
  await driver.reactToMessages(processMessages);
}

exports.runbot = runbot;
