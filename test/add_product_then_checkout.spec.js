import { test, expect } from '@playwright/test';
const { globalTimeout } = require('../playwright.config');
const utility = require('../utility/commands');
const global = require('../global');
const usrdata =  require('../data/user_data');
const loginbtn = require('../page_objects/user_login_page');
const navBar = require('../page_objects/navigation_bar');
const itemproduct = require('../page_objects/product_selection');
const checkOut = require('../page_objects/checkout_main_page');
const deLivery = require('../page_objects/delivery_main_page');
const payMent = require('../page_objects/payment_main_page');

test.describe("Spree Commerce - Home Page", () => {
    
    const user_email = global.credentials.USERNAME
    const user_password = global.credentials.PASSWORD
    const spreeURL = global.URL.SPREE_BASE_URL
    const product_size = usrdata.productSize.SIZE
    const country_value = usrdata.userData.COUNTRY
    const first_name = usrdata.userData.FIRST_NAME
    const last_name = usrdata.userData.LAST_NAME
    const strt_house_num = usrdata.userData.ADDRESS
    const shipping_type = usrdata.userData.DELIVERY
    const card_number = usrdata.userData.CARD_NUMBER
    const exp_date = usrdata.userData.EXPIRATION_DATE
    const cvc_code = usrdata.userData.SECURITY_CODE

    test("Click 'Shop All' then select a product then checkout", async ({page}, testInfo) => {

        const productScreenshot = `./screenshots/selected-product-${testInfo.title}.png`;
        const checkoutScreenshot = `./screenshots/checkout-page-${testInfo.title}.png`;

        const in_login_page = new loginbtn(page);
        const in_navigation_panel = new navBar(page);
        const in_product_selection_page = new itemproduct(page);
        const in_checkout_page = new checkOut(page);
        const in_delivery_page = new deLivery(page);
        const in_payment_page = new payMent(page);

        await utility.navigateToURL(page, spreeURL)
        await page.waitForLoadState('networkidle');
        // Assertion
        await expect(page).toHaveURL('https://demo.spreecommerce.org/')
        await expect(page).toHaveTitle(/Spree Commerce DEMO/);

        console.log(await page.content());

        await in_login_page.clickLoginButton();
        await expect(page.locator('#login')).toContainText('Login');
        await in_login_page.loginAccount(user_email, user_password);

        await in_navigation_panel.clickShopAllButton();
        await expect(page.locator('h1')).toContainText('Shop All');

        await in_product_selection_page.clickSelectedProduct("Sale Ripped T-Shirt")
        await in_product_selection_page.selectProductDetails(product_size);
        await in_product_selection_page.clickAddtoCartButton();

        await in_product_selection_page.clickCheckoutButton();

        await utility.screenshotFullPage({
            page,
            testInfo,
            screenshotPath: productScreenshot,
            description: 'Selected Item on the Page',
        });

        if (await page.locator('//turbo-frame[@id="checkout_address_book"]').isVisible()) {
            await in_checkout_page.clickSave();
        }else {
            await in_checkout_page.selectCountry(country_value);
            await in_checkout_page.inputFirstName(first_name);
            await in_checkout_page.inputlastName(last_name);
            await in_checkout_page.selectStreetandHouseNumber(strt_house_num);
            await in_checkout_page.clickSave();
            await in_checkout_page.clickSave();
        }

        await utility.screenshotFullPage({
            page,
            testInfo,
            screenshotPath: checkoutScreenshot,
            description: 'Product Checkout Page',
        });
        
        /**
         * Delivery Method (Standard, Premium, Next Day)
        */
        await in_delivery_page.clickdeliveryMethod(shipping_type);
        await in_delivery_page.clickSaveandContinue();

        /**
         * Payment Page
        */
        const existingCardsLocator = await page.waitForSelector('turbo-frame#checkout_payment_methods >> div#existing_cards', {globalTimeout});
        if (await existingCardsLocator.isVisible()) {
            console.log('Existing cards are shown — clicking Pay Now');
            await in_payment_page.clickPayNowButton();
        } else {
            console.log('No existing cards — entering new card details');
            await in_payment_page.inputCardNumber(card_number);
            await in_payment_page.inputCardExpDate(exp_date);
            await in_payment_page.inputCardSecurityCode(cvc_code);
        }

        await page.waitForLoadState('networkidle',{globalTimeout})
        await utility.screenshotFullPage({
            page,
            testInfo,
            screenshotPath: productScreenshot,
            description: 'Order Completion',
        });

    })
})