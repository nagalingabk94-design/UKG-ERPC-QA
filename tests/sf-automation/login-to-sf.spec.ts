import { test, expect } from '@support/fixtures';
import env from '@support/env';


test('login', { tag: ["@P1","@case-d7bb7bf0-13d1-4feb-a5af-89bfa1a61c8d"] }, async ({ page, homePage }) => {
  await test.step('Before — open SF URL', async () => {
    await page.goto(env.baseURL);
  });

  await test.step('Before — verify if home page is displayed search on global search field for Home Creations', async () => {
    await page.goto(env.baseURL);
  });

  await test.step('Before — verify if account axists', async () => {
    await page.goto(env.baseURL);
  });

  await test.step('Click — Login', async () => {
    await homePage.clickLoginField();
  });
});
