# Deepgram Node.js Starter

This sample demonstrates interacting with the Deepgram API from Node.js. It uses the Deepgram Node SDK, with a javascript client built from web components.

## Sign-up to Deepgram

Before you start, it's essential to generate a Deepgram API key to use in this project. [Sign-up now for Deepgram](https://console.deepgram.com/signup).

## Quickstart

### Manual

Follow these steps to get started with this starter application.

#### Clone the repository

Go to GitHub and [clone the repository](https://github.com/deepgram-starters/deepgram-javascript-starter).

#### Install dependencies

Install the project dependencies in the `Starter 01` directory.

```bash
cd ./Starter-01
npm install
```

#### Edit the config file

Copy the code from `config.json.example` and create a new file called `config.json`. Paste in the code and enter your API key you generated in the [Deepgram console](https://console.deepgram.com/).

```json
{
  "dgKey": "api_key"
}
```

#### Run the application

The `dev` script will run a web and API server concurrently. Once running, you can [access the application in your browser](http://localhost:8081/).

```bash
npm run dev
```
