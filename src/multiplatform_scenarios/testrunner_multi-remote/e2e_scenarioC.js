const d1m1 = require('../../tests/hybrid/domain1/module1');
const d2m1 = require('../../tests/hybrid/domain2/module1');
const { addContext } = require('wdio-mochawesome-reporter').default;

describe("E2E Scenario C", function() {
  it("can find search results on android chrome and app", async function() {
    addContext({
      title: 'Before triggering the test: ',
      value: {
        it: this.test.fullTitle()
      },
    });
    await d1m1.test1(this.test.fullTitle(), browser["androidChromeBrowser"], browser["androidApp"]);
  });

  it("can find search results on desktop firefox and app", async function() {
    addContext({
      title: 'Before triggering the test: ',
      value: {
        it: this.test.fullTitle()
      },
    });
    await d2m1.test1(this.test.fullTitle(), browser["firefoxBrowser"], browser["iosApp"]);
  });

});