require('dotenv').config({ path: '../../.env' });

const { defineConfig } = require("cypress");
const { configurePlugin } = require('cypress-mongodb');
// const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions');

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
    baseUrl: process.env.BASE_URL,
    env: {
      baseApi:process.env.BASE_API,
      mongodb: {
        uri: process.env.MONGO_URI,
        database: process.env.DATABASE_NAME
      }
    }
  },
});
