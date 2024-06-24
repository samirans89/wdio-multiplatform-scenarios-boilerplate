var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
  specs: ["./src/multiplatform_scenarios/testrunner_multi-remote/*.js"],
  deleteBrowserAfterTest: false,
  host: "hub.browserstack.com",
  maxInstances: 5,
  commonCapabilities: {
    "bstack:options": {
      projectName: "Test",
      buildName: process.env.BROWSERSTACK_BUILD_NAME || "Multiremote build",
      sessionName: "Sample Test",
    },
  },
  capabilities: {
    androidChromeBrowser: {
      capabilities: {
        browserName: "Android",
        "bstack:options": {
          osVersion: "11.0",
          deviceName: "Google Pixel 5",
          realMobile: "true",
          idleTimeout: 300,
        },
      },
    },
    firefoxBrowser: {
      capabilities: {
        browserName: "firefox",
        browserVersion: "89.0",
        "bstack:options": {
          os: "Windows",
          osVersion: "7",
          idleTimeout: 300,
        },
      },
    },
    androidApp: {
      capabilities: {
        platformName: "android",
        "appium:app": "WikipediaSample",
        "appium:deviceName": "Samsung Galaxy S20",
        "bstack:options": {
          osVersion: "10.0",
          realMobile: "true",
          local: "false",
          appiumVersion: "1.21.0",
        },
      },
    },
    iosApp: {
      capabilities: {
        platformName: "iOS",
        "appium:app": "DemoAppIOS",
        "appium:deviceName": "iPhone XS",
        "bstack:options": {
          osVersion: "12.0",
          realMobile: "true",
          local: "false",
          appiumVersion: "1.21.0",
        },
      },
    },
  },
};

const multiremote_envs = [
  overrides.capabilities.androidChromeBrowser,
  overrides.capabilities.firefoxBrowser,
  overrides.capabilities.androidApp,
  overrides.capabilities.iosApp,
];
multiremote_envs.forEach((env) => {
  Object.assign(
    env.capabilities["bstack:options"],
    overrides.commonCapabilities["bstack:options"]
  );
});

exports.config = _.defaultsDeep(overrides, defaults.config);
