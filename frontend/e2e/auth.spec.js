import { test, expect } from '@playwright/test';
import { clearAuth, login, register, generateTestEmail } from './utils.js';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
  });

  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h1')).toContainText('Login');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should display register page', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('h1')).toContainText('Register');
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('should navigate from login to register', async ({ page }) => {
    await page.goto('/login');
    await page.click('text=Register here');
    await expect(page).toHaveURL(/.*\/register/);
  });

  test('should navigate from register to login', async ({ page }) => {
    await page.goto('/register');
    await page.click('text=Login here');
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('should show error on invalid login', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Wait for error message
    await expect(page.locator('.error')).toBeVisible({ timeout: 5000 });
  });

  test('should redirect to login when accessing protected route without auth', async ({ page }) => {
    await page.goto('/incidents');
    // Should redirect to login or show login page
    await expect(page).toHaveURL(/.*\/login/);
  });

  // Note: These tests require a running backend with test data
  // Uncomment and adjust when you have a test backend running
  /*
  test('should successfully register new user', async ({ page }) => {
    const email = generateTestEmail();
    await register(page, 'Test User', email, 'password123');
    await expect(page).toHaveURL(/.*\/incidents/);
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // First register a user
    const email = generateTestEmail();
    await register(page, 'Test User', email, 'password123');
    await clearAuth(page);
    
    // Then login
    await login(page, email, 'password123');
    await expect(page).toHaveURL(/.*\/incidents/);
  });
  */
});

