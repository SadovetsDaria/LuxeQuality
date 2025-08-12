class CartPage {
    get cartItems() { return $$('.cart_item'); }
    get checkoutBtn() { return $('#checkout'); }
    get cartBadge() { return $('.shopping_cart_badge'); }
    get emptyCartMessage() { return $('div.cart_empty_message'); }

    async open() {
        await browser.url('https://www.saucedemo.com/cart.html');
    }

    async isCartEmpty() {
        return !(await this.cartBadge.isExisting());
    }

    async hasItems() {
        return (await this.cartItems.length) > 0;
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
    }

    async isEmptyMessageDisplayed() {
        return this.emptyCartMessage.isDisplayed();
    }

    async getEmptyMessageText() {
        return this.emptyCartMessage.getText();
    }
}

module.exports = new CartPage();