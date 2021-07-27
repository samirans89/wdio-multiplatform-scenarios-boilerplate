const d1m1 = require("../../tests/web/domain1/module1");
const d2m1 = require("../../tests/web/domain2/module1");
const d3m1 = require("../../tests/web/domain3/module1");
const d4m1 = require("../../tests/app/domain4/module1");

describe("E2E Scenario A", function () {

  // No webview context is found. Test is expected to fail.
  it("can find search results on android chrome and app", async function () {
    try {
      await browser.waitUntil(
        async () => await browser.startActivity("org.mozilla.firefox", ".App")
      );
    } catch (error) {
      console.log("An error occurred while starting app.");
    }

    const search = await browser.$("//*[@text='Search or enter address']");
    await search.click();
    await search.setValue("http://www.google.com" + "\n");
    try {
      await browser.keys(["Enter"]);
    } catch (error) {
      console.log("An error occurred while sending keys.");
    }

    const webView = await browser.$("//android.webkit.WebView");
    await webView.click();

    console.log(await browser.getPageSource());

    await browser.waitUntil(
      async () => (await browser.getContexts()).length > 1
    );
    
    // no webview context is found for Firefox. Test would fail. 
    await browser.switchContext("WEBVIEW_firefox");
    await d3m1.test1(this.test.fullTitle(), browser);

    await browser.startActivity(
      "org.wikipedia.alpha",
      "org.wikipedia.main.MainActivity"
    );

    await browser.switchContext("NATIVE_APP");

    await d4m1.test1(this.test.fullTitle(), browser);
  });
});
