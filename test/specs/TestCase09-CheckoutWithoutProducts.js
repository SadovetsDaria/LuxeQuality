const LoginPage = require('../pageobjects/login.page');

describe('Test Case 9 - Valid Checkout without products', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            {
                timeout: 5000,
                timeoutMsg: 'expected to be on inventory page after 5s'
            }
        );
    });

    it('should show empty cart when no products added', async () => {
        await $('a.shopping_cart_link').click();

        const url = await browser.getUrl();
        expect(url.includes('cart.html')).toBe(true);

        const cartItems = await $$('div.cart_item');
        expect(cartItems.length).toBe(0);

        await $('#checkout').click();

        const urlAfterCheckout = await browser.getUrl();
        expect(urlAfterCheckout.includes('cart.html')).toBe(true);

        const errorMsg = await $('div.cart_empty_message');
        expect(await errorMsg.isDisplayed()).toBe(true);

        const text = await errorMsg.getText();
        expect(text.includes('Cart is empty')).toBe(true);
    });
});