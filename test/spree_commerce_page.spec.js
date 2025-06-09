import { test, expect } from '@playwright/test';
const utility = require('../utility/commands');
const global = require('../global')

test.describe("Spree Commerce - Home Page", () => {
    
    const spreeURL = global.URL.SPREE_BASE_URL

    test("Navigate to 'Spree Commerce' webpage", async ({page}, testInfo) => {
        await utility.navigateToURL(page, spreeURL)
        // Assertion
        await expect(page).toHaveURL('https://demo.spreecommerce.org/')
        await expect(page).toHaveTitle(/Spree Commerce DEMO/);
        
        const spreehomepagescreenshot = `./screenshots/spree-home-page-${testInfo.title}.png`
        await page.screenshot({ path: spreehomepagescreenshot})
    })

})