// Security test: basic SQL injection attempt on login form
import { test, expect } from '@playwright/test';

test('Security: SQL injection attempt di login form', async ({ page }) => {
  // Buka halaman login
  await page.goto('');
  
  // Inject payload SQL injection klasik: ' OR '1'='1
  await page.fill('[data-test="username"]', "' OR '1'='1");
  await page.fill('[data-test="password"]', "anything");

  // Klik login & lihat apa yang terjadi
  await page.click('[data-test="login-button"]');
  
  // Assert 1: Pastikan tidak bisa login (harus tetap di login page / error)
  const url = page.url();
  expect(url).not.toMatch(/inventory.html/);
  
  // Assert 2: Pastikan muncul error message (aplikasi nolak dengan aman)
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  
  // Assert 3: Pastikan error message nggak bocor info sensitif (no SQL/database keywords)
  const errorMsg = await error.textContent();
  expect(errorMsg?.toLowerCase()).not.toContain('sql');
  expect(errorMsg?.toLowerCase()).not.toContain('database');
});