const loginPage = require('../pageobjects/login.page');

describe('Valid login', () => {
    it('should log in with valid credentials', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        expect(await browser.getUrl()).toContain('/inventory');

        expect(await $$('.inventory_item')).not.toHaveLength(0);

        expect(await $('.shopping_cart_link')).toBeDisplayed();
    });
});