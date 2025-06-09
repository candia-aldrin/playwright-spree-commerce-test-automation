class LoginButton {
    constructor(page) {
        this.page = page;

    }

    async clickLoginButton() {
        console.log("Clicking the 'Login Button'...");
        await this.page.getByRole('navigation', { name: 'Top' }).getByRole('button').nth(2).click();
    }

    async loginAccount(user_email, user_password) {
        console.log("Login User Account...")
        await this.page.getByRole('textbox', { name: 'Email', exact: true }).click();
        await this.page.getByRole('textbox', { name: 'Email', exact: true }).fill(user_email);
        await this.page.getByRole('textbox', { name: 'Password' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill(user_password);
        await this.page.getByRole('button', { name: 'Login' }).click();
        
    }

    async RelogIn(user_password) {
        console.log("Logining In...");
        await this.page.getByRole('link', { name: 'Login' }).click();
        await this.page.locator('form').filter({ hasText: 'Email Password Remember me' }).locator('#user_email').fill(user_password);
        await this.page.locator('form').filter({ hasText: 'Email Password Remember me' }).locator('#user_password').fill(user_password);
        await this.page.getByRole('button', { name: 'Login' }).click();

    }

}

module.exports = LoginButton;