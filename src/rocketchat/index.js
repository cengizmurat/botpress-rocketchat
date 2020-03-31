const { driver } = require('@rocket.chat/sdk');

const utils = require('./utils');
const botpress = require('../botpress');

var rocketchatId, shouldMention, rocketchatUsername;

function shouldProcess(message, messageOptions) {
  if (messageOptions.roomType === 'd') {
    // Process direct messages
    return true;
  }

  for (const mention of message.mentions) {
    const mentionedUsername = mention.username;
    if (mentionedUsername === rocketchatUsername ||
      mentionedUsername === 'all' ||
      mentionedUsername === 'here') {
      // Process mentioned messages
      return true;
    }
  }

  return false;
}

async function processMessages(error, message, messageOptions) {
  if (!error) {
    // Do not process own messages
    if (message.u._id === rocketchatId || !messageOptions.roomParticipant) {
      return;
    }

    if (shouldMention) { // If should mention bot
      if (!shouldProcess(message, messageOptions)) {
        // Direct message or bot mentioned
        return;
      }
    }

    console.log('MESSAGE');
    console.log(message);

    const conversationId = message.u.username;
    const responses = await botpress.response(message.msg, conversationId);
    console.log('[responses]');
    console.log(responses);

    // Loop through each response message
    for (const response of responses) {
      await utils.sendMessage(response, message.rid);
    }
  }
}

async function runbot(config) {
  const conn = await driver.connect({ host: config.ROCKETCHAT_HOST, useSsl: config.ROCKETCHAT_SSL });
  rocketchatId = await driver.login({ username: config.ROCKETCHAT_USERNAME, password: config.ROCKETCHAT_PASSWORD });
  rocketchatUsername = config.ROCKETCHAT_USERNAME;
  shouldMention = config.MENTION_ONLY === true || config.MENTION_ONLY === 'true';

  botpress.init(config);

  // set up subscriptions - rooms we are interested in listening to
  const subscribed = await driver.subscribeToMessages();

  // connect the processMessages callback
  await driver.reactToMessages(processMessages);
}

exports.runbot = runbot;
