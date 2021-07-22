const Helper = require("../../../utilities/helper");
var assert = require("assert");

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

    const loginList = await browser2.$("~Login Screen");
    loginList.waitForDisplayed();
    loginList.click();

    const username = await browser2.$(
      '//XCUIElementTypeTextField[@name="username"]'
    );
    username.waitForDisplayed();
    await username.setValue("alice");

    const password = await browser2.$(
      '//XCUIElementTypeSecureTextField[@name="password"]'
    );
    await password.setValue("mypassword");

    const loginBtn = await browser2.$(
      '(//XCUIElementTypeOther[@name="loginBtn"])[2]'
    );
    await loginBtn.click();

    const responseElement = await browser2.$("You are logged in as alice");
    responseElement.waitForDisplayed();
    const response = await responseElement.getText();
    assert(response.includes("You are logged in as alice"));

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
