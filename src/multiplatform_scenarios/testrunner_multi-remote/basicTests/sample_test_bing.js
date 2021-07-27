describe("Google Search Functionality", () => {

  beforeEach('Open Bing', async () => {
    await browser.url('https://www.bing.com');
  })

  it(`should be able to search on Bing Engine`, async () => {
      const q = await $('//input[@name=\"q\"]');
      await q.setValue("BrowserStack\n");
      await browser.pause(1000);
      const title = await browser.getTitle();
      expect(title).toHaveText("BrowserStack - Bing");
  });
});
