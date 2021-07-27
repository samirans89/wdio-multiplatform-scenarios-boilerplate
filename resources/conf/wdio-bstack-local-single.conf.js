var defaults = require("./wdio-bstack-local.conf.js");
var _ = require("lodash");
const Helper = require("../../src/utilities/helper");

let helper = new Helper();
var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
  specs: ["./src/multiplatform_scenarios/testrunner_standalone/e2e_scenarioA.js"],
  host: "hub.browserstack.com",
  deleteBrowserAfterTest: true,
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
      appiumVersion: "1.21.0",
      local: "true",
    },
  },
  maxInstances: 1,
  capabilities: [
    {
      "bstack:options": {
        os: "Windows",
        osVersion: "10",
      },
      browserName: "Chrome",
      browserVersion: "89.0",
    },
  ],
};

exports.config = _.defaultsDeep(overrides, defaults.config);

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  Object.assign(caps, exports.config.commonCapabilities);
});
