import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Login Tests', () => {
  
  // Before each test, go to the login page
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('Successful login with standard_user', async ({ page }) => {
    // Fill in username
    await page.fill('#user-name', 'standard_user');
    
    // Fill in password
    await page.fill('#password', 'secret_sauce');
    
    // Click login button
    await page.click('#login-button');
    
    // Verify successful login - should redirect to inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    // Verify inventory page loads correctly
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('Failed login with wrong password', async ({ page }) => {
    // Fill in username
    await page.fill('#user-name', 'standard_user');
    
    // Fill in WRONG password
    await page.fill('#password', 'wrong_password');
    
    // Click login button
    await page.click('#login-button');
    
    // Verify error message appears
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      'Username and password do not match any user in this service'
    );
    
    // Verify we're still on login page (not redirected)
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

//   Challenge 1 Locked User
  test('Failed login with locked_out_user', async ({ page }) => {
    // Fill in locked_out_user credentials
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Verify locked out error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      'Sorry, this user has been locked out.'
    );
  });

  test('Login with empty fields', async ({ page }) => {
    // Click login without entering anything
    await page.click('#login-button');
    
    // Verify error for missing username
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username is required');
  });

  test('login fails with wrong password', async ({ page }) => {

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match');
  });

//  Challenge 3 : Logout successfully  For testing purposes only - logout from inventory page 
  test('Logout successfully', async ({ page }) => {
    // Fill in standard_user credentials
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Open side menu
    await page.click('#react-burger-menu-btn');

    // Click logout
    await page.click('#logout_sidebar_link');

    // Assert login page is visible again
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();
  });
});