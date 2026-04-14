// Regression test: complete checkout flow (login => add to cart => checkout => success)
import { test, expect } from '@playwright/test';

test('Regression: Checkout flow lengkap', async ({ page }) => {
  // Step 1: Login pake akun standard_user
  await page.goto('');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  
  // Step 2: Tambah 1 item ke cart (Sauce Labs Backpack)
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  
  // Step 3: Navigate ke cart => mulai checkout process
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  
  // Step 4: Isi form shipping info
  await page.fill('[data-test="firstName"]', 'Budi');
  await page.fill('[data-test="lastName"]', 'Santoso');
  await page.fill('[data-test="postalCode"]', '57112');
  await page.click('[data-test="continue"]');
  
  // Step 5: Klik Finish buat complete order
  await page.click('[data-test="finish"]');
  
  // Assert: Pastikan user landing di halaman success dengan title yang benar
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
});