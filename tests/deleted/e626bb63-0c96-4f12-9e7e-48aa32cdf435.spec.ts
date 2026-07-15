// Archived from tests/sf-automation/login-to-sf.spec.ts (test case e626bb63-0c96-4f12-9e7e-48aa32cdf435)
import { test, expect } from '@support/fixtures';


test('Home creations', { tag: ["@P1","@case-e626bb63-0c96-4f12-9e7e-48aa32cdf435"] }, async ({ page, homePage }) => {
  await test.step('Open — Application', async () => {
    await page.goto(env.baseURL);
  });

  await test.step('Click — Login field', async () => {
    await homePage.clickLoginField();
  });
});
