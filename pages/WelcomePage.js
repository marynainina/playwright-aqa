import { RegistrationForm } from '../forms/RegistrationForm';
import { BasePage } from './BasePage';

class WelcomePageUIMap {
  constructor(page) {
    this.page = page;
    this.RegisterButton = page.getByRole('button', { name: 'Sign up' });
    this.registerForm = new RegistrationForm(page);
  }
}

export class WelcomePage extends BasePage {
  constructor(page) {
    super(page, '/');
    this.welcomePage = new WelcomePageUIMap(page);
  }

  async clickRegisterButton() {
    await this.welcomePage.RegisterButton.click();
  }
  async fillRegistrationForm() {
    await this.welcomePage.registerForm.fillForm();
  }
}
