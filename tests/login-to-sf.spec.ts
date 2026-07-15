import { test, expect } from '@support/fixtures';
import env from '@support/env';

  test("Open 'Home creations' via Accounts tab and Search This List", { tag: ["@functional","@regression","@P0","@case-cf33bf88-67ac-4dd0-a773-609e358aa40e"] }, async ({ page, homePage }) => {
    await test.step('Open — Navigate to Salesforce Home', async () => {
      await page.goto(env.baseURL);
    });

    await test.step('Assert visible — Verify Home is visible', async () => {
      await homePage.expectHomeVisible();
    });

    await test.step('Click — Open Accounts from nav', async () => {
      await homePage.clickAccounts();
    });

    await test.step('Assert visible — Verify Accounts page loaded', async () => {
      await homePage.expectAccountsVisible();
    });

    await test.step('Assert visible — Verify Accounts list is visible', async () => {
      await homePage.expectAccountsListVisible();
    });

    await test.step('Assert visible — Verify \"Search this list\" input is visible', async () => {
      await homePage.expectSearchThisListVisible();
    });

    await test.step('Fill — Enter account name in \"Search this list\"', async () => {
      await homePage.fillSearchThisList(testData.openHomeCreationsViaAccountsTabAndSearchThisList.enterAccountNameInSearchThisList);
    });

    await test.step('Wait — Wait for filtered list to update', async () => {
      await homePage.expectAccountsListVisible();
    });

    await test.step("Click — Open account link 'Home creations'", async () => {
      const name = testData.openHomeCreationsViaAccountsTabAndSearchThisList.enterAccountNameInSearchThisList;
      await homePage.clickSldsTable1TableLink(name);
    });

    await test.step("Assert visible — Verify account record header shows 'Home creations'", async () => {
      const name = testData.openHomeCreationsViaAccountsTabAndSearchThisList.enterAccountNameInSearchThisList;
      await expect(page).toHaveTitle(new RegExp(name, 'i'));
    });
  });


  test("Open 'Home creations' via Global Search", { tag: ["@functional","@regression","@P1","@case-025bca9c-51b0-4b17-bd9c-9a5ee4253cce"] }, async ({ page, homePage }) => {
    await test.step('Open — Navigate to Salesforce Home', async () => {
      await page.goto(env.baseURL);
    });

    await test.step('Click — Open global search', async () => {
      await homePage.clickSearch();
    });

    await test.step('Assert visible — Verify global search is visible', async () => {
      await homePage.expectSearchVisible();
    });

    await test.step("Type — Type 'Home creations' and submit in global search", async () => {
      const query = testData.openHomeCreationsViaGlobalSearch.typeHomeCreationsAndSubmitInGlobalSearch;
      await page.keyboard.type(query);
    });

    await test.step('Wait — Wait for search results to load', async () => {
      await homePage.expectSearchVisible();
    });

    await test.step("Click — Open 'Home creations' from search results", async () => {
      const recordName = testData.openHomeCreationsViaGlobalSearch.typeHomeCreationsAndSubmitInGlobalSearch.replace('{Enter}', '');
      await homePage.clickSldsTable1TableLink(recordName);
    });

    await test.step("Assert visible — Verify account record header shows 'Home creations'", async () => {
      const recordName = testData.openHomeCreationsViaGlobalSearch.typeHomeCreationsAndSubmitInGlobalSearch.replace('{Enter}', '');
      await expect(page).toHaveTitle(new RegExp(recordName, 'i'));
    });
  });


  test("Open 'Home creations' via Home page Recent Records", { tag: ["@functional","@regression","@P2","@case-99d0d056-788d-4dd9-8bbc-43ba38da2013"] }, async ({ page, homePage }) => {
    await test.step('Open — Navigate to Salesforce Home', async () => {
      await page.goto(env.baseURL);
    });

    await test.step('Assert visible — Verify Home is visible', async () => {
      await homePage.expectHomeVisible();
    });

    await test.step("Click — Click 'View All Recent Records'", async () => {
      await homePage.clickViewAllRecentRecords();
    });

    await test.step('Wait — Wait for recent records list to render', async () => {
      await homePage.expectAccountsListVisible();
    });

    await test.step("Click — Open account 'Home creations' from recent records", async () => {
      const name = testData.openHomeCreationsViaAccountsTabAndSearchThisList.enterAccountNameInSearchThisList;
      await homePage.clickSldsTable1TableLink(name);
    });

    await test.step("Assert visible — Verify account record header shows 'Home creations'", async () => {
      const name = testData.openHomeCreationsViaAccountsTabAndSearchThisList.enterAccountNameInSearchThisList;
      await expect(page).toHaveTitle(new RegExp(name, 'i'));
    });
  });


  test('SF login', { tag: ["@P1","@case-2ee6f249-3007-40cb-8f89-5bddb9105e9a"] }, async ({ page, homePage }) => {
    await test.step('Open — Navigate to Salesforce Home', async () => {
      await page.goto(env.baseURL);
    });

    await test.step('Click — Account Name', async () => {
      await homePage.clickAccountName();
    });
  });
