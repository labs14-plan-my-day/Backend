const dotenv = require('dotenv')
const ENV = process.env.NODE_ENV || 'development'

const config = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    PROXY_URI: process.env.PROXY_URI,
    WEBHOOK_URL: process.env.WEBHOOK_URL,
    STARBOT_COMMAND_TOKEN: process.env.STARBOT_COMMAND_TOKEN,
    SLACK_TOKEN: process.env.SLACK_TOKEN
  }
  
  module.exports = (key) => {
    if (!key) return config
  
    return config[key]
  }