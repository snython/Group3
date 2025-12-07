import { test, expect } from '@playwright/test';
import { clearAuth } from './utils.js';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
  });

  test('should navigate to home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/$/);
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.locator('h1')).toContainText('Login');
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/register');
    await expect(page).toHaveURL(/.*\/register/);
    await expect(page.locator('h1')).toContainText('Register');
  });

  test('should redirect to login when accessing protected route', async ({ page }) => {
    await page.goto('/incidents');
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('should redirect to login when accessing profile', async ({ page }) => {
    await page.goto('/profile');
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('should have working navbar links', async ({ page }) => {
    await page.goto('/');
    
    // Check navbar is visible
    const navbar = page.locator('.cb-navbar');
    await expect(navbar).toBeVisible();
    
    // Check logo link
    const logo = page.locator('a:has-text("CatalystBench")');
    await expect(logo).toBeVisible();
    await logo.click();
    await expect(page).toHaveURL(/.*\/$/);
    
    // Check Sign In link
    await page.goto('/');
    const signInLink = page.locator('a:has-text("Sign In")');
    await expect(signInLink).toBeVisible();
    await signInLink.click();
    await expect(page).toHaveURL(/.*\/login/);
    
    // Check Sign Up link
    await page.goto('/');
    const signUpLink = page.locator('a:has-text("Sign Up")');
    await expect(signUpLink).toBeVisible();
    await signUpLink.click();
    await expect(page).toHaveURL(/.*\/register/);
  });
});

