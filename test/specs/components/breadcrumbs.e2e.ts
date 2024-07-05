import LoginPage from "../../pageobjects/CMS/Login/login.page";
import AdminContentPage from "../../pageobjects/CMS/Login/adminContent.page";
import BreadcrumbsBlockPage from "../../pageobjects/CMS/Components/breadcrumbs.page";
import QALayoutPage from "../../pageobjects/CMS/Components/QALayoutPage.page";
import { getEnvironmentConfig } from "../../../envSelector";
import { breadcrumbsBlockData } from "../../data/breadcrumbs.data";
import * as fs from "fs";

describe("Breadcrumbs Component Tests", () => {
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
        const screenshotPath = `./screenshots/Breadcrumbs/${testName}.png`;
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

    it("[S3C1831] Verify that Breadcrumbs are present when a layout page is created", async () => {
        await expect(BreadcrumbsBlockPage.breadcrumbElement).toBeExisting();
    });

    it("[S3C1832] Verify that Breadcrumbs can be removed", async () => {
        await (await QALayoutPage.tabLayout).click();
        await (
            await BreadcrumbsBlockPage.breadcrumbElement
        ).scrollIntoView({ behavior: "auto" });

        await BreadcrumbsBlockPage.removeBreadcrumb();

        await expect(BreadcrumbsBlockPage.breadcrumbElement).not.toBeExisting();
    });

    it("[S3C1832] Verify that Breadcrumbs are accurate and work as expected", async () => {
        await BreadcrumbsBlockPage.openPage();

        await (await BreadcrumbsBlockPage.linkClinicalServices).click();
        let url = await browser.getUrl();
        await expect(await url).toContain(breadcrumbsBlockData.clinicalUrl);

        await (await BreadcrumbsBlockPage.linkPatientCare).click();
        await expect(await url).toContain(breadcrumbsBlockData.patientUrl);
    });

    it.only("[S3C1345] Verify that Analytics for the Breadcrumbs Component is configured", async () => {
        await BreadcrumbsBlockPage.openPage();
        await (
            await BreadcrumbsBlockPage.linkClinicalServices
        ).scrollIntoView();
        const currentUrl = await browser.getUrl();
        await browser.execute(() => {
            const clinicalServicesLink = document.querySelector(
                "li.mf-breadcrumbs__item:nth-child(4) > a:nth-child(1)"
            );
            clinicalServicesLink.setAttribute("target", "_blank");
        });
        await (await BreadcrumbsBlockPage.linkClinicalServices).click();
        await browser.switchWindow(currentUrl);

        const expectedAnalyticsData = [
            {
                clickText: "Clinical Services",
                linkType: "link",
                event: "e_navigationClick",
                navigationType: "breadcrumbs",
            },
        ];

        const dataLayer = await browser.executeScript(
            "return window.dataLayer",
            []
        );
        const actualAnalyticsData = dataLayer.filter(
            (item) => item.event === "e_navigationClick"
        );

        fs.writeFile(
            "analyticsTestEvidence/breadcrumbs.json",
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
    // it('[S3C1350] Verify that Analytics for the Accordion Component is configured', async () => {
    //     const id=`Accordion-S3C1350-${Date.now()}`;
    //     const title = accordionBlockData.title;
    //     await (await QALayoutPage.tabLayout).click();
    //     await QALayoutPage.createNewSection(id);
    //     await QALayoutPage.navigateToBlockList();
    //     await (await QALayoutPage.btnAccordion).scrollIntoView();
    //     await (await QALayoutPage.btnAccordion).click();
    //     await (await AccordionBlockPage.configBlock).waitForDisplayed();

    //     await AccordionBlockPage.createAccordion(accordionBlockData.mainTitle, accordionBlockData.title, accordionBlockData.content);

    //     await expect(AccordionBlockPage.successMsg).toBeDisplayed();

    //     await QALayoutPage.goToPageView();
    //     await (await AccordionBlockPage.accordionElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });

    //     await expect(AccordionBlockPage.accordionElement(id)).toBeDisplayedInViewport();

    //     /**
    //      * Create the expected analytics
    //      * object based on the spec below:
    //      * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g127fd856972_0_321
    //      * */
    //     const expectedAnalyticsData = {
    //         event: 'e_componentClick',
    //         componentType:'accordion',
    //         clickText: accordionBlockData.title,
    //         pageSlot: '1'
    //     }

    //     // Get the current url of the page
    //     //const currentUrl = await browser.getUrl();

    //     // Interact with the button to generate the analytics. (Clicking the button navigates us to a new tab)
    //     await (await AccordionBlockPage.accordionBtn).click();

    //     // Switch back to the tab where the analytics is being generated
    //     //await browser.switchWindow(currentUrl)

    //     // Get the data layer for the window and get the data for the click event for the component
    //     const dataLayer = await browser.executeScript('return window.dataLayer',[]);
    //     const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];

    //     // Build the actual analytics data object
    //     const parsedActualAnalyticsData = {
    //         //Remove whitespace from the Headline
    //         clickText: actualAnalyticsData.clickText.trim(),
    //         componentType: actualAnalyticsData.componentType,
    //         event: actualAnalyticsData.event,
    //         pageSlot: actualAnalyticsData.pageSlot
    //     }

    //     fs.writeFile('analyticsTestEvidence/accordion.json', JSON.stringify(dataLayer), err => {
    //         if (err) {
    //             console.error(err);
    //         }
    //         // file written successfully
    //     });

    //     await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    // });
});
