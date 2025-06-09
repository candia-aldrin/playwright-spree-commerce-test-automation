import { test, expect } from '@playwright/test';
const utility = require('../utility/commands');
const global = require('../global');
const loginbtn = require('../page_objects/user_login_page');
const signupbtn = require('../page_objects/sign_up_page');


test.describe("Spree Commerce - Home Page", () => {
    
    const spreeURL = global.URL.SPREE_BASE_URL
    const user_email = global.credentials.USERNAME
    const user_password = global.credentials.PASSWORD

    test("Click on the 'Account Login' button...", async ({page}, testInfo) => {

        const userAccount = new loginbtn(page);
        const newUser = new signupbtn(page);

        await utility.navigateToURL(page, spreeURL)
        // Assertion
        await expect(page).toHaveURL('https://demo.spreecommerce.org/')
        await expect(page).toHaveTitle(/Spree Commerce DEMO/);

        try {
            await userAccount.clickLoginButton();
            await newUser.clickSignUpBtn();
            await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
            await newUser.inputEmail(user_email);
            await newUser.inputPassword(user_password);
            await newUser.confirmPassword(user_password);
            await newUser.clickSignUpButton();
            await expect(page.locator('#flashes')).toContainText('Welcome! You have signed up successfully.');
        } catch (error) {
        console.error(`Email already exist: ${error.message}`);
            await userAccount.RelogIn(user_password)
            await page.close();
    }
    })
})