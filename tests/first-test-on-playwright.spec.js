import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();

  await page.getByRole('button', { name: 'Sign up' }).click();

  await expect(page.locator('app-signup-modal')).toBeVisible();
});

test('Successful registration', async ({ page }) => {
  const registrationForm = {
    name: page.locator('#signupName'),
    lastName: page.locator('#signupLastName'),
    email: page.getByRole('textbox', { name: 'Email' }),
    password: page.getByRole('textbox', { name: 'Password' }).first(),
    reEnterPassword: page.getByRole('textbox', { name: 'Password' }).last(),
    register: page.getByRole('button', { name: 'Register' }),
  };
  await registrationForm.name.fill('Test');
  await registrationForm.lastName.fill('Test');
  await registrationForm.email.fill(`aqa-test+${Date.now()}@gmail.com`);
  await registrationForm.password.fill('Aqa-test12');
  await registrationForm.reEnterPassword.fill('Aqa-test12');
  await registrationForm.register.click();
});

test('Empty field - Name is required', async ({ page }) => {
  await expect(page.locator('#signupName')).toBeVisible();
  await page.locator('#signupName').focus();
  await page.locator('#signupName').press('Tab');
  await expect(page.locator('.invalid-feedback')).toContainText(
    'Name required'
  );
});

test('Wrong data - Password', async ({ page }) => {
  await expect(
    page.getByRole('textbox', { name: 'Password' }).first()
  ).toBeVisible();
  await page.getByRole('textbox', { name: 'Password' }).first().focus();
  await page
    .getByRole('textbox', { name: 'Password' })
    .first()
    .fill('Abcdefgh');
  await page.getByRole('textbox', { name: 'Password' }).first().press('Tab');
  await expect(page.locator('.invalid-feedback')).toContainText(
    'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
  );
});

test('Passwords do not match', async ({ page }) => {
  await expect(
    page.getByRole('textbox', { name: 'Password' }).first()
  ).toBeVisible();
  await page.getByRole('textbox', { name: 'Password' }).first().focus();
  await page
    .getByRole('textbox', { name: 'Password' })
    .first()
    .fill('Abcdefghijk1234');
  await page.getByRole('textbox', { name: 'Password' }).first().press('Tab');
  await expect(
    page.getByRole('textbox', { name: 'Password' }).last()
  ).toBeVisible();
  await page
    .getByRole('textbox', { name: 'Password' })
    .last()
    .fill('Abcdefghijk5678');
  await page.getByRole('textbox', { name: 'Password' }).last().press('Tab');
  await expect(page.locator('.invalid-feedback')).toContainText(
    'Passwords do not match'
  );
});

test('Cyrillic not alloswed', async ({ page }) => {
  await expect(page.locator('#signupName')).toBeVisible();
  await page.locator('#signupName').focus();
  await expect(page.locator('#signupName')).toBeVisible();
  await page.locator('#signupName').fill('Кирилиця');
  await page.locator('#signupName').press('Tab');
  await expect(page.locator('.invalid-feedback')).toContainText(
    'Name is invalid'
  );
});

test('Wrong length < 2', async ({ page }) => {
  await expect(page.locator('#signupLastName')).toBeVisible();
  await page.locator('#signupLastName').fill('Y');
  await page.locator('#signupLastName').press('Tab');
  const value = await page.locator('#signupLastName').inputValue();
  expect(value.length).toBeLessThan(2);
});

test('Wrong length > 20', async ({ page }) => {
  await expect(page.locator('#signupLastName')).toBeVisible();
  await page.locator('#signupLastName').fill('I'.repeat(21));
  await page.locator('#signupLastName').press('Tab');
  const value = await page.locator('#signupLastName').inputValue();
  expect(value.length).toBeGreaterThan(20);
});
