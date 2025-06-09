import { expect } from '@playwright/test';
const utility = require('../utility/commands');

class productItem {
    constructor(page) {
        this.page = page;

        this.elements = {
            product: {
                role: 'link',
                options: {name: 'Sale Ripped T-Shirt $55.99 $'}
            },
            readMore: {
                selector: '//div[@data-controller="sticky-button"]/descendant::button[contains(text(), "Read more")]',
                locateStrategy: 'xpath'
            },
            maTerial: {
                selector: '//div[@data-controller="sticky-button"]/descendant::a[contains(text(), "Material")]',
                locateStrategy: 'xpath'
            },
            addToCart: {
                selector: '(//div[@data-controller="sticky-button"]/descendant::button/child::span[contains(text(), "Add To Cart")])[1]',
                locateStrategy: 'xpath'
            },
            Details: {
                selector: '//div[@data-controller="sticky-button"]/descendant::button/child::legend[contains(text(), "Please choose Size")]',
                locateStrategy: 'xpath'
            },
            checkoutDetails: {
                selector: '//div[@id="cart-pane"]/descendant::span[contains(text(), "Cart")]',
                locateStrategy: 'xpath'
            },
            checkOutBtn: {
                selector: '//turbo-frame[@class="cart-contents"]/descendant::a[text()="Checkout"]',
                locateStrategy: 'xpath'
            }
        }
    }

    async clickSelectedProduct(productName) {
        console.log("Clicking 'Shop All'...");
        await this.page.getByRole('link', { name: `${productName}` }).click();
        utility.checkIfURLContains(this.page, '/products/ripped-t-shirt')
    }

    async clickReadMore() {
        console.log("Clicking 'Read More'...");
        utility.waitForElement(this.page, this.elements.readMore);
        await this.page.click(this.elements.readMore.selector);
    }

    async clickProductDetails() {
        console.log("Clicking 'Material'...");
        utility.waitForElement(this.page, this.elements.maTerial)
        await this.page.click(this.elements.maTerial.selector)

    }

    async selectProductDetails(product_size) {
        console.log("Selecting product 'Size'")
        utility.waitForElement(this.page, this.elements.Details);
        await this.page.click(this.elements.Details.selector);
        await this.page.locator('#product-variant-picker label').filter({ hasText: `${product_size}` }).click();
    }

    async clickAddtoCartButton() {
        console.log("Clicking 'Add to Cart' button...")
        utility.waitForElement(this.page, this.elements.addToCart);
        await this.page.click(this.elements.addToCart.selector);
        utility.waitForElement(this.page, this.elements.checkoutDetails);
    }

    async clickCheckoutButton() {
        console.log("Clicking 'Checkout' button...")
        utility.waitForElement(this.page, this.elements.checkOutBtn);
        await this.page.click(this.elements.checkOutBtn.selector);
    }

}

module.exports = productItem;