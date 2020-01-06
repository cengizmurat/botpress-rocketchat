## Requirements

NPM v6 and Node 10

## Installation

1. Clone the repository
```
git clone https://github.com/cengizmurat/botpress-rocketchat.git
cd botpress-rocketchat
```

2. Install dependencies
```
npm install
```
If the installation stucks at a step, run the following
```
git config --global url."https://github.com/".insteadOf git@github.com:
git config --global url."https://".insteadOf git://
```

## Run the server

1. Create a `config.json` file with the following information:
```
{
  "botpressHost": BOTPRESS_URL, # http:// or https:// is required
  "rocketchatHost": ROCKETCHAT_URL, # you can ommit it here
  "botUsername": BOT_USERNAME,
  "botPassword": BOT_PASSWORD,
  "ssl": true/false
}
```

2. Run the following command
```
npm start
```
