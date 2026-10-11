import {expect, test} from '@playwright/test';

const routes = ['/', '/articles', '/guides', '/about'];

for (const route of routes) {
  test(`${route} renders without browser errors`, async ({page}) => {
    const pageErrors: string[] = [];
    page.on('pageerror', error => pageErrors.push(error.message));

    const response = await page.goto(route);

    expect(response?.status()).toBe(200);
    await expect(page.locator('main')).toBeVisible();
    expect(pageErrors).toEqual([]);
  });
}