const Helper = require("../../../utilities/helper");
var assert = require("assert");
const { addContext } = require('wdio-mochawesome-reporter').default;

const test1 = async (title, ...wdioBrowser) => {
  let browser1, browser2;
  let helper = new Helper();
  try {
    browser1 = wdioBrowser[0];
    browser2 = wdioBrowser[1];

    await helper.updateTestName(browser1, title);
    await helper.updateTestName(browser2, title);

    await browser1.url("https://duckduckgo.com");
    const inputElem = await browser1.$("#search_form_input_homepage");
    await inputElem.setValue("WebdriverIO");
    const submitBtn = await browser1.$("#search_button_homepage");
    await submitBtn.click();
    console.log(await browser1.getTitle());
    addContext({
      title: 'addContext within test',
      value: {
        pageTitle: await browser1.getTitle() 
      },
    });

    let searchSelector = await browser2.$(`~Search Wikipedia`);
    await searchSelector.waitForDisplayed({ timeout: 30000 });
    await searchSelector.click();

    let insertTextSelector = await browser2.$(
      'android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")'
    );
    await insertTextSelector.waitForDisplayed({ timeout: 30000 });

    await insertTextSelector.addValue("BrowserStack");
    await browser2.pause(5000);

    let allProductsName = await browser2.$$(`android.widget.TextView`);
    assert(allProductsName.length > 0);
    addContext({
      title: 'addContext within test',
      value: {
        allProducts: allProductsName
      },
    });


    await helper.updateTestStatus(browser1, "passed", "test successful");
    await helper.updateTestStatus(browser2, "passed", "test successful");
  } catch (e) {
    await helper.updateTestStatus(browser1, "failed", e.message);
    await helper.updateTestStatus(browser2, "failed", e.message);
    throw new Error(e);
  }
};

module.exports = {
  test1,
};
