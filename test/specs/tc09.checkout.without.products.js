const loginPage = require('../pageobjects/login.page');
const cartPage = require('../pageobjects/cart.page');

describe('Test Case 9 - Checkout without products', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            {
                timeout: 5000,
                timeoutMsg: 'expected to be on inventory page after login'
            }
        );
    });

    it('should show empty cart message and prevent checkout when no products added', async () => {
        await cartPage.open();

        const hasItems = await cartPage.hasItems();
        expect(hasItems).toBe(false);

        await cartPage.clickCheckout();

        const url = await browser.getUrl();
        expect(url).toContain('/cart.html');

        const errorElem = await $('#error_message');
        expect(await errorElem.isDisplayed()).toBe(true);

        const errorText = await errorElem.getText();
        expect(errorText.toLowerCase()).toContain('empty');
    });
});