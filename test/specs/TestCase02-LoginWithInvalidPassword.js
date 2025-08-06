const LoginPage = require('../pageobjects/login.page');

describe('Invalid Login', () => {
    it('should not login with invalid password', async () => {
        await LoginPage.open();

        await LoginPage.inputUsername.setValue('standard_user');
        await expect(LoginPage.inputUsername).toHaveValue('standard_user');

        await LoginPage.inputPassword.setValue('random_wrong_password');
        await expect(LoginPage.inputPassword).toHaveAttribute('type', 'password');

        await LoginPage.btnSubmit.click();

        await expect(LoginPage.errorMessage).toBeDisplayed();

        const errorText = await LoginPage.errorMessage.getText();
        expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

        const usernameClass = await LoginPage.inputUsername.getAttribute('class');
        expect(usernameClass).toContain('input_error');

        const passwordClass = await LoginPage.inputPassword.getAttribute('class');
        expect(passwordClass).toContain('input_error');
    });
});