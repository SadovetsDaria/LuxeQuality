const loginPage = require('../../test/pageobjects/login.page');
const constants = require('../../test/utils/Consts.js');
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('User is located on the main page of saucedemo website', async () => {
    await browser.url(constants.url);
});

When('User click {string} button', async (buttonText) => {
    await loginPage.btnSubmit.click();
});

Then('User should see {string} error message', async (expectedMessage) => {
    const actualMessage = await loginPage.errorMessageH3.getText();
    assert.strictEqual(actualMessage, expectedMessage);
});