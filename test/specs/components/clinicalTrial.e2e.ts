import LoginPage from '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import ClinicalTrialBlockPage from '../../pageobjects/CMS/Components/clinicalTrial.page';
import { clinicalTrialBlockData } from '../../data/clinicalTrial.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";


describe('Clinical Trial Component Tests', () => {

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
    })

    afterEach(async function () {
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/ClinicalTrial/${testName}.png`;
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
        await expect($('.mf-alert__container--highlight')).toBeDisplayed();
    });


    it('[S3C819] Verify that a site Content Administrator can create a Card Clinical Trial Component.', async () => {
        const id=`ClinicalTrial-S3C819-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardClinicalTrial).scrollIntoView();
        (await QALayoutPage.btnCardClinicalTrial).click();
        (await ClinicalTrialBlockPage.configBlock).waitForDisplayed();

        await ClinicalTrialBlockPage.createCardClinicalTrial(clinicalTrialBlockData.mainTitle, clinicalTrialBlockData.title, clinicalTrialBlockData.tag1, clinicalTrialBlockData.tag2, clinicalTrialBlockData.tag3, clinicalTrialBlockData.link, clinicalTrialBlockData.strDate, clinicalTrialBlockData.condition1, clinicalTrialBlockData.condition2);

        await expect(ClinicalTrialBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ClinicalTrialBlockPage.clinicalCardElement(id)).scrollIntoView();

        await expect(ClinicalTrialBlockPage.clinicalCardElement(id)).toExist;
        await expect(await $(`#${id} h2.mb-16`)).toHaveTextContaining(clinicalTrialBlockData.title);
    });

    it('[S3C820] Verify that a site Content Administrator can create a Card Clinical Trial Component, using an internal url', async () => {
        const id=`ClinicalTrial-S3C820-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardClinicalTrial).scrollIntoView();
        (await QALayoutPage.btnCardClinicalTrial).click();
        (await ClinicalTrialBlockPage.configBlock).waitForDisplayed();

        await ClinicalTrialBlockPage.createCardClinicalTrialInternalUrl(clinicalTrialBlockData.mainTitle, clinicalTrialBlockData.title, clinicalTrialBlockData.tag1, clinicalTrialBlockData.tag2, clinicalTrialBlockData.tag3, clinicalTrialBlockData.strDate, clinicalTrialBlockData.condition1, clinicalTrialBlockData.condition2);

        await expect(ClinicalTrialBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ClinicalTrialBlockPage.clinicalCardElement(id)).scrollIntoView();

        await expect(ClinicalTrialBlockPage.clinicalCardElement(id)).toExist;
        await expect(await $(`#${id} h2.mb-16`)).toHaveTextContaining(clinicalTrialBlockData.title);
    });


    it('[S3C1351] Verify that Analytics for the Card Clinical Trial Component is configured ', async () => {
        const id=`ClinicalTrial-S3C1351-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardClinicalTrial).scrollIntoView();
        await (await QALayoutPage.btnCardClinicalTrial).click();
        await (await ClinicalTrialBlockPage.configBlock).waitForDisplayed();

        await ClinicalTrialBlockPage.createCardClinicalTrial(clinicalTrialBlockData.mainTitle, clinicalTrialBlockData.title, clinicalTrialBlockData.tag1, clinicalTrialBlockData.tag2, clinicalTrialBlockData.tag3, clinicalTrialBlockData.link, clinicalTrialBlockData.strDate, clinicalTrialBlockData.condition1, clinicalTrialBlockData.condition2);

        await expect(ClinicalTrialBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ClinicalTrialBlockPage.clinicalCardElement(id)).scrollIntoView();

        await expect(ClinicalTrialBlockPage.clinicalCardElement(id)).toExist;
        await expect(await $(`#${id} h2.mb-16`)).toHaveTextContaining(clinicalTrialBlockData.title);


        /**
       * Create the expected analytics 
       * object based on the spec below: 
       * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g23a9f051951_1_66
       * */
        const inputDateString = clinicalTrialBlockData.strDate;

        const formattedDateString = new Date(inputDateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });


        const ctaText = `${formattedDateString} | ${clinicalTrialBlockData.condition1}, ${clinicalTrialBlockData.condition2}`;
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType: 'card clinical trials',
            itemTitle: clinicalTrialBlockData.title,
            linkType: 'link',
            clickText: ctaText,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        //set element to open links in new tab
        await browser.execute(() => {
            const clickElement = document.querySelector('.mf-card-clinical-trial');
            clickElement.setAttribute('target', '_blank');
        })

        // Interact with the button to generate the analytics. (Clicking the button navigates us to a new tab)
        await ($(`#${id} a[data-analytics-click-text="${ctaText}"]`)).click();

        // Switch back to the tab where the analytics is being generated
        await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer', []);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalyticsData.clickText.trim(),
            componentType: actualAnalyticsData.componentType,
            event: actualAnalyticsData.event,
            // Remove html tags, whitespace and newlines from the Headline
            itemTitle: actualAnalyticsData.itemTitle.replace(/(<([^>]+)>)/ig, '').trim(),
            linkType: actualAnalyticsData.linkType,
            pageSlot: actualAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/clinicalTrial.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);


    });


});
