const loginPage = require('../pageobjects/login.page');

describe('Invalid login', () => {
    it('should not login with invalid password', async () => {
        await loginPage.open();

        await loginPage.inputUsername.setValue('standard_user');
        await expect(loginPage.inputUsername).toHaveValue('standard_user');

        await loginPage.inputPassword.setValue('random_wrong_password');
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');

        await loginPage.btnSubmit.click();

        await expect(loginPage.errorMessage).toBeDisplayed();

        const errorText = await loginPage.errorMessage.getText();
        expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

        const usernameClass = await loginPage.inputUsername.getAttribute('class');
        expect(usernameClass).toContain('input_error');

        const passwordClass = await loginPage.inputPassword.getAttribute('class');
        expect(passwordClass).toContain('input_error');
    });
});