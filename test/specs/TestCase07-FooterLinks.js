const { expect } = require('@wdio/globals');
const LoginPage = require('../pageobjects/login.page');

describe('Footer Links', () => {
  const baseUrl = 'https://www.saucedemo.com/';

  before(async () => {
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');

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
      { timeout: 5000, timeoutMsg: 'Открытие новой вкладки заняло слишком много времени' }
    );

    const handles = await browser.getWindowHandles();
    const newTab = handles[1];
    await browser.switchToWindow(newTab);

    await browser.waitUntil(
      async () => (await browser.getUrl()).toLowerCase().includes(expectedSubstring),
      { timeout: 7000, timeoutMsg: `URL не содержит ${expectedSubstring}` }
    );

    const url = await browser.getUrl();
    await expect(url.toLowerCase()).toContain(expectedSubstring);

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