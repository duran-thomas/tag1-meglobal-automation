import LoginPage from "../../pageobjects/CMS/Login/login.page";
import AdminContentPage from "../../pageobjects/CMS/Login/adminContent.page";
import HHSBlockPage from "../../pageobjects/CMS/Components/hhs.page";
import QALayoutPage from "../../pageobjects/CMS/Components/QALayoutPage.page";
import { getEnvironmentConfig } from "../../../envSelector";
import * as fs from "fs";
import { hhsBockData } from "../../data/hhs.data";
import hhsPage from "../../pageobjects/CMS/Components/hhs.page";

describe("HHS Component Test", () => {
    before(async () => {
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

    before(async function () {
        global.suiteDescription = this.currentTest?.parent?.title;
        //navigate to admin content page
        await AdminContentPage.open();
        //await AdminContentPage.closeCookieBanner();
        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getTestPage(global.suiteDescription);
        await expect(QALayoutPage.tabLayout).toBeDisplayed();
    });

    afterEach(async function () {
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, "_");
        const screenshotPath = `./screenshots/HHS/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete page
    after(async function () {
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);
        //await browser.url(environment.baseUrl+'user/logout');
        await browser.setCookies(environment.admin);
        await AdminContentPage.open();
        await AdminContentPage.deleteTestPage(global.suiteDescription);
        await expect($(".mf-alert__container--highlight")).toBeDisplayed();
    });

    it("[S3C2012] Verify that a Content Administrator can create an HHS Embedded Content Component", async () => {
        const id = `HHS-S3C2012-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();

        await (await QALayoutPage.btnHHS).scrollIntoView();
        await (await QALayoutPage.btnHHS).click();
        await (await HHSBlockPage.configBlock).waitForDisplayed();
        await HHSBlockPage.createHHSComponent(hhsBockData.id);
        expect(await `#${id}`).toBeDisplayed();
    });

    it("[S3C1563] Verify that images are being displayed for HHS pages", async () => {
        const id = `HHS-S3C1563-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();

        await (await QALayoutPage.btnHHS).scrollIntoView();
        await (await QALayoutPage.btnHHS).click();
        await (await HHSBlockPage.configBlock).waitForDisplayed();
        await HHSBlockPage.createHHSComponent(hhsBockData.id);
        expect(await `#${id}`).toBeDisplayed();
        expect(await hhsPage.imgHeart(id)).toBeDisplayed();
    });
});
