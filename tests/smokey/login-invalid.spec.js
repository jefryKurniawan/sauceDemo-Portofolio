// Smoke test: verify locked out user cannot login (negative test)
import { test, expect } from '@playwright/test';

test('Smoke: Login gagal dengan locked_out_user', async ({ page }) => {
  // Buka halaman login (baseURL udah di-set di config)
  await page.goto('');
  
  // Coba login pake akun yang status-nya "locked out"
  // Username: locked_out_user (memang didesain gagal di SauceDemo)
  await page.fill('[data-test="username"]', 'locked_out_user');
  await page.fill('[data-test="password"]', 'secret_sauce');

  // Klik login & tunggu response
  await page.click('[data-test="login-button"]');
  
  // Assert: Pastikan muncul error message yang sesuai
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out');
});