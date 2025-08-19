const { $ } = require('@wdio/globals');
const Page = require('./page');

class LoginPage extends Page {
    get inputUsername() {
        return $('#user-name');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnSubmit() {
        return $('#login-button');
    }

    get errorMessage() {
        return $('.error-message-container');
    }

    get errorMessageH3() {
        return $('.error-message-container h3');
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open() {
        return super.open('');
    }
}

module.exports = new LoginPage();
