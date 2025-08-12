class InventoryPage {
    get sortSelect() {
        return $('#product_sort_container');
    }

    get priceElements() {
        return $$('div.inventory_item_price');
    }

    get nameElements() {
        return $$('div.inventory_item_name');
    }

    get burgerMenuBtn() {
        return $('#react-burger-menu-btn');
    }

    get logoutLink() {
        return $('#logout_sidebar_link');
    }

    get firstAddToCartBtn() {
        return $('button.btn_inventory');
    }

    get cartBadge() {
        return $('.shopping_cart_badge');
    }

    get shoppingCartLink() {
        return $('.shopping_cart_link');
    }

    async open() {
        await browser.url('https://www.saucedemo.com/inventory.html');
    }

    async selectSort(optionText) {
        await this.sortSelect.selectByVisibleText(optionText);
    }

    async getPrices() {
        const elements = await this.priceElements;
        const prices = [];
        for (const el of elements) {
            const text = await el.getText();
            prices.push(parseFloat(text.replace('$', '')));
        }
        return prices;
    }

    async getNames() {
        const elements = await this.nameElements;
        const names = [];
        for (const el of elements) {
            names.push(await el.getText());
        }
        return names;
    }

    async logout() {
        await this.burgerMenuBtn.click();
        await this.logoutLink.click();
    }

    async addFirstProductToCart() {
        await this.firstAddToCartBtn.click();
    }

    async getCartBadgeText() {
        if (await this.cartBadge.isExisting()) {
            return await this.cartBadge.getText();
        }
        return null;
    }

    async openCart() {
        await this.shoppingCartLink.click();
    }
}

module.exports = new InventoryPage();