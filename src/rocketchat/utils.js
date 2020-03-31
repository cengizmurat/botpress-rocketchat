const { driver } = require('@rocket.chat/sdk');
const he = require('he');

/**
 * Send appropriate message according to message type received from Botpress
**/
async function sendMessage(response, roomId) {
  console.log('hey');
  if (response.type === 'text') {
    // Simple text message
    return await sendTextMessage(response, roomId);
  } else if (response.type === 'custom') {
    // Attachment messages
    if (response.component === 'QuickReplies') {
      // Quick replies message
      return await sendQuickRepliesMessage(response, roomId);
    } else if (response.component === 'Dropdown') {
      // Dropdown message
      return await sendDropdownMessage(response, roomId);
    }
  }
}

async function sendTextMessage(response, roomId) {
  const msg = await driver.prepareMessage(he.decode(response.text), roomId);
  return await driver.sendMessage(msg);
}

async function sendQuickRepliesMessage(response, roomId) {
  const msg = await driver.prepareMessage('', roomId);
  const attachment = createButtons(response.wrapped.text, response.quick_replies);
  msg.attachments = [attachment];

  return await driver.sendMessage(msg);
}

async function sendDropdownMessage(response, roomId) {
  const msg = await driver.prepareMessage('', roomId);
  response.options = response.options || [];
  processDropdownButtons(response.options);

  const attachment = createButtons(response.message, response.options);
  msg.attachments = [attachment];

  return await driver.sendMessage(msg);
}

function processDropdownButtons(options) {
  // Transform dropdown options to parsable buttons
  for (const option of options) {
    option.title = option.label;
    option.payload = option.value;
  }
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

exports.sendMessage = sendMessage;
