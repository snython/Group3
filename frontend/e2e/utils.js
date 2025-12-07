/**
 * Test utilities and helpers for E2E tests
 */

/**
 * Clear localStorage and cookies before each test
 */
export async function clearAuth(page) {
  // Navigate to a page first to establish a valid origin context
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.context().clearCookies();
}

/**
 * Login helper function
 */
export async function login(page, email, password) {
  await page.goto('/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  // Wait for navigation after login
  await page.waitForURL('**/incidents', { timeout: 5000 });
}

/**
 * Register helper function
 */
export async function register(page, name, email, password) {
  await page.goto('/register');
  await page.fill('input[name="name"]', name);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  // Wait for navigation after registration
  await page.waitForURL('**/incidents', { timeout: 5000 });
}

/**
 * Create an incident helper function
 */
export async function createIncident(page, incidentData) {
  await page.goto('/incidents/new');
  await page.fill('input[name="title"]', incidentData.title);
  await page.fill('textarea[name="description"]', incidentData.description);
  await page.selectOption('select[name="priority"]', incidentData.priority || 'Low');
  await page.selectOption('select[name="status"]', incidentData.status || 'Open');
  if (incidentData.assignedTo) {
    await page.fill('input[name="assignedTo"]', incidentData.assignedTo);
  }
  await page.click('button[type="submit"]');
  // Wait for navigation back to incidents list
  await page.waitForURL('**/incidents', { timeout: 5000 });
}

/**
 * Generate a unique email for testing
 */
export function generateTestEmail() {
  return `test-${Date.now()}@example.com`;
}

