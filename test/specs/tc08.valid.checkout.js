const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');
const cartPage = require('../pageobjects/cart.page');

describe('test case 8 - valid checkout', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        const url = await browser.getUrl();
        expect(url).toContain('inventory.html');
    });

    it('should complete a valid checkout flow', async () => {
        await inventoryPage.addFirstProductToCart();

        const badgeText = await inventoryPage.getCartBadgeText();
        expect(badgeText).toBe('1');

        await inventoryPage.openCart();

        const cartUrl = await browser.getUrl();
        expect(cartUrl).toContain('cart.html');

        const hasItems = await cartPage.hasItems();
        expect(hasItems).toBe(true);

        await cartPage.clickCheckout();

        const checkoutStepOneUrl = await browser.getUrl();
        expect(checkoutStepOneUrl).toContain('checkout-step-one.html');

        await $('#first-name').setValue('Ivan');
        const firstNameVal = await $('#first-name').getValue();
        expect(firstNameVal).toBe('Ivan');

        await $('#last-name').setValue('Ivanov');
        const lastNameVal = await $('#last-name').getValue();
        expect(lastNameVal).toBe('Ivanov');

        await $('#postal-code').setValue('123456');
        const postalCodeVal = await $('#postal-code').getValue();
        expect(postalCodeVal).toBe('123456');

        await $('#continue').click();

        const checkoutStepTwoUrl = await browser.getUrl();
        expect(checkoutStepTwoUrl).toContain('checkout-step-two.html');

        const overviewItemExists = await $('.cart_item').isExisting();
        expect(overviewItemExists).toBe(true);

        await $('#finish').click();

        const checkoutCompleteUrl = await browser.getUrl();
        expect(checkoutCompleteUrl).toContain('checkout-complete.html');

        const completeHeaderText = await $('.complete-header').getText();
        expect(completeHeaderText).toContain('Thank you for your order!');

        await $('#back-to-products').click();

        const inventoryUrl = await browser.getUrl();
        expect(inventoryUrl).toContain('inventory.html');

        const cartEmpty = await cartPage.isCartEmpty();
        expect(cartEmpty).toBe(true);
    });
});