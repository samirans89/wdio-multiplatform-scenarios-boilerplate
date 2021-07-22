const mergeResults = require("wdio-mochawesome-reporter/mergeResults");
var browserstack = require("browserstack-local");

const timeStamp = new Date().getTime();

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
  logLevel: "trace",
  coloredLogs: true,
  bail: 0,
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
  framework: "mocha",
  reporters: [
    [
      "mochawesome",
      {
        outputDir: "./mochawesome-report",
        outputFileFormat: function (opts) {
          return `results-${opts.cid}.json`;
        },
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 120000,
    reporter: "mochawesome",
  },
  beforeSession: function (config, capabilities) {},
  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (error) {
      await browser.takeScreenshot();
    }
  },
  onPrepare: function (config, capabilities) {
    console.log("Connecting BrowserStackLocal");
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start(
        { key: exports.config.key, localIdentifier: timeStamp },
        function (error) {
          if (error) return reject(error);

          console.log("Connected. Now testing...");
          resolve();
        }
      );
    });
  },
  onComplete: function (capabilties, specs) {
    mergeResults("./mochawesome-report", "results-*");

    return new Promise(function (resolve, reject) {
      exports.bs_local.stop(function () {
        console.log("BrowserStackLocal binary stopped");
        resolve();
      });
    });
  },
};
