import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pageobjects/HomePage";

type AppFixtures = {
  homePage: HomePage;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect };
