var defaults = require("./wdio.conf.js");
var _ = require("lodash");
const Helper = require("../../src/utilities/helper");

let helper = new Helper();
var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
  specs: ["./src/multiplatform_scenarios/switch_activity/*.js"],
  host: "hub.browserstack.com",
  commonCapabilities: {
    "bstack:options": {
      projectName: helper.baseTestCaps["bstack:options"]["projectName"],
      buildName:
        process.env.BROWSERSTACK_BUILD_NAME ||
        helper.baseTestCaps["bstack:options"]["buildName"],
      sessionName:
        require("minimist")(process.argv.slice(2))["bstack-session-name"] ||
        helper.baseTestCaps["bstack:options"]["sessionName"],
      debug: true,
      video: true,
      networkLogs: true,
      maskCommands: "setValues, getValues, setCookies, getCookies",
      appiumVersion: "1.21.0"
    },
  },
  maxInstances: 5,
  capabilities: [
    {
      platformName: "android",
      "appium:app": "WikipediaSample",
      "appium:deviceName": "Samsung Galaxy S20",
      "appium:acceptSslCerts": true,
      "bstack:options": {
        osVersion: "10.0",
        realMobile: "true",
        local: "false",
      },
    },
  ],
};

exports.config = _.defaultsDeep(overrides, defaults.config);

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  Object.assign(caps, exports.config.commonCapabilities);
});
