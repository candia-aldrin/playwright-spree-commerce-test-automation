const utility = require('../utility/commands');

class NavBar {
    constructor(page) {
        this.page = page;


        this.elements = {
            shopAll: {
                selector: '//div[@data-editor-name="Shop All"]/descendant::span[text()="Shop All"]',
                locateStrategy: 'xpath'
            },
            faShion: {
                selector: '//div[@data-editor-name="Fashion"]/descendant::span[text()="Fashion"]',
                locateStrategy: 'xpath'
            },
            wellness: {
                selector: '//div[@data-editor-name="Wellness"]/descendant::span[text()="Wellness"]',
                locateStrategy: 'xpath'
            },
            newArrivals: {
                selector: '//div[@data-editor-name="New Arrivals"]/descendant::span[text()="New Arrivals"]',
                locateStrategy: 'xpath'               
            },
            saLe: {
                selector: '//div[@data-editor-name="Sale"]/descendant::span[text()="Sale"]',
                locateStrategy: 'xpath'                      
            }
        };
    }

    async clickShopAllButton() {
        console.log("Clicking 'Shop All'...");
        utility.waitForElement(this.page, this.elements.shopAll);
        await this.page.click(this.elements.shopAll.selector);
        utility.checkIfURLContains(this.page, '/products')
    }

    async clickFashionButton() {
        utility.waitForElement(this.page, this.elements.faShion);
        await this.page.click(this.elements.faShion.selector);
        utility.checkIfURLContains(this.page, '/categories/fashion')
    }

    async clickWellnessButton() {
        utility.waitForElement(this.page, this.elements.wellness);
        await this.page.click(this.elements.wellness.selector);
        utility.checkIfURLContains(this.page, 'categories/wellness')
    }

    async clickNewArrivalsButton() {
        utility.waitForElement(this.page, this.elements.newArrivals);
        await this.page.click(this.elements.newArrivals.selector);
        utility.checkIfURLContains(this.page, 'collections/new-arrivals')

    }

    async clickSaleButton() {
        utility.waitForElement(this.page, this.elements.saLe);
        await this.page.click(this.elements.saLe.selector);
        utility.checkIfURLContains(this.page, 'collections/on-sale')
    }
}

module.exports = NavBar;
