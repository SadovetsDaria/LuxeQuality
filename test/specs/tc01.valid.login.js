const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');

const constants = require('../utils/consts.js');

describe('Valid login', () => {
    it('should log in with valid credentials', async () => {
        await loginPage.open();
        await loginPage.login(constants.loginName, constants.correctPass);

        expect(await browser.getUrl()).toContain('/inventory');

        expect(await inventoryPage.inventorryItems).not.toHaveLength(0);

        expect(await inventoryPage.shoppingCartLink).toBeDisplayed();
    });
});