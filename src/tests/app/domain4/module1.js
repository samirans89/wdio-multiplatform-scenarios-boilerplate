const Helper = require("../../../utilities/helper");
var assert = require("assert");
const browserConf = require("./../../../../resources/data/standalone_browsers.json");

const test1 = async (title, wdioBrowser) => {
  let browser;
  let helper = new Helper();
  try {
    if (!wdioBrowser) {
      browser = await helper.createPlatformInstance(
        browserConf.androidApp.caps,
        browserConf.androidApp.bstackCaps
      );
    } else {
      browser = wdioBrowser;
    }
    await helper.updateTestName(browser, title);

    let searchSelector = await browser.$(`~Search Wikipedia`);
    await searchSelector.waitForDisplayed({ timeout: 30000 });
    await searchSelector.click();

    let insertTextSelector = await browser.$(
      'android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")'
    );
    await insertTextSelector.waitForDisplayed({ timeout: 30000 });

    await insertTextSelector.addValue("BrowserStack");
    await browser.pause(5000);

    let allProductsName = await browser.$$(`android.widget.TextView`);
    assert(allProductsName.length > 0);
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
