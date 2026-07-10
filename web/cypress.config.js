const { defineConfig } = require("cypress");
const { configurePlugin } = require('cypress-mongodb');
const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions');

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
    env: {
      mongodb: {
        uri: 'mongodb+srv://qax:xperience@cluster0.qls5bvv.mongodb.net/HopeDB?appName=Cluster0',
        database: 'HopeDB',
      }
    }
  },
});
