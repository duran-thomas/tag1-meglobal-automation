import LoginPage from "../../pageobjects/CMS/Login/login.page";
import AdminContentPage from "../../pageobjects/CMS/Login/adminContent.page";
import QALayoutPage from "../../pageobjects/CMS/Components/QALayoutPage.page";
import { getEnvironmentConfig } from "../../../envSelector";
import * as fs from "fs";
import findAnInvestigatorPage from "../../pageobjects/CMS/Components/findAnInvestigator.page";
import { FindAnInvestigatorBlockData } from "../../data/findAnInvestigator.data";

describe("Find an Investigator Component Test", () => {
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
        const screenshotPath = `./screenshots/FindAnInvestigator/${testName}.png`;
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

    it("[S3C1582] Verify that users can place a Find an Investigator Block", async () => {
        const id = `FindAnInvestigator-S3C1582-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnFindAnInvestigator).scrollIntoView();
        await (await QALayoutPage.btnFindAnInvestigator).click();
        await (await findAnInvestigatorPage.configBlock).waitForDisplayed();
        await findAnInvestigatorPage.createFindAnInvestigatorBlock();
        await QALayoutPage.goToPageView();
        expect(
            await $(`#${id} div.block-find-an-investigator`)
        ).toBeDisplayed();
    });

    it("[S3C1571] Verify that searching by name works for the Find an Investigator Component", async () => {
        const environment = getEnvironmentConfig(process.env.ENV);
        const baseUrl = environment.baseUrl;
        const id = `FindAnInvestigator-S3C1571-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnFindAnInvestigator).scrollIntoView();
        await (await QALayoutPage.btnFindAnInvestigator).click();
        await (await findAnInvestigatorPage.configBlock).waitForDisplayed();
        await findAnInvestigatorPage.createFindAnInvestigatorBlock();
        await QALayoutPage.goToPageView();
        expect(
            await $(`#${id} div.block-find-an-investigator`)
        ).toBeDisplayed();
        await (
            await findAnInvestigatorPage.inputSearchName
        ).setValue(FindAnInvestigatorBlockData.searchTerm);
        await (await findAnInvestigatorPage.btnSearchInvestigator(id)).click();
        await (
            await findAnInvestigatorPage.investigatorName
        ).waitForDisplayed();
        await expect(browser).toHaveUrl(
            `${baseUrl}cancer/researchers/?name=noah`
        );
        expect(await findAnInvestigatorPage.investigatorName).toHaveText(
            FindAnInvestigatorBlockData.resultName
        );
    });
});
