const assert = require('assert');
const LoginPage = require('../pageobjects/login.page');

describe('Test Case 8 - Valid Checkout', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        const url = await browser.getUrl();
        assert(url.includes('inventory.html'));
    });

    it('should complete a valid checkout flow', async () => {
        const firstAddBtn = await $('button.btn_inventory');
        await firstAddBtn.click();

        const cartBadge = await $('.shopping_cart_badge');
        const badgeText = await cartBadge.getText();
        assert.strictEqual(badgeText, '1');

        await $('.shopping_cart_link').click();

        let url = await browser.getUrl();
        assert(url.includes('cart.html'));

        const cartItem = await $('.cart_item');
        assert(await cartItem.isExisting());

        await $('#checkout').click();

        url = await browser.getUrl();
        assert(url.includes('checkout-step-one.html'));

        await $('#first-name').setValue('Ivan');
        let val = await $('#first-name').getValue();
        assert.strictEqual(val, 'Ivan');

        await $('#last-name').setValue('Ivanov');
        val = await $('#last-name').getValue();
        assert.strictEqual(val, 'Ivanov');

        await $('#postal-code').setValue('123456');
        val = await $('#postal-code').getValue();
        assert.strictEqual(val, '123456');

        await $('#continue').click();

        url = await browser.getUrl();
        assert(url.includes('checkout-step-two.html'));

        const overviewItem = await $('.cart_item');
        assert(await overviewItem.isExisting());

        await $('#finish').click();

        url = await browser.getUrl();
        assert(url.includes('checkout-complete.html'));

        const completeMsg = await $('.complete-header');
        const text = await completeMsg.getText();
        assert(text.includes('Thank you for your order!'));

        await $('#back-to-products').click();

        url = await browser.getUrl();
        assert(url.includes('inventory.html'));

        const cartBadgeAfter = await $('.shopping_cart_badge');
        assert(!(await cartBadgeAfter.isExisting()));
    });
});