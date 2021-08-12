const d1m1 = require("../../tests/web/domain1/module1");
const d2m1 = require("../../tests/web/domain2/module1");
const d3m1 = require("../../tests/web/domain3/module1");
const d4m1 = require("../../tests/app/domain4/module1");
const addContext = require("mochawesome/addContext");
require("mochawesome/register");

describe("E2E Scenario A", function () {
  beforeEach(function () {
    addContext(this, "executing beforeEach for test " + this.test.title);
  });

  afterEach(function () {
    addContext(this, "executing afterEach for test " + this.test.title);
  });


  it("can find search results on desktop firefox", async function () {
    await d1m1.test1(this, this.test.fullTitle());
    addContext(this, "executing it for test " + this.test.fullTitle());
  });

  it("can find search results on desktop chrome", async function () {
    await d2m1.test1(this.test.fullTitle());
    // context can be an object with title and value properties
    addContext(this, {
      title: "executing it for test " + this.test.fullTitle(),
      value: {
        obj1: "obj1 content",
        obj2: "obj2 content",
        obj3: "obj3 content",
      },
    });
  });

  it("can find search results on android chrome", async function () {
    await d3m1.test1(this.test.fullTitle());

    addContext(this, "../screenshots/Google.png");
    addContext(this, "https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_1280.png");
  });

  it("can find search results on android app", async function () {
    await d4m1.test1(this.test.fullTitle());
  });
});
