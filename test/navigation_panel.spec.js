import { test, expect } from '@playwright/test';
const utility = require('../utility/commands');
const global = require('../global');
const navBar = require('../page_objects/navigation_bar')
const itemproduct = require('../page_objects/product_selection')

test.describe("Spree Commerce - Home Page", () => {
    
    const spreeURL = global.URL.SPREE_BASE_URL

    test("Navigate to Application 'Navigation Bar'", async ({page}, testInfo) => {

        const navigationPanel = new navBar(page);
        

        await utility.navigateToURL(page, spreeURL)
        // Assertion
        await expect(page).toHaveURL('https://demo.spreecommerce.org/')
        await expect(page).toHaveTitle(/Spree Commerce DEMO/);
        
        const spreehomepagescreenshot = `./screenshots/spree-home-page-${testInfo.title}.png`
        await page.screenshot({ path: spreehomepagescreenshot})

        await navigationPanel.clickShopAllButton();

        await navigationPanel.clickFashionButton();
        await expect(page.locator('h1')).toContainText('Fashion');

        await navigationPanel.clickWellnessButton();
        await expect(page.locator('h1')).toContainText('Wellness');


        await navigationPanel.clickNewArrivalsButton();
        await expect(page.locator('h1')).toContainText('New Arrivals');


        await navigationPanel.clickSaleButton();
        await expect(page.locator('h1')).toContainText('On Sale');
    })

    test("Click 'Shop All' then select a product'", async ({page}, testInfo) => {

        const navigationPanel = new navBar(page);
        const selectedProduct = new itemproduct(page)

        await utility.navigateToURL(page, spreeURL)
        // Assertion
        await expect(page).toHaveURL('https://demo.spreecommerce.org/')
        await expect(page).toHaveTitle(/Spree Commerce DEMO/);

        await navigationPanel.clickShopAllButton();
        await expect(page.locator('h1')).toContainText('Shop All');

        await selectedProduct.clickSelectedProduct("Sale Ripped T-Shirt")
        await expect(page.getByRole('heading', { name: 'Ripped T-Shirt' })).toBeVisible();
        
        await selectedProduct.clickReadMore();
        await expect(page.getByRole('button', { name: 'Read less' })).toBeVisible();

        await selectedProduct.clickProductDetails();
        await expect(page.locator('#product-details-page')).toContainText('Cotton');

        const spreehomepagescreenshot = `./screenshots/product-${testInfo.title}.png`
        await page.screenshot({path: spreehomepagescreenshot, fullPage: true});
    })
})