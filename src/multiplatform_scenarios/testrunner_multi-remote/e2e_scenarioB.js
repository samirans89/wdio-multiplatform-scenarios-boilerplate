const d1m1 = require('../../tests/hybrid/domain1/module1');
const d2m1 = require('../../tests/hybrid/domain2/module1');

describe("E2E Scenario B", function() {
  it("can find search results on android chrome and app", async function() {
    await d1m1.test1(this.test.fullTitle(), browser["androidChromeBrowser"], browser["androidApp"]);
  });

  it("can find search results on desktop firefox and app", async function() {
    await d2m1.test1(this.test.fullTitle(), browser["firefoxBrowser"], browser["iosApp"]);
  });

});