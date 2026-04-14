import { defineConfig, devices } from '@playwright/test';

// Custom device: iPhone 17 Pro (estimasi, karena belum rilis resmi)
const iPhone17Pro = {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  // isMobile: true,                      // Firefox doesn't support this!
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
};

// Main config: Playwright settings for SDET portfolio
export default defineConfig({
  // Folder lokasi file test
  testDir: './tests',
  
  // Folder output untuk screenshot, video, repor
  outputDir: './test-results',
  
  // Run test sequential (bukan parallel) => hemat RAM for potato laptop
  fullyParallel: false,
  
  // Fail CI build kalau ada test file yang "nyelip" (typo, unused)
  forbidOnly: !!process.env.CI,
  
  // Retry 1x kalau test gagal di CI (biar nggak false positive karena network lag)
  retries: process.env.CI ? 1 : 0,
  
  // Worker: 1 aja biar laptop nggak ngos-ngosan (hemat RAM & CPU)
  workers: 1,
  
  // Reporter: HTML bawaan Playwright (no Allure, simpel & cukup)
  reporter: [['html', { open: 'never' }]],
  
  
  // Default settings untuk semua test
  use: {
    // Base URL: jadi nggak perlu ketik full URL di setiap test
    baseURL: 'https://www.saucedemo.com',
    
    // Auto-screenshot cuma kalau test gagal (hemat storage)
    screenshot: 'only-on-failure',
    
    // Record video cuma kalau gagal + retry (hemat resource)
    video: 'retain-on-failure',
    
    // Trace: cuma record pas retry pertama
    trace: 'on-first-retry',
    
    // Timeout yang realistis buat koneksi Indonesia (jangan terlalu ketat)
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  // Browser config: Firefox only + iPhone 17 Pro viewport
  projects: [
    {
      name: 'firefox',
      use: {
        ...iPhone17Pro,
        browserName: 'firefox',
        
        // Locale & timezone (biar konsisten, nggak tergantung server location)
        locale: 'en-US',
        timezoneId: 'Asia/Jakarta',
        
        // Nonaktifkan download (fitur berat, nggak butuh untuk test ini)
        acceptDownloads: false,
      },
    },
  ],
});