## Requirements

NPM v6 and Node 10

## Installation

- Clone the repository
```
git clone https://github.com/cengizmurat/botpress-rocketchat.git
cd botpress-rocketchat
```

- Install dependencies
```
npm install
```

- Create a `config.json` file with the following information:
```
{
  "host": ROCKETCHAT_URL,
  "botUsername": BOT_USERNAME,
  "password": BOT_PASSWORD,
  "ssl": true/false
}
```

## Run the server

```
npm start
```
