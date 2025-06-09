const utility = require('../utility/commands');

class DeliveryPage {
    constructor(page) {
        this.page = page;

         this.elements = {
            deliverymethod: {
                selector: '//div[@class="checkout-main-container"]/descendant::label[contains(text(), "Standard")]',
                locateStrategy: 'xpath'
            },
            saveContinueBtn: {
                selector: '//div[@class="checkout-main-container"]/descendant::button[text()="Save and Continue"]',
                locateStrategy: 'xpath'
            }
         }
    }

    async clickdeliveryMethod(shipping_type) {
        console.log("Clicks on the 'Delivery Method' button...")
        utility.waitForElement(this.page, this.elements.deliverymethod);
        // await this.page.locator(this.elements.deliverymethod.selector)
        await this.page.click(`//div[@class="checkout-main-container"]/descendant::label[contains(text(), "${shipping_type}")]`);
        console.log("Clicked on the 'Save and Continue' button...")
    }

    async clickSaveandContinue() {
        console.log("Clicks on the 'Save and Continue' button...")
        await this.page.locator(this.elements.saveContinueBtn.selector).scrollIntoViewIfNeeded();
        await this.page.click(this.elements.saveContinueBtn.selector);
        console.log("Clicked on the 'Save and Continue' button...")
    }
}

module.exports = DeliveryPage;