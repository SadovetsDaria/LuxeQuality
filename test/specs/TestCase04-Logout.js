const { expect } = require('@wdio/globals');
const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

describe('Logout', () => {
    it('should logout and redirect to login page with empty fields', async () => {
        // Открываем логин-страницу и логинимся
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        // Проверяем, что перешли на страницу товаров
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/inventory');

        // Выходим через метод из InventoryPage
        await InventoryPage.logout();

        // Проверяем, что вернулись на логин-страницу
        const redirectedUrl = await browser.getUrl();
        expect(redirectedUrl).toBe('https://www.saucedemo.com/');

        // Убеждаемся, что поля логина и пароля пустые
        const usernameValue = await LoginPage.inputUsername.getValue();
        const passwordValue = await LoginPage.inputPassword.getValue();
        expect(usernameValue).toBe('');
        expect(passwordValue).toBe('');
    });
});