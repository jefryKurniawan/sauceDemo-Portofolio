// Regression test: cancel checkout flow & verify back to cart
import { test, expect } from '@playwright/test';

test('Regression: Batalkan checkout, kembali ke cart', async ({ page }) => {
  // Setup: Login pake akun standard_user
  await page.goto('');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Tambah item ke cart (backpack)
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Navigate ke cart page → mulai checkout flow
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  
  // Action: Klik Cancel buat batalin checkout
  await page.click('[data-test="cancel"]');
  
  // Assert: Pastikan user balik ke halaman cart (bukan error / redirect aneh)
  await expect(page).toHaveURL(/cart.html/);
  await expect(page.locator('.title')).toHaveText('Your Cart');
});