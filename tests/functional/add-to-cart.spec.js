import { test, expect } from '@playwright/test';

// Functional test: add item to cart
test('Functional: Tambah Sauce Labs Backpack ke cart', async ({ page }) => {
  // Buka halaman login (baseURL udah di-set di config, jadi tinggal '')
  await page.goto('');

  // Isi creds akun test (standard_user)
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');

  // Klik login & wait sampe masuk ke product page
  await page.click('[data-test="login-button"]');
  
  // Langsung klik 'Add to Cart' di produk pertama
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  
  // Assert: cart badge harusnya update jadi '1'
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});