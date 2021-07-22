const { remote } = require("webdriverio");

const buildTS = new Date().getTime(); 
module.exports = class Helper {
   baseTestCaps = {
    "bstack:options": {
      projectName: "Test",
      buildName: process.env.BROWSERSTACK_BUILD_NAME || "MultidriverStandaloneBuild_" + buildTS,
      sessionName: "Sample Test",
    },
  };
  createPlatformInstance = async (frameworkCaps, bstackCaps) => {
    Object.assign(this.baseTestCaps, frameworkCaps);
    if (bstackCaps) {
      Object.assign(this.baseTestCaps["bstack:options"], bstackCaps);
    }

    const platform = await remote({
      logLevel: "debug",
      user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
      key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
      host: "hub.browserstack.com",
      capabilities: this.baseTestCaps,
    });

    return platform;
  };

  updateTestName = async (browser, title) => {
    await browser.executeScript(
      'browserstack_executor: {"action": "setSessionName", "arguments": {"name": "' +
        title +
        '"}}'
    );
  };



  updateTestStatus = async (browser, status, reason) => {
    
    await browser.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"' +
        status +
        '","reason": "' +
        reason.replace(/[^a-zA-Z0-9.]/g, " ").substring(0, 255) +
        '"}}'
    );
  };
};
