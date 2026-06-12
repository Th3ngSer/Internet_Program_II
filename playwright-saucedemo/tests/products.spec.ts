import { test, expect } from '@playwright/test';

// Challenge 2  test for sort by low to high  
test.describe('Sauce Demo Products Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the login page and log in
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
  
  // sort by low to high
  test('Sort products by price (low to high)', async ({ page }) => {
    // Change sort order to (Price: Low to High)
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');

    // Retrieve all prices on the page
    const prices = await page.locator('.inventory_item_price').allTextContents();
    
    // Parse prices from strings (e.g., "$7.99") to floating-point numbers
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
    
    // Ensure that there are items on the page
    expect(numericPrices.length).toBeGreaterThan(0);
    
    // Assert the first item price is indeed the minimum price
    const minPrice = Math.min(...numericPrices);
    expect(numericPrices[0]).toBe(minPrice);
  });

  // sort by high to low
  test('Sort products by price (high to low)', async ({ page }) => {
    // Change sort order to (Price: High to Low)
    await page.selectOption('[data-test="product-sort-container"]', 'hilo');

    // Retrieve all prices on the page
    const prices = await page.locator('.inventory_item_price').allTextContents();

    // Parse prices from strings (e.g., "$7.99") to floating-point numbers
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));

    // Ensure that there are items on the page
    expect(numericPrices.length).toBeGreaterThan(0);

    // Assert the first item price is indeed the maximum price
    const maxPrice = Math.max(...numericPrices);
    expect(numericPrices[0]).toBe(maxPrice);
  });
});
