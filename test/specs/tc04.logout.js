const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');

describe('logout', () => {
    it('should logout and redirect to login page with empty fields', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        expect(await browser.getUrl()).toContain('/inventory');

        await inventoryPage.logout();

        expect(await browser.getUrl()).toBe('https://www.saucedemo.com/');

        expect(await loginPage.inputUsername.getValue()).toBe('');
        expect(await loginPage.inputPassword.getValue()).toBe('');
    });
});