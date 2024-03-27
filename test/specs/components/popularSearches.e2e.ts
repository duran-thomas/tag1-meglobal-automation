import adminContentPage from "../../pageobjects/CMS/Login/adminContent.page";
import { popularSearchData } from "../../data/popularSearch.data";
import { getEnvironmentConfig } from "../../../envSelector";
import popularSearchesPage from "../../pageobjects/CMS/Components/popularSearches.page";
const assert = require('assert');


describe.skip('Popular Searches Tests', () => {

  before(async ()=>{
    // Get the environment configuration
    const environment = getEnvironmentConfig(process.env.ENV);

    // Use the environment data
    const bypassURL = environment.bypassURL;
    const cookies = environment.cookies;

    //Bypass login
    await browser.url(await bypassURL);
    await browser.maximizeWindow();

    // Set user cookies
    await browser.setCookies(await cookies);
  });

  before(async function() {
    global.suiteDescription = this.currentTest?.parent?.title;
    //navigate to popular searches menu page
    await adminContentPage.openPopularSearches();
    await browser.pause(1000)
  })

  afterEach(async function() { 
    // Take a screenshot after each test/assertion
    const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
    const screenshotPath = `./screenshots/PopularSearches/${testName}.png`;
    await browser.saveScreenshot(screenshotPath);
  });

  after(async function () {
    await adminContentPage.openPopularSearches();
    await browser.pause(1000)
    await (await popularSearchesPage.btnLinkDropDown1).click()
    await (await popularSearchesPage.btnDeleteLink1).click()
    await (await popularSearchesPage.btnConfirmDelete).click();
    await expect(popularSearchesPage.successMsg).toBeDisplayed();
  });


  it('[S3C996] Verify admin can add a new popular search item', async () => {
      await popularSearchesPage.addNewMenuLink(popularSearchData.title, popularSearchData.link);
      await expect(popularSearchesPage.successMsg).toHaveTextContaining('The menu link has been saved.');
      await (await popularSearchesPage.btnSave).scrollIntoView();
      await (await popularSearchesPage.btnSave).click();
      await expect(popularSearchesPage.successMsg).toHaveTextContaining('Menu Popular Searches (All) has been updated.')

  })

  it('[S3C994] Verify that popular searches are displayed when the search box is clicked', async () => {
    await popularSearchesPage.addNewMenuLink(popularSearchData.title, popularSearchData.link);
    await expect(popularSearchesPage.successMsg).toHaveTextContaining('The menu link has been saved.');
    await (await popularSearchesPage.btnSave).scrollIntoView();
    await (await popularSearchesPage.btnSave).click();
    await expect(popularSearchesPage.successMsg).toHaveTextContaining('Menu Popular Searches (All) has been updated.')
    await browser.pause(2000);

    const environment = getEnvironmentConfig(process.env.ENV);
    const baseURL = environment.baseUrl;
    await browser.url(await baseURL);

    await (await popularSearchesPage.btnSearch).click()
    await expect(await popularSearchesPage.popularSearchResult(popularSearchData.title)).toHaveTextContaining(popularSearchData.title)
  })

  it('[S3C995] Verify that the search results are populated when a popular search term is clicked', async () => {
    await popularSearchesPage.addNewMenuLink(popularSearchData.title, popularSearchData.link);
    await expect(popularSearchesPage.successMsg).toHaveTextContaining('The menu link has been saved.');
    await (await popularSearchesPage.btnSave).scrollIntoView();
    await (await popularSearchesPage.btnSave).click();
    await expect(popularSearchesPage.successMsg).toHaveTextContaining('Menu Popular Searches (All) has been updated.')
    await browser.pause(2000);

    const environment = getEnvironmentConfig(process.env.ENV);
    const baseURL = environment.baseUrl;
    await browser.url(await baseURL);

    await browser.pause(2000);
    await (await popularSearchesPage.btnSearch).click()
    await (await popularSearchesPage.popularSearchResult(popularSearchData.title)).waitForExist();
    await (await popularSearchesPage.popularSearchResult(popularSearchData.title)).click();
    const searchResultTitle = await ($$('h4.mf-result-item__headline')[0]).getText()
    await expect(searchResultTitle).toContain(popularSearchData.title)
  })

  it('[S3C998] Verify admin can edit popular search item', async () => {
    await popularSearchesPage.addNewMenuLink(popularSearchData.title, popularSearchData.link);
    await expect(popularSearchesPage.successMsg).toHaveTextContaining('The menu link has been saved.');
    await (await popularSearchesPage.btnSave).scrollIntoView();
    await (await popularSearchesPage.btnSave).click();
    await expect(popularSearchesPage.successMsg).toHaveTextContaining('Menu Popular Searches (All) has been updated.')
    await browser.pause(2000);

    const environment = getEnvironmentConfig(process.env.ENV);
    const baseURL = environment.baseUrl;
    await browser.url(await baseURL);

    await (await popularSearchesPage.btnSearch).click()
    await expect(await popularSearchesPage.popularSearchResult(popularSearchData.title)).toHaveTextContaining(popularSearchData.title)
    await adminContentPage.openPopularSearches();
    await (await popularSearchesPage.btnEditLink1).click();
    await (await popularSearchesPage.inputMenuLinkTitle).setValue('Updated Pulmonary Link')
    await (await popularSearchesPage.btnSave).scrollIntoView()
    await (await popularSearchesPage.btnSave).click();
    await (await popularSearchesPage.btnSave).scrollIntoView();
    await (await popularSearchesPage.btnSave).click();
    await expect(popularSearchesPage.successMsg).toHaveTextContaining('Menu Popular Searches (All) has been updated.')
    await browser.pause(2000);

    await browser.url(await baseURL);

    await (await popularSearchesPage.btnSearch).click()
    await expect(await popularSearchesPage.popularSearchResult('Updated Pulmonary Link')).toHaveTextContaining('Updated Pulmonary Link')
  })

  it('[S3C1008] Verify enabling and disabling of Popular-Search item', async () => {
    await popularSearchesPage.addNewMenuLink(popularSearchData.title, popularSearchData.link);
    await expect(popularSearchesPage.successMsg).toHaveTextContaining('The menu link has been saved.');
    await (await popularSearchesPage.btnSave).scrollIntoView();
    await (await popularSearchesPage.btnSave).click();
    await expect(popularSearchesPage.successMsg).toHaveTextContaining('Menu Popular Searches (All) has been updated.')
    await browser.pause(2000);

    const environment = getEnvironmentConfig(process.env.ENV);
    const baseURL = environment.baseUrl;
    await browser.url(await baseURL);

    await (await popularSearchesPage.btnSearch).click()
    await expect(await popularSearchesPage.popularSearchResult(popularSearchData.title)).toHaveTextContaining(popularSearchData.title)
    await adminContentPage.openPopularSearches();
    await (await popularSearchesPage.checkboxEnabled1).click()
    await (await popularSearchesPage.btnSave).scrollIntoView();
    await (await popularSearchesPage.btnSave).click();
    await expect(popularSearchesPage.successMsg).toHaveTextContaining('Menu Popular Searches (All) has been updated.')
    await browser.url(await baseURL);
    await (await popularSearchesPage.btnSearch).click()
    const element = await $('a[data-analytics-click-text="Pulmonary"]');

    try {
      const exists = await element.isExisting();
      assert.ok(!exists, 'Element exists on the page. Test case should failed.');
      console.log('Element does not exist on the page. Test case should pass');
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  it('[S3C997] Verify admin can delete popular search item', async () => {
    await popularSearchesPage.addMultiMenuLink(popularSearchData.title, popularSearchData.link);
    await expect(popularSearchesPage.successMsg).toHaveTextContaining('The menu link has been saved.');
    await (await popularSearchesPage.btnSave).scrollIntoView();
    await (await popularSearchesPage.btnSave).click();
    await expect(popularSearchesPage.successMsg).toHaveTextContaining('Menu Popular Searches (All) has been updated.')
    await (await popularSearchesPage.btnLinkDropDown1).click()
    await (await popularSearchesPage.btnDeleteLink1).click()
    await (await popularSearchesPage.btnConfirmDelete).click();
    await expect(popularSearchesPage.successMsg).toHaveTextContaining(`The menu link 2nd ${popularSearchData.title} has been deleted.`)
})

})