import { test, expect } from '@playwright/test';
import { WelcomePage } from '../pages/WelcomePage';
//import { BasePage } from './pages/BasePage';

let welcomePage;

test.beforeEach(async ({ page }) => {
  welcomePage = new WelcomePage(page);

  await welcomePage.open();

  await expect(welcomePage.welcomePage.RegisterButton).toBeVisible();

  await welcomePage.clickRegisterButton();

  await expect(page.locator('app-signup-modal')).toBeVisible();
});

test('Successful registration', async ({ page }) => {
  await welcomePage.fillRegistrationForm();
  await expect(page).toHaveURL(/garage/);
});

test('Empty field - Name is required', async () => {
  await expect(
    welcomePage.welcomePage.registerForm.registerFields.name
  ).toBeVisible();
  await welcomePage.welcomePage.registerForm.registerFields.name.focus();
  await welcomePage.welcomePage.registerForm.registerFields.name.press('Tab');
  await expect(
    welcomePage.welcomePage.registerForm.registerFields.nameError
  ).toContainText('Name required');
});

test('Wrong data - Password', async () => {
  await expect(
    welcomePage.welcomePage.registerForm.registerFields.password
  ).toBeVisible();
  await welcomePage.welcomePage.registerForm.registerFields.password
    .first()
    .focus();
  await welcomePage.welcomePage.registerForm.registerFields.password
    .first()
    .fill('Abcdefgh');
  await welcomePage.welcomePage.registerForm.registerFields.password
    .first()
    .press('Tab');
  await expect(
    welcomePage.welcomePage.registerForm.registerFields.passwordError
  ).toContainText(
    'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
  );
});

test('Passwords do not match', async () => {
  await expect(
    welcomePage.welcomePage.registerForm.registerFields.password
  ).toBeVisible();
  await welcomePage.welcomePage.registerForm.registerFields.password
    .first()
    .focus();
  await welcomePage.welcomePage.registerForm.registerFields.password
    .first()
    .fill('Abcdefghijk1234');
  await welcomePage.welcomePage.registerForm.registerFields.password
    .first()
    .press('Tab');
  await expect(
    welcomePage.welcomePage.registerForm.registerFields.reEnterPassword.last()
  ).toBeVisible();
  await welcomePage.welcomePage.registerForm.registerFields.reEnterPassword
    .last()
    .fill('Abcdefghijk5678');
  await welcomePage.welcomePage.registerForm.registerFields.reEnterPassword
    .last()
    .press('Tab');
  await expect(
    welcomePage.welcomePage.registerForm.registerFields.passwordErrorLast
  ).toContainText('Passwords do not match');
});

test('Cyrillic not alloswed', async () => {
  await expect(
    welcomePage.welcomePage.registerForm.registerFields.name
  ).toBeVisible();
  await welcomePage.welcomePage.registerForm.registerFields.name.focus();
  await expect(
    welcomePage.welcomePage.registerForm.registerFields.name
  ).toBeVisible();
  await welcomePage.welcomePage.registerForm.registerFields.name.fill(
    'Кирилиця'
  );
  await welcomePage.welcomePage.registerForm.registerFields.name.press('Tab');
  await expect(
    welcomePage.welcomePage.registerForm.registerFields.nameError
  ).toContainText('Name is invalid');
});

test('Wrong length < 2', async () => {
  await expect(
    welcomePage.welcomePage.registerForm.registerFields.lastName
  ).toBeVisible();
  await welcomePage.welcomePage.registerForm.registerFields.lastName.fill('Y');
  await welcomePage.welcomePage.registerForm.registerFields.lastName.press(
    'Tab'
  );
  const value =
    await welcomePage.welcomePage.registerForm.registerFields.lastName.inputValue();
  expect(value.length).toBeLessThan(2);
});

test('Wrong length > 20', async () => {
  await expect(
    welcomePage.welcomePage.registerForm.registerFields.lastName
  ).toBeVisible();
  await welcomePage.welcomePage.registerForm.registerFields.lastName.fill(
    'I'.repeat(21)
  );
  await welcomePage.welcomePage.registerForm.registerFields.lastName.press(
    'Tab'
  );
  const value =
    await welcomePage.welcomePage.registerForm.registerFields.lastName.inputValue();
  expect(value.length).toBeGreaterThan(20);
});
