import loginPage from "../../pageobjects/CMS/Login/login.page";
import AdminContentPage from "../../pageobjects/CMS/Login/adminContent.page";
import QALayoutPage from "../../pageobjects/CMS/Components/QALayoutPage.page";
import ShareBlockPage from "../../pageobjects/CMS/Components/share.page";
import { ShareBlockData } from "../../data/share.data";
import { getEnvironmentConfig } from "../../../envSelector";
import * as fs from "fs";

describe("Share Component Tests", () => {
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
        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getTestPage(global.suiteDescription);
        await expect(QALayoutPage.tabLayout).toBeDisplayed();
    });

    afterEach(async function () {
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, "_");
        const screenshotPath = `./screenshots/Share/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function () {
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        //await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
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

    it("[S3C1382] Verify that a Content Administrator can create a Social Share Component", async () => {
        const id = `Share-S3C1382-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnShare).scrollIntoView();
        await (await QALayoutPage.btnShare).click();
        await (await ShareBlockPage.configBlock).waitForDisplayed();
        await ShareBlockPage.createShareComponent(ShareBlockData.adminTitle);
        await QALayoutPage.goToPageView();
        expect(await ShareBlockPage.shareComponent).toBeDisplayed();
    });

    it("[S3C1987] Verify that a analytics for Social Share Component", async () => {
        const id = `Share-S3C1987-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnShare).scrollIntoView();
        await (await QALayoutPage.btnShare).click();
        await (await ShareBlockPage.configBlock).waitForDisplayed();
        await ShareBlockPage.createShareComponent(ShareBlockData.adminTitle);
        await QALayoutPage.goToPageView();
        expect(await ShareBlockPage.shareComponent).toBeDisplayed();

        const expectedAnalyticsData = [
            {
                clickText: "facebook",
                event: "e_navigationClick",
                navigationType: "share",
            },
        ];

        await $(`a[data-analytics-click-text="facebook"]`).click();

        const dataLayer = await browser.executeScript(
            "return window.dataLayer",
            []
        );
        const actualAnalyticsData = dataLayer.filter(
            (item) => item.event === "e_navigationClick"
        );

        fs.writeFile(
            "analyticsTestEvidence/share.json",
            JSON.stringify(dataLayer),
            (err) => {
                if (err) {
                    console.error(err);
                }
                // file written successfully
            }
        );

        await expect(actualAnalyticsData).toEqual(expectedAnalyticsData);
    });
});
