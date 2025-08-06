const { expect } = require('@wdio/globals');
const LoginPage = require('../pageobjects/login.page');

describe('Login with invalid login', () => {
    it('should not login with invalid username', async () => {
        await LoginPage.open();

        await LoginPage.inputUsername.setValue('standarD_user');
        const usernameValue = await LoginPage.inputUsername.getValue();
        expect(usernameValue).toBe('standarD_user');

        await LoginPage.inputPassword.setValue('secret_sauce');
        const passwordType = await LoginPage.inputPassword.getAttribute('type');
        expect(passwordType).toBe('password');

        await LoginPage.btnSubmit.click();

        // Прямо в тесте ищем сообщение об ошибке
        const errorMessage = await $('h3[data-test="error"]');
        const errorText = await errorMessage.getText();
        expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

        // Проверяем наличие иконок ошибок (тоже напрямую)
        const usernameIcon = await $('.input_error.form_input.error[data-test="username"]');
        const passwordIcon = await $('.input_error.form_input.error[data-test="password"]');
        expect(await usernameIcon.isExisting()).toBe(true);
        expect(await passwordIcon.isExisting()).toBe(true);
    });
});


