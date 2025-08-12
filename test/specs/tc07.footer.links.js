const loginPage = require('../pageobjects/login.page');

describe('footer links', () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await $('#inventory_container').waitForExist({ timeout: 5000 });

    const footer = await $('footer');
    await footer.scrollIntoView();

    const cookieBanner = await $('#cookie-banner');
    if (await cookieBanner.isDisplayed()) {
      const acceptBtn = await cookieBanner.$('button.accept');
      if (await acceptBtn.isDisplayed()) {
        await acceptBtn.click();
        await browser.pause(1000);
      }
    }
  });

  async function checkSocialLink(selector, expectedSubstring) {
    const link = await $(selector);
    await link.scrollIntoView();

    await link.click();

    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length === 2,
      { timeout: 5000, timeoutMsg: 'Opening new tab took too long' }
    );

    const handles = await browser.getWindowHandles();
    const newTab = handles[1];
    await browser.switchToWindow(newTab);

    await browser.waitUntil(
      async () => (await browser.getUrl()).toLowerCase().includes(expectedSubstring),
      { timeout: 7000, timeoutMsg: `URL does not contain ${expectedSubstring}` }
    );

    const url = await browser.getUrl();
    expect(url.toLowerCase()).toContain(expectedSubstring);

    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
  }

  it('should open linkedin.com page in new tab when clicking linkedin.com icon', async () => {
    await checkSocialLink('ul.social li.social_linkedin a', 'linkedin.com');
  });

  it('should open twitter.com page in new tab when clicking twitter.com icon', async () => {
    await checkSocialLink('ul.social li.social_twitter a', 'x.com');
  });

  it('should open facebook.com page in new tab when clicking facebook.com icon', async () => {
    await checkSocialLink('ul.social li.social_facebook a', 'facebook.com');
  });
});