export class RegistrationForm {
  constructor(page) {
    this.page = page;
    this.registerFields = {
      name: page.locator('#signupName'),
      lastName: page.locator('#signupLastName'),
      email: page.getByRole('textbox', { name: 'Email' }),
      password: page.getByRole('textbox', { name: 'Password' }).first(),
      reEnterPassword: page.getByRole('textbox', { name: 'Password' }).last(),
      register: page.getByRole('button', { name: 'Register' }),
      nameError: page.locator(
        'div.form-group:has(#signupName) .invalid-feedback'
      ),
      passwordError: page.locator(
        'div.form-group:has(#signupPassword) .invalid-feedback'
      ),

      passwordErrorLast: page.locator(
        'div.form-group:has(#signupRepeatPassword) .invalid-feedback'
      ),
    };
  }

  async fillForm() {
    await this.registerFields.name.fill('Test');
    await this.registerFields.lastName.fill('Test');
    await this.registerFields.email.fill(`aqa-test+${Date.now()}@gmail.com`);
    await this.registerFields.password.fill('Aqa-test12');
    await this.registerFields.reEnterPassword.fill('Aqa-test12');
    await this.registerFields.register.click();
  }
}
