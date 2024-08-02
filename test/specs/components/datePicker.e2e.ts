import loginPage from "../../pageobjects/CMS/Login/login.page";
import QALayoutPage from "../../pageobjects/CMS/Components/QALayoutPage.page";
import AdminContentPage from "../../pageobjects/CMS/Login/adminContent.page";
import datePickerPage from "../../pageobjects/CMS/Components/datePicker.page";
import { getEnvironmentConfig } from "../../../envSelector";
import * as fs from "fs";

describe("Date Picker Component Test", () => {
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
        const screenshotPath = `./screenshots/DatePicker/${testName}.png`;
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

    it("[S3C1426] Verify that the Date Picker Component can be integrated correctly", async () => {
        const id = `DatePicker-S3C1426-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnDatePicker).scrollIntoView();
        await (await QALayoutPage.btnDatePicker).click();
        await (await datePickerPage.configBlock).waitForDisplayed();
        await datePickerPage.createDatePickerComponent();
        await (await datePickerPage.inputDateField).waitForDisplayed();

        expect(await datePickerPage.inputDateField).toBeDisplayed();
        await (await datePickerPage.inputDateField).click();

        await (await datePickerPage.viewCalendar).waitForDisplayed();
        expect(await datePickerPage.viewCalendar).toBeDisplayed();
    });
});
