This project establish communication between a Botpress bot and a Rocketchat bot account.
It sends Rocket.Chat messages to Botpress server and translates Botpress events (bot replies) to Rocket.Chat messages.

## Requirements

NPM v6 and Node 10

## Installation

#### Clone the repository
```
git clone https://github.com/cengizmurat/botpress-rocketchat.git
cd botpress-rocketchat
```

#### Install dependencies
```
npm install
```
If the installation stucks at a step, run the following
```
git config --global url."https://github.com/".insteadOf git@github.com:
git config --global url."https://".insteadOf git://
```

## Run the server

#### Configuration

Configuration variables are needed in order to run the server. You can provide them either through environment variables or with a `config.json` file.

The following environment variables are required:
- `BOTPRESS_URL`: URL of your Botpress server (ex: `https://mybotpress.domain.com`)
- `BOTPRESS_BOT`: ID of the Botpress bot
- `ROCKETCHAT_HOST`: Host of your Rocketchat server (ex: `myrocketchat.domain.com`)
- `ROCKETCHAT_USERNAME`: The `@username` of the account to connect to
- `ROCKETCHAT_PASSWORD`: The password of the account
- `ROCKETCHAT_SSL`: `true/false` (`http` or `https` ?)
- `MENTION_ONLY`: `true/false` (if `true` bot only processes mentioned messages in public channels or direct messages, if `false` bot processes all visible messages)

Or an example of a valid `config.json` file:
```
{
  "BOTPRESS_URL": "https://mybotpress.domain.com",
  "BOTPRESS_BOT": "my-bot-id",
  "ROCKETCHAT_HOST": "myrocketchat.domain.com",
  "ROCKETCHAT_USERNAME": "myusername",
  "ROCKETCHAT_PASSWORD": "mypassword",
  "ROCKETCHAT_SSL": true,
  "MENTION_ONLY": true
}
```

#### Start

Once you have set up your variables, you can run the following command:
```
npm start
```
