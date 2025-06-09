const utility = require('../utility/commands');

class PaymentPage {
    constructor(page) {
        this.page = page;

        this.elements = {
            payNowBtn: {
                selector: '//div[@id="checkout"]/descendant::button[@id="checkout-payment-submit"]',
                locateStrategy: 'xpath'
            }
         }
    }

    async inputCardNumber(card_number) {
        const stripeFrame = await this.page.waitForSelector('iframe[name^="__privateStripeFrame"]');
        const frame = await stripeFrame.contentFrame();
        await frame.locator('#Field-numberInput').fill(`${card_number}`);
    }

    async inputCardExpDate(exp_date) {
        console.log("Inputs Cards Expiration Date...")
        const stripeFrame = await this.page.waitForSelector('iframe[name^="__privateStripeFrame"]');
        const frame = await stripeFrame.contentFrame();
        await frame.locator('#Field-expiryInput').fill(`${exp_date}`);
        console.log("Entered Cards Expiration Date...")
    }

    async inputCardSecurityCode(cvc_code) {
        console.log("Inputs Card Security Code...")
        const stripeFrame = await this.page.waitForSelector('iframe[name^="__privateStripeFrame"]');
        const frame = await stripeFrame.contentFrame();
        await frame.locator('#Field-cvcInput').fill(`${cvc_code}`);
        console.log("Entered Cards ecurity Code...")
    }

    async clickPayNowButton() {
        console.log("Clicking Paynow Button...")
        utility.waitForElement(this.page, this.elements.payNowBtn)
        await this.page.locator(this.elements.payNowBtn.selector).scrollIntoViewIfNeeded();
        await this.page.click(this.elements.payNowBtn.selector)
        console.log("Clicking Paynow Button...")
    }
}

module.exports = PaymentPage;