describe("Google Search Functionality", () => {

  beforeEach('Open Google', async () => {
    await browser.url('https://www.google.com');
  })

  it(`should be able to search on Google Engine`, async () => {
      console.log(await browser)
      const q = await $("//input[@name=\"q\"]");
      await q.setValue("BrowserStack\n");
      await browser.pause(1000);
      const title = await browser.getTitle();
      expect(title).toHaveText("BrowserStack - Google Search");
  });
});
