function generateRandomEmail() {
    const random = Math.random().toString(36).substring(2, 10);
    return `Test_User_${random}@gmail.com`;
}


class SignUpPage {
    constructor(page) {
        this.page = page;

    }

    async clickSignUpBtn() {
        console.log("Clicking the 'Sign Up' Button...");
        await this.page.getByRole('link', { name: 'Sign Up' }).click();
    }
    
    async inputEmail(user_email) {
        console.log("Input's Email Address...")
        await this.page.getByRole('textbox', { name: 'Email', exact: true }).fill(user_email);
    }
    
    async inputPassword(user_password) {
        console.log("Input's Password...")
        await this.page.getByRole('textbox', { name: 'Password', exact: true }).fill(user_password);
    }

    async confirmPassword(user_password) {
        console.log("Re-enter Password...")
        await this.page.getByRole('textbox', { name: 'Password Confirmation' }).fill(user_password);
    }
    
    async clickSignUpButton() {
        console.log("Clicking the 'Sign Up' Button...")
        await this.page.getByRole('button', { name: 'Sign Up' }).click();
    }

}

module.exports = SignUpPage;
