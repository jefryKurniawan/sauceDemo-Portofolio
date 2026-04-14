// Functional test: remove item from cart flow
import { test, expect } from '@playwright/test';

test('Functional: Hapus barang dari cart', async ({ page }) => {
   // Login dulu pake akun standard_user
  await page.goto('');
  // Input username & password
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');

  // Gas login
  await page.click('[data-test="login-button"]');

  // Tambah 1 item ke cart (backpack)
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  
  // Navigasi ke halaman cart
  await page.click('.shopping_cart_link');
  
  // Klik tombol Remove buat hapus item
  await page.click('[data-test="remove-sauce-labs-backpack"]');
  
  // Assert: cart badge harus hilang (artinya cart kosong)
  await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
});