const d1m1 = require("../../tests/web/domain1/module1");
const d2m1 = require("../../tests/web/domain2/module1");
const d3m1 = require("../../tests/web/domain3/module1");
const d4m1 = require("../../tests/app/domain4/module1");

describe("E2E Scenario A", function () {
  it("can find search results on android chrome and app", async function () {
    await browser.startActivity(
      "com.android.chrome",
      "com.google.android.apps.chrome.Main"
    );

    await browser.waitUntil(
      async () => (await browser.getContexts()).length > 1
    );

    await browser.switchContext("WEBVIEW_chrome");
    await d3m1.test1(this.test.fullTitle(), browser);

    await browser.startActivity(
      "org.wikipedia.alpha",
      "org.wikipedia.main.MainActivity"
    );

    await browser.switchContext("NATIVE_APP");

    await d4m1.test1(this.test.fullTitle(), browser);
  });
});
