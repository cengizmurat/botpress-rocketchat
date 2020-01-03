const he = require('he');
const { driver } = require('@rocket.chat/sdk');
const botpress = require('./botpress');

var myUserId;
var botUsername;

async function processMessages(error, message, messageOptions) {
  if (!error) {
    if (message.u._id === myUserId) {
      return;
    }

    const responses = await botpress.response(message.msg, message.u.username, botUsername);
    //const responses = await botpress.response(message.msg, message.ts['$date'], botUsername);
    console.log('[responses]');
    console.log(responses);

    for (const j in responses) {
      const response = responses[j];
      if (response.type === 'custom' && response.component === 'QuickReplies') {
        const msg = await driver.prepareMessage('', message.rid);
        const attachment = {};
        attachment.button_alignment = 'horizontal';
        attachment.title = he.decode(response.wrapped.text);

        const actions = [];
        for (const k in response.quick_replies) {
          const quickReply = response.quick_replies[k];
          actions.push({
            type: 'button',
            text: he.decode(quickReply.title),
            msg: he.decode(quickReply.payload),
            msg_in_chat_window: true,
          });
        }
        attachment.actions = actions;

        msg.attachments = [attachment];
        await driver.sendMessage(msg);
      } else if (response.type === 'text') {
        const msg = await driver.prepareMessage(he.decode(response.text), message.rid);
        await driver.sendMessage(msg);
      }
    }
  }
}

async function runbot(config) {
  const conn = await driver.connect({ host: config.host, useSsl: config.ssl });
  myUserId = await driver.login({ username: config.botUsername, password: config.password });
  botUsername = config.botUsername;

  // set up subscriptions - rooms we are interested in listening to
  const subscribed = await driver.subscribeToMessages();

  // connect the processMessages callback
  await driver.reactToMessages(processMessages);
}

exports.runbot = runbot;
