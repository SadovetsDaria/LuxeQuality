const loginPage = require('../pageobjects/login.page');

describe('saving the cart after logout', () => {
    it('should preserve cart contents after logout and login', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        expect(await browser.getUrl()).toContain('/inventory');

        const firstAddToCartBtn = await $('button.btn_inventory');
        await firstAddToCartBtn.click();

        const cartBadge = await $('.shopping_cart_badge');
        expect(await cartBadge.getText()).toBe('1');

        await $('#react-burger-menu-btn').click();
        await $('#logout_sidebar_link').click();

        expect(await browser.getUrl()).toBe('https://www.saucedemo.com/');

        expect(await loginPage.inputUsername.getValue()).toBe('');
        expect(await loginPage.inputPassword.getValue()).toBe('');

        await loginPage.login('standard_user', 'secret_sauce');

        expect(await browser.getUrl()).toContain('/inventory');

        await $('.shopping_cart_link').click();

        expect(await browser.getUrl()).toContain('/cart');

        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBeGreaterThanOrEqual(1);
    });
});