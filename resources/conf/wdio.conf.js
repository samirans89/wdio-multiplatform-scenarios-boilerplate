const mergeResults = require("wdio-mochawesome-reporter/mergeResults");

exports.config = {
  runner: "local",
  specs: [""],
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
  onComplete: async function () {
    mergeResults("./mochawesome-report", "results-*");
  },
};
