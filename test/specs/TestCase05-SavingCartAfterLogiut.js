const { expect } = require('@wdio/globals');
const LoginPage = require('../pageobjects/login.page');

describe('Saving the cart after logout', () => {
    it('should preserve cart contents after logout and login', async () => {
        // Логин
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        // Проверка перехода на /inventory
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/inventory');

        // Добавляем первый товар в корзину
        const firstAddToCartBtn = await $('button.btn_inventory');
        await firstAddToCartBtn.click();

        // Проверяем, что товар добавлен (появился значок с числом)
        const cartBadge = await $('.shopping_cart_badge');
        const cartCount = await cartBadge.getText();
        expect(cartCount).toBe('1');

        // Открываем бургер-меню и нажимаем Logout
        await $('#react-burger-menu-btn').click();
        await $('#logout_sidebar_link').click();

        // Проверяем, что вышли (редирект на логин и поля пустые)
        const urlAfterLogout = await browser.getUrl();
        expect(urlAfterLogout).toBe('https://www.saucedemo.com/');

        const loginFieldValue = await LoginPage.inputUsername.getValue();
        const passwordFieldValue = await LoginPage.inputPassword.getValue();
        expect(loginFieldValue).toBe('');
        expect(passwordFieldValue).toBe('');

        // Логинимся снова
        await LoginPage.login('standard_user', 'secret_sauce');

        const urlAfterLoginAgain = await browser.getUrl();
        expect(urlAfterLoginAgain).toContain('/inventory');

        // Переход в корзину
        await $('.shopping_cart_link').click();

        const cartPageUrl = await browser.getUrl();
        expect(cartPageUrl).toContain('/cart');

        // Проверка, что товар остался
        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBeGreaterThanOrEqual(1);
    });
});