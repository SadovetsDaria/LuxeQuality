const LoginPage = require('../pageobjects/login.page');

describe('Valid Login', () => {
    it('should log in with valid credentials', async () => {
        await LoginPage.open(); // Открываем сайт
        await LoginPage.login('standard_user', 'secret_sauce'); // Выполняем логин

        // Проверки
        const url = await browser.getUrl();
        expect(url).toContain('/inventory');

        const products = await $$('.inventory_item');
        expect(products.length).toBeGreaterThan(0);

        const cartIcon = await $('.shopping_cart_link');
        expect(await cartIcon.isDisplayed()).toBe(true);
    });
});