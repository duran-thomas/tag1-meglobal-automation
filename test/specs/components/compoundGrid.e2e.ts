import LoginPage from "../../pageobjects/CMS/Login/login.page";
import AdminContentPage from "../../pageobjects/CMS/Login/adminContent.page";
import CompoundGridPage from "../../pageobjects/CMS/Components/compoundGrid.page";
import { CompoundGridBlockData } from "../../data/compoundGrid.data";
import QALayoutPage from "../../pageobjects/CMS/Components/QALayoutPage.page";
import { getEnvironmentConfig } from "../../../envSelector";
import * as fs from "fs";

describe("Compound Grid Component Tests", () => {
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
        const screenshotPath = `./screenshots/CompoundGrid/${testName}.png`;
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

    it("[S3C2007] Verify that Analytics for the Compound Grid Component is configured", async () => {
        await CompoundGridPage.navToComponentTesting();
        await (await CompoundGridPage.compoundGridLayout).scrollIntoView();
        await (await CompoundGridPage.firstCompoundGridImage).click();

        const expectedAnalyticsData = [
            {
                clickText: "photo-1.png.webp",
                componentType: "compound grid > card > media image",
                event: "e_componentClick",
                itemTitle:
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
                linkType: "image",
            },
        ];

        const dataLayer = await browser.executeScript(
            "return window.dataLayer",
            []
        );
        const actualAnalyticsData = dataLayer.filter(
            (item) => item.event === "e_componentClick"
        );

        const parsedActualAnalyticsData = [
            {
                clickText: actualAnalyticsData[0].clickText,
                componentType: actualAnalyticsData[0].componentType,
                event: actualAnalyticsData[0].event,
                itemTitle: actualAnalyticsData[0].itemTitle,
                linkType: actualAnalyticsData[0].linkType,
            },
        ];

        fs.writeFile(
            "analyticsTestEvidence/compoundGrid.json",
            JSON.stringify(dataLayer),
            (err) => {
                if (err) {
                    console.error(err);
                }
                // file written successfully
            }
        );

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);
    });

    it.only("[S3C2093] Verify that a Content Administrator can create a Compound Grid Component", async () => {
        const id = `CompoundGrid-S3C2093-${Date.now()}`;
        const imageFilePath = await browser.uploadFile(
            "scriptFiles/sampleImg2.jpg"
        );
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCompoundGrid).scrollIntoView();
        await (await QALayoutPage.btnCompoundGrid).click();
        await (await CompoundGridPage.configBlock).waitForDisplayed();
        await browser.waitForCustomFrame(
            'iframe[name="lbim-dialog-iframe"]',
            5000
        );
        await (
            await CompoundGridPage.inputAdminTitle
        ).setValue(CompoundGridBlockData.adminTitle);
        await CompoundGridPage.createFirstParagraph(
            CompoundGridBlockData.headline,
            CompoundGridBlockData.eyebrow,
            CompoundGridBlockData.content,
            imageFilePath,
            CompoundGridBlockData.altText
        );

        expect(
            await $(`#${id} div.block-inline-blockcompound-grid`)
        ).toBeDisplayed();
    });
});
