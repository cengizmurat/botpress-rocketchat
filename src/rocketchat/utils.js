const { driver } = require('@rocket.chat/sdk');
const he = require('he');

async function sendTextMessage(response, roomId) {
  const msg = await driver.prepareMessage(he.decode(response.text), roomId);
  return await driver.sendMessage(msg);
}

async function sendAttachmentMessage(response, roomId) {
  const msg = await driver.prepareMessage('', roomId);
  const attachment = createButtons(response.wrapped.text, response.quick_replies);
  msg.attachments = [attachment];

  return await driver.sendMessage(msg);
}

function createButtons(title, replies) {
  const attachment = {};
  attachment.button_alignment = 'horizontal';
  attachment.title = he.decode(title);

  const actions = [];
  for (const quickReply of replies) {
    actions.push({
      type: 'button',
      text: he.decode(quickReply.title),
      msg: he.decode(quickReply.payload),
      msg_in_chat_window: true,
    });
  }
  attachment.actions = actions;

  return attachment;
}

exports.sendTextMessage = sendTextMessage;
exports.sendAttachmentMessage = sendAttachmentMessage;
