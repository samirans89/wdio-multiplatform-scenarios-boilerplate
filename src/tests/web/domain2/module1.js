const Helper = require("../../../utilities/helper");
const browserConf = require("./../../../../resources/data/standalone_browsers.json");

const test1 = async (title, wdioBrowser) => {
  let browser;
  let helper = new Helper();
  try {
    if (!wdioBrowser) {
      console.log("WDIO Test runner browser is null");
      browser = await helper.createPlatformInstance(browserConf.firefox.caps);
    } else {
      browser = wdioBrowser;
    }

    await helper.updateTestName(browser, title);
    await browser.url("https://duckduckgo.com");

    const inputElem = await browser.$("#search_form_input_homepage");
    await inputElem.setValue("WebdriverIO");

    const submitBtn = await browser.$("#search_button_homepage");
    await submitBtn.click();

    console.log(await browser.getTitle()); // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
    await helper.updateTestStatus(browser, "passed", "test successful");
  } catch (e) {
    await helper.updateTestStatus(browser, "failed", e.message);
    throw new Error(e);
  } finally {
    if (
      !wdioBrowser ||
      (wdioBrowser &&
        wdioBrowser.config &&
        wdioBrowser.config.deleteBrowserAfterTest)
    ) {
      await browser.deleteSession();
    }
  }
};

module.exports = {
  test1,
};
