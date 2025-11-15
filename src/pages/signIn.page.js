export class SignInPage {
    constructor(page) {
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signinButton = page.getByRole('button', { name: 'Login' });
    }
async signIn(authUser) {
    const { email, password } = authUser;
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.signinButton.click();
}
}