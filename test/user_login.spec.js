import { test, expect } from '@playwright/test';
const utility = require('../utility/commands');
const global = require('../global');
const loginbtn = require('../page_objects/user_login_page');

test.describe("Spree Commerce - Home Page", () => {
    
    const spreeURL = global.URL.SPREE_BASE_URL
    const user_email = global.credentials.USERNAME
    const user_password = global.credentials.PASSWORD

    test("Login Account", async ({page}, testInfo) => {

        const in_login_page = new loginbtn(page);

        await utility.navigateToURL(page, spreeURL)
        // Assertion
        await expect(page).toHaveURL('https://demo.spreecommerce.org/')
        await expect(page).toHaveTitle(/Spree Commerce DEMO/);
        
        const spreehomepagescreenshot = `./screenshots/spree-home-page-${testInfo.title}.png`
        await page.screenshot({ path: spreehomepagescreenshot})

        await in_login_page.clickLoginButton();
        await expect(page.locator('#login')).toContainText('Login');
        await in_login_page.loginAccount(user_email, user_password);
    })
})