describe("Google Search Functionality", () => {

  beforeEach('Open Search Engine', async () => {
    await androidChromeBrowser.url('https://www.google.com')
    await firefoxBrowser.url('https://www.bing.com')
  })

  it(`should be able to search on Search Engine`, async () => {
      var q = await androidChromeBrowser.$('//input[@name=\"q\"]');
      await q.setValue("BrowserStack\n");
      await androidChromeBrowser.pause(1000);
      var title = await androidChromeBrowser.getTitle();
      expect(title).toHaveText("BrowserStack - Google Search");


      q = await firefoxBrowser.$('//input[@name=\"q\"]');
      await q.setValue("Wikipedia\n");
      await firefoxBrowser.pause(1000);
      title = await firefoxBrowser.getTitle();
      expect(title).toHaveText("Wikipedia - Bing");

  });
});
