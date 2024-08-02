import LoginPage from "../../pageobjects/CMS/Login/login.page";
import AdminContentPage from "../../pageobjects/CMS/Login/adminContent.page";
import { ImageGalleryBlockData } from "../../data/imageGallery.data";
import imageGalleryPage from "../../pageobjects/CMS/Components/imageGallery.page";
import QALayoutPage from "../../pageobjects/CMS/Components/QALayoutPage.page";
import { getEnvironmentConfig } from "../../../envSelector";
import * as fs from "fs";

describe("Image Gallery Component Test", () => {
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
        const screenshotPath = `./screenshots/ImageGallery/${testName}.png`;
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

    it("[S3C1390] Verify that the Image Gallery supports Videos", async () => {
        const id = `ImageGallery-S3C1390-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnImageGallery).scrollIntoView();
        await (await QALayoutPage.btnImageGallery).click();
        await (await imageGalleryPage.configBlock).waitForDisplayed();
        await browser.waitForCustomFrame(
            'iframe[name="lbim-dialog-iframe"]',
            5000
        );
        // Switch to iframe for image gallery options
        await browser.waitForCustomFrame(
            "#entity_browser_iframe_image_browser",
            5000
        );
        // Verify that the image upload option is present
        expect(
            await $("#edit-field-image summary[role='button']")
        ).toBeDisplayed();
        // Verify that a required marker is present for the image upload option
        expect(
            await $("#edit-inline-entity-form-field-media-image-0--label")
        ).toHaveAttribute("class", "form-required");

        // Verify that the video upload option is present
        expect(
            await $("#edit-field-video summary[role='button']")
        ).toBeDisplayed();
        // Verify that the required marker is not present for the video upload option
        expect(
            await $("#edit-field-video summary[role='button'] span")
        ).not.toHaveAttribute("class", "form-required");
    });
});
