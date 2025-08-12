class CheckoutPage {
    // селекторы для шагов оформления заказа
    get inputFirstName() { return $('#first-name'); }
    get inputLastName() { return $('#last-name'); }
    get inputPostalCode() { return $('#postal-code'); }
    get btnContinue() { return $('#continue'); }
    get btnFinish() { return $('#finish'); }
    get completeHeader() { return $('.complete-header'); }

    // страницы
    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputPostalCode.setValue(postalCode);
    }

    async continueCheckout() {
        await this.btnContinue.click();
    }

    async finishCheckout() {
        await this.btnFinish.click();
    }
}

module.exports = new CheckoutPage();