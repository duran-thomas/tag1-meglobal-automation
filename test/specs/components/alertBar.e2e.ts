import LoginPage from '../../pageobjects/CMS/Login/login.page'
import adminContentPage from '../../pageobjects/CMS/Login/adminContent.page'
import AlertBarBlockPage from '../../pageobjects/CMS/Components/alertBar.page'
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";

describe('Alert Bar Component Tests', () => {

  before(async ()=>{
    // Get the environment configuration
    const environment = getEnvironmentConfig(process.env.ENV);

    // Use the environment data
    const bypassURL = environment.bypassURL;
    const cookies = environment.admin;

    //Bypass login
    await browser.url(await bypassURL);
    await browser.maximizeWindow();

    // Set user cookies
    await browser.setCookies(await cookies);

  });

  afterEach(async function() { 
    // Take a screenshot after each test/assertion
    const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
    const screenshotPath = `./screenshots/AlertBar/${testName}.png`;
    await browser.saveScreenshot(screenshotPath);
  });

  it('[S3C1035] Verify that the Alert Bar is displayed correctly',async () => {
    const environment = getEnvironmentConfig(process.env.ENV);
    const baseUrl = environment.baseUrl;
    await browser.url(await baseUrl);
    //Verify that key elements of the alert bar is visible
    await expect(AlertBarBlockPage.alertBarIcon).toBeDisplayed()
    await expect(AlertBarBlockPage.alertBarText).toBeDisplayed()
    await expect(AlertBarBlockPage.alertBarCloseIcon).toBeDisplayed()

    //Verify that the icon appears to the left of the alertbar 
    const iconRightPosition: number = ((await (await AlertBarBlockPage.alertBarIcon).getLocation()).x)+ (await ((await AlertBarBlockPage.alertBarIcon).getSize())).width;
    const textPosition: number = (await (await AlertBarBlockPage.alertBarText).getLocation()).x;
    const iconLeftPosition: number = (await (await AlertBarBlockPage.alertBarIcon).getLocation()).x;
    //Compare the positions of the Icon and Text
    await (expect (iconRightPosition).toBeLessThan(textPosition))

    const menuPosition: number = (await (await $('button[data-analytics-click-text="Menu"]')).getLocation()).x
    //Comparing the x-coordinate of the left side icon to the x-coordinate fo the left side of the menu
    await (expect (menuPosition).toBeLessThan(iconLeftPosition))
  })

  it('[S3C1032] Verify that an Administrator can configure the Alert bar to display above or within the Header Navigation', async () => {
    const environment = getEnvironmentConfig(process.env.ENV);
    const baseUrl = environment.baseUrl;
    await adminContentPage.open()
    await browser.url(await baseUrl + 'admin/structure/block/manage/navigation?destination=/admin/structure/block');
    await (await AlertBarBlockPage.checkboxEmbedAlertInNavigation).scrollIntoView()
    await (await AlertBarBlockPage.checkboxEmbedAlertInNavigation).click()
    await (await AlertBarBlockPage.btnSave).click()
    await browser.url(await baseUrl)
    await (await AlertBarBlockPage.navTopBar).waitForDisplayed()
    await (await AlertBarBlockPage.alertBar).waitForDisplayed()
    // Gets the location of the top bar
    const topBarRectangle = await (await AlertBarBlockPage.navTopBar).getLocation()
    // Gets the location of the alert bar
    const alertBarRectangle = await (await AlertBarBlockPage.alertBar).getLocation()
    // Compares the y coordinate of the alert bar to the y coordinate of the top bar
    await (expect (alertBarRectangle.y).toBeGreaterThan(topBarRectangle.y))
  });

  it("[S3C1036] Verify that the Alert Bar's close functionality works as expected when the message is updated", async () => {
    const environment = getEnvironmentConfig(process.env.ENV);
    const baseUrl = environment.baseUrl;
    await (await AlertBarBlockPage.alertBar).waitForDisplayed();
    // Close alert bar
    await (await AlertBarBlockPage.alertBarCloseIcon).click();
    await browser.refresh();
    await browser.pause(1000);
    // Check if alert bar is present after refresh
    await expect(await AlertBarBlockPage.alertBar).not.toBeDisplayed();
    await adminContentPage.open()
    await browser.url(await baseUrl + 'admin/config/dap/alert-bar/translate');
    await (await AlertBarBlockPage.btnEditEnglishTranslate).click()
    await (await AlertBarBlockPage.inputAlertBarText).waitForDisplayed()
    await browser.pause(1000)
    // Update alert bar message text
    await (await AlertBarBlockPage.inputAlertBarText).setValue('Updated QA Alert Bar Message')
    await (await AlertBarBlockPage.btnSaveConfig).click()
    await browser.url(await baseUrl);
    await expect(await AlertBarBlockPage.alertBar).toBeDisplayed();
  });
});