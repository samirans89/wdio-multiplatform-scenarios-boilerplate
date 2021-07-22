const d1m1 = require('../../tests/web/domain1/module1');
const d2m1 = require('../../tests/web/domain2/module1');
const d3m1 = require('../../tests/web/domain3/module1');
const d4m1 = require('../../tests/app/domain4/module1');

describe("E2E Scenario C", function() {
  it("can find search results on desktop firefox", async function() {
    await d1m1.test1(this.test.fullTitle());
  });

  it("can find search results on desktop chrome", async function() {
    await d2m1.test1(this.test.fullTitle());
  });

  it("can find search results on android chrome", async function() {
    await d3m1.test1(this.test.fullTitle());
  });

  it("can find search results on android app", async function() {
    await d4m1.test1(this.test.fullTitle());
  });
});