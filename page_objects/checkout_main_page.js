const utility = require('../utility/commands');

class CheckOutPage {
    constructor(page) {
        this.page = page;

         this.elements = {
            emailAdd: {
                seletor: '//div[@class="checkout-main-container"]/descendant::input[@id="order_ship_address_attributes_email"]',
                locateStrategy: 'xpath'
            },
            country: {
                seletor: '//div[@class="checkout-main-container"]/descendant::div[@id="scountry-selection"]',
                locateStrategy: 'xpath'
            },
            firstName: {
                selector: '//div[@class="checkout-main-container"]/descendant::input[@id="order_ship_address_attributes_firstname"]',
                locateStrategy: 'xpath'
            },
            lastName: {
                selector: '//div[@class="checkout-main-container"]/descendant::input[@id="order_ship_address_attributes_lastname"]',
                locateStrategy: 'xpath'
            },
            streetName: {
                selector: '//div[@class="checkout-main-container"]/descendant::input[@id="order_ship_address_attributes_address1"]',
                locateStrategy: 'xpath'
            },
            ciTy: {
                selector: '//div[@class="checkout-main-container"]/descendant::input[@id="order_ship_address_attributes_city"]',
                locateStrategy: 'xpath'
            },
            postalCode: {
                selector: '//div[@class="checkout-main-container"]/descendant::input[@id="order_ship_address_attributes_zipcode"]',
                locateStrategy: 'xpath'
            },
            saveContinueBtn: {
                selector: '//div[@class="checkout-main-container"]/descendant::button[text()="Save and Continue"]',
                locateStrategy: 'xpath'
            }
         }
    }

    async inputEmailAddress(email) {
        console.log("Input Email Address...");
        utility.waitForElement(this.page, this.elements.emailAdd);
        await this.page.fill(this.elements.emailAdd.seletor, email);
        console.log(`Entered Email Address is ${email}`)

    }
    
    async selectCountry(country_value) {
        console.log("Selecting Country...")
        utility.waitForElement(this.page, this.elements.country);
        await this.page.click(this.elements.country.seletor);
        await this.page.getByLabel('Country').selectOption(`${country_value}`); //2581
        console.log(`Selected Country is ${country_value}`)
    }
    
    async inputFirstName(first_name) {
        console.log(`Input's '${first_name}' First Name...`)
        utility.waitForElement(this.page, this.elements.firstName);
        await this.page.fill(this.elements.firstName.selector, first_name);
        console.log(`${first_name} is entered...`)
    }

    async inputlastName(last_name) {
        console.log(`Input's ${last_name} Last Name...`)
        utility.waitForElement(this.page, this.elements.lastName);
        await this.page.fill(this.elements.lastName.selector, last_name);
        console.log(`${last_name} is entered...`)

    }
    
    async selectStreetandHouseNumber(strt_house_num) {
        console.log("Input's Street and House Number")
        utility.waitForElement(this.page, this.elements.streetName);
        await this.page.fill(this.elements.streetName.selector, strt_house_num);
        await this.page.click(`//div[@class="checkout-main-container"]/descendant::ul/child::li[contains(@aria-label, "${strt_house_num}")]`)
        console.log(`${strt_house_num} 'Street and House Number' Entered and Selected...`)

    }

    async inputPostalCode() {
        console.log("Input's 'Postal Code'...")
        utility.waitForElement(this.page, this.elements.postalCode);
    }

    async inputCity() {
        utility.waitForElement(this.page, this.elements.ciTy);
        await this.page.fill(this.elements.ciTy.selector, ' ')
    }

    async clickSave() {
        console.log("Clicks on the 'Save and Continue' button...")
        await this.page.locator(this.elements.saveContinueBtn.selector).hover();
        await this.page.click(this.elements.saveContinueBtn.selector);
        console.log("Clicked on the 'Save and Continue' button...")
    }

}

module.exports = CheckOutPage;
