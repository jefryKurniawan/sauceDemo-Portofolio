// Smoke test: verify valid user can login successfully (positive test)
import { test, expect } from '@playwright/test';

test('Smoke: Login berhasil dengan standard_user', async ({ page }) => {
  // Buka halaman login (baseURL udah di-set di playwright.config.js)
  await page.goto('');
  
  // Isi credential pake akun valid (standard_user)
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');

  // Klik login button & wait navigasi
  await page.click('[data-test="login-button"]');
  
  // Assert 1: Pastikan URL berubah ke inventory.html (login success)
  await expect(page).toHaveURL(/inventory.html/);

  // Assert 2: Pastikan halaman produk load dengan title yang benar
  await expect(page.locator('.title')).toContainText('Products');
});