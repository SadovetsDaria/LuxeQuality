const loginPage = require('../pageobjects/login.page');

describe('product sorting', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    beforeEach(async () => {
        await browser.url('https://www.saucedemo.com/inventory.html');
    });

    async function getPrices() {
        const priceElements = await $$('div.inventory_item_price');
        const prices = [];
        for (const el of priceElements) {
            const priceText = await el.getText();
            prices.push(parseFloat(priceText.replace('$', '')));
        }
        return prices;
    }

    async function getNames() {
        const nameElements = await $$('div.inventory_item_name');
        const names = [];
        for (const el of nameElements) {
            names.push(await el.getText());
        }
        return names;
    }

    it('should sort products by price (low to high)', async () => {
        const sortSelect = await $('.product_sort_container');
        await sortSelect.selectByVisibleText('Price (low to high)');

        const prices = await getPrices();
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    });

    it('should sort products by price (high to low)', async () => {
        const sortSelect = await $('.product_sort_container');
        await sortSelect.selectByVisibleText('Price (high to low)');

        const prices = await getPrices();
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
        }
    });

    it('should sort products by name (A to Z)', async () => {
        const sortSelect = await $('.product_sort_container');
        await sortSelect.selectByVisibleText('Name (A to Z)');

        const names = await getNames();
        for (let i = 0; i < names.length - 1; i++) {
            expect(names[i].localeCompare(names[i + 1])).toBeLessThanOrEqual(0);
        }
    });

    it('should sort products by name (Z to A)', async () => {
        const sortSelect = await $('.product_sort_container');
        await sortSelect.selectByVisibleText('Name (Z to A)');

        const names = await getNames();
        for (let i = 0; i < names.length - 1; i++) {
            expect(names[i].localeCompare(names[i + 1])).toBeGreaterThanOrEqual(0);
        }
    });
});