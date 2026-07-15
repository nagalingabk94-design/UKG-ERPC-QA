// Archived from tests/login-to-sf.spec.ts (test case 2ee6f249-3007-40cb-8f89-5bddb9105e9a)
import { test, expect } from '@support/fixtures';

  test('SF login', { tag: ["@P1","@case-2ee6f249-3007-40cb-8f89-5bddb9105e9a"] }, async ({ page, homePage }) => {
    await test.step('Open — Navigate to Salesforce Home', async () => {
      await page.goto(env.baseURL);
    });

    await test.step('Click — Account Name', async () => {
      await homePage.clickAccountName();
    });
  });
