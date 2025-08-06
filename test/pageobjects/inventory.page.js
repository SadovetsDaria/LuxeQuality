const { $ } = require('@wdio/globals');
const Page = require('./page');

class InventoryPage extends Page {
    get productItems() {
        return $$('.inventory_item');
    }

    get logoutButton() {
        return $('#logout_sidebar_link');
    }

    async logout() {
        await $('#react-burger-menu-btn').click();
        await this.logoutButton.click();
    }

    open() {
        return super.open('inventory');
    }
}

module.exports = new InventoryPage();
