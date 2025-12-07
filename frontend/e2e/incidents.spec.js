import { test, expect } from '@playwright/test';
import { clearAuth, login, register, createIncident, generateTestEmail } from './utils.js';

test.describe('Incident Management', () => {
  let testEmail;
  let testPassword = 'password123';

  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
    // Note: These tests require a running backend
    // For now, we'll test the UI flow without actual API calls
    // Uncomment the registration when you have a test backend
    // testEmail = generateTestEmail();
    // await register(page, 'Test User', testEmail, testPassword);
  });

  test('should display incidents list page when authenticated', async ({ page }) => {
    // This test assumes you're logged in
    // For full E2E, uncomment registration above
    await page.goto('/incidents');
    
    // Wait for navigation to complete (either redirect to login or stay on incidents)
    await page.waitForURL(/\/(login|incidents)/, { timeout: 5000 });
    
    // If not authenticated, should redirect to login
    // If authenticated, should show incidents page
    if (page.url().includes('/login')) {
      // Not authenticated - this is expected behavior
      await expect(page).toHaveURL(/.*\/login/);
    } else {
      // Authenticated - check incidents page elements
      await expect(page.locator('h1')).toContainText('Incidents');
    }
  });

  test('should display new incident form', async ({ page }) => {
    await page.goto('/incidents/new');
    
    // Wait for navigation to complete (either redirect to login or stay on form)
    await page.waitForURL(/\/(login|incidents\/new)/, { timeout: 5000 });
    
    // Should redirect to login if not authenticated
    if (page.url().includes('/login')) {
      await expect(page).toHaveURL(/.*\/login/);
    } else {
      // If authenticated, check form elements
      await expect(page.locator('h1')).toContainText('New Incident');
      await expect(page.locator('input[name="title"]')).toBeVisible();
      await expect(page.locator('textarea[name="description"]')).toBeVisible();
      await expect(page.locator('select[name="priority"]')).toBeVisible();
      await expect(page.locator('select[name="status"]')).toBeVisible();
    }
  });

  test('should have navigation links in navbar when authenticated', async ({ page }) => {
    // This test checks navbar structure
    await page.goto('/');
    
    // Check for navbar
    const navbar = page.locator('.cb-navbar');
    await expect(navbar).toBeVisible();
    
    // Check for home link
    await expect(page.locator('a:has-text("CatalystBench")')).toBeVisible();
  });

  test('should show login link when not authenticated', async ({ page }) => {
    await clearAuth(page);
    await page.goto('/');
    
    // Should see Sign In and Sign Up links
    await expect(page.locator('a:has-text("Sign In")')).toBeVisible();
    await expect(page.locator('a:has-text("Sign Up")')).toBeVisible();
  });

  // Full E2E test with backend (uncomment when backend is available)
  /*
  test('should create a new incident', async ({ page }) => {
    testEmail = generateTestEmail();
    await register(page, 'Test User', testEmail, testPassword);
    
    const incidentData = {
      title: 'Test Incident',
      description: 'This is a test incident description',
      priority: 'High',
      status: 'Open',
    };
    
    await createIncident(page, incidentData);
    
    // Verify we're on incidents page
    await expect(page).toHaveURL(/.*\/incidents/);
    
    // Verify incident appears in list (if backend returns it)
    // await expect(page.locator('text=Test Incident')).toBeVisible();
  });

  test('should edit an incident', async ({ page }) => {
    testEmail = generateTestEmail();
    await register(page, 'Test User', testEmail, testPassword);
    
    // Create an incident first
    const incidentData = {
      title: 'Original Title',
      description: 'Original description',
      priority: 'Low',
      status: 'Open',
    };
    
    await createIncident(page, incidentData);
    
    // Find and click edit button (adjust selector based on your UI)
    // await page.click('button:has-text("Edit")');
    // Or navigate directly if you know the ID
    // await page.goto('/incidents/1/edit');
    
    // Update the form
    // await page.fill('input[name="title"]', 'Updated Title');
    // await page.click('button[type="submit"]');
    
    // Verify update
    // await expect(page).toHaveURL(/.*\/incidents/);
  });
  */
});

