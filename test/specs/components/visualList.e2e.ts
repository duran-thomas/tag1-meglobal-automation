import LoginPage from '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import VisualListBlockPage from '../../pageobjects/CMS/Components/visualList.page';
import { visualListBlockData, illustrationVisualListBlockData, simplevisualListBlockData, stylingData, illustrationCard, imageCardData } from '../../data/visualList.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";


describe('Visual List Component Tests', () => {

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

    beforeEach(async function () {
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
        const screenshotPath = `./screenshots/VisualList/${testName}.png`;
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

    for (const record of visualListBlockData) {
        it(`${record.testCaseTitle}`, async () => {
            const id=`VisualList-${record.testCaseTitle.substring(1, 6)}-${Date.now()}`;
            await (await QALayoutPage.tabLayout).click();
            await QALayoutPage.createNewSection(id);
            await QALayoutPage.navigateToBlockList();
            await (await QALayoutPage.btnVisualList).scrollIntoView();
            
            await (await QALayoutPage.btnVisualList).click();
            await (await VisualListBlockPage.configBlock).waitForDisplayed();
            const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
            if (record.itemTitle === 'QA Simple Visual List Item Title') {
                await VisualListBlockPage.createVisualListComponentSimple(record.mainTitle, record.itemTitle, record.link, record.description);
                await QALayoutPage.goToPageView();
                await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining('QA Simple Visual List Item Title');
                await expect(VisualListBlockPage.visualListElement(id)).toExist();
                await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
            }
            if (record.itemTitle === 'QA Simple Visual List Item Title Internal URL') {
                await VisualListBlockPage.createVisualListComponentSimple(record.mainTitle, record.itemTitle, record.link, record.description);
                await QALayoutPage.goToPageView();
                await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining('QA Simple Visual List Item Title Internal URL');
                await expect(VisualListBlockPage.visualListElement(id)).toExist();
                await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
            }
            if (record.itemTitle === 'QA Illustration Visual List Item Title') {

                await VisualListBlockPage.createVisualListComponentIllustration(record.mainTitle, record.itemTitle, record.link, record.description, imageFilePath, record.altText);
                await QALayoutPage.goToPageView();
                await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining(record.itemTitle);
                await expect(VisualListBlockPage.visualListElement(id)).toExist();
                await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
            }
            if (record.itemTitle === 'QA Illustration Visual List Item Title Internal URL') {
                await VisualListBlockPage.createVisualListComponentIllustration(record.mainTitle, record.itemTitle, record.link, record.description, imageFilePath, record.altText);
                await QALayoutPage.goToPageView();
                await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining(record.itemTitle);
                await expect(VisualListBlockPage.visualListElement(id)).toExist();
                await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
            }
            if (record.itemTitle === 'QA Icon Visual List Item Title') {
                await VisualListBlockPage.createVisualListComponentIcon(record.mainTitle, record.itemTitle, record.link, record.description)
                await QALayoutPage.goToPageView();
                await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining(record.itemTitle);
                await expect(VisualListBlockPage.visualListElement(id)).toExist();
                await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
            }
            if (record.itemTitle === 'QA Icon Visual List Item Title Internal URL') {
                await VisualListBlockPage.createVisualListComponentIcon(record.mainTitle, record.itemTitle, record.link, record.description)
                await QALayoutPage.goToPageView();
                await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining(record.itemTitle);
                await expect(VisualListBlockPage.visualListElement(id)).toExist();
                await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
            }
            if (record.itemTitle === 'QA Illustration Card Visual List Item Title') {
                await VisualListBlockPage.createVisualListComponentIllustrationCard(record.mainTitle,
                    record.eyebrow, record.heading, record.url, record.linkText, record.description, imageFilePath, record.altText)

                await QALayoutPage.goToPageView();
                await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining('QA Illustration Card Visual List Item Heading');
                await expect(VisualListBlockPage.visualListElement(id)).toExist();
                await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
            }
            if (record.itemTitle === 'QA Illustration Card Visual List Item Title Internal URL') {
                await VisualListBlockPage.createVisualListComponentIllustrationCard(record.mainTitle,
                    record.eyebrow, record.heading, record.url, record.linkText, record.description, imageFilePath, record.altText)

                await QALayoutPage.goToPageView();
                await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining('QA Illustration Card Visual List Item Heading Internal UR');
                await expect(VisualListBlockPage.visualListElement(id)).toExist();
                await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
            }
            if (record.itemTitle === 'QA Image Card Visual List Item Title') {
                await VisualListBlockPage.createVisualListComponentImageCard(record.mainTitle,
                    record.eyebrow, record.heading, record.url, record.linkText, record.description, imageFilePath, record.altText)

                await QALayoutPage.goToPageView();
                await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining(record.itemTitle);
                await expect(VisualListBlockPage.visualListElement(id)).toExist();
                await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
            }
        })
    }

    it('[S3C836] Verify that a site Content Administrator can create a Visual List Component with both an Illustration visual list item paragraph and a Simple visual list item', async () => {
        const id=`VisualList-S3C836-${Date.now()}`;
        await (QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnVisualList).scrollIntoView();
        await (await QALayoutPage.btnVisualList).click();
        await (await VisualListBlockPage.configBlock).waitForDisplayed();
        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await VisualListBlockPage.createIllustrationAndSimple(simplevisualListBlockData[0].mainTitle, simplevisualListBlockData[0].itemTitle, illustrationVisualListBlockData[0].itemTitle, simplevisualListBlockData[0].link,
            simplevisualListBlockData[0].description, illustrationVisualListBlockData[0].description, imageFilePath, illustrationVisualListBlockData[0].altText)

        await QALayoutPage.goToPageView();
        await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining('QA Illustration Visual List Item Title');
        await expect(VisualListBlockPage.visualListElement(id)).toExist();
        await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
    });

    it('[S3C832] Verify that a site Content Administrator can create a Visual List Component with a Simple visual list item paragraph', async () => {
        const id=`VisualList-S3C832-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnVisualList).scrollIntoView();
        await (await QALayoutPage.btnVisualList).click();
        await (await VisualListBlockPage.configBlock).waitForDisplayed();
        await VisualListBlockPage.createVisualListComponentSimple(visualListBlockData[4].mainTitle, visualListBlockData[4].itemTitle, visualListBlockData[4].link, visualListBlockData[4].description);

        await QALayoutPage.goToPageView();
        await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
        await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining(visualListBlockData[4].itemTitle);
        await expect(VisualListBlockPage.visualListElement(id)).toExist();

    });

    //#region TODO: Look at this again later. For now, manually execute these tests.
    it('[S3C842] Verify that the Visual List Paragraph type has been added to the list of paragraph types that appear in the Freeform block', async () => {
        const id=`VisualList-S3C842-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnFreeform).scrollIntoView();
        await (await QALayoutPage.btnFreeform).click();
        await (await VisualListBlockPage.configBlock).waitForDisplayed();
        await VisualListBlockPage.isVisualListInFreeformBlock();

        await expect(VisualListBlockPage.freeformVisualList).toBeDisplayedInViewport();
    });

    it('[S3C843] Verify that all design fields are present with the correct available options.', async () => {
        const id=`VisualList-S3C843-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnVisualList).scrollIntoView();
        await (await QALayoutPage.btnVisualList).click();
        await (await VisualListBlockPage.configBlock).waitForDisplayed();

        await VisualListBlockPage.navToStyling();

        await expect(VisualListBlockPage.dropdownMediaBackground).toBeDisplayed();

        async function verifyBackgroundOptions() {
            const expectedBackgroundOptions = stylingData.backgroundOptions;
            const dropdownMediaBackgroundOptions = await $$('#edit-settings-block-form-field-content-0-subform-field-background option');

            for (const option of expectedBackgroundOptions) {
                const isOptionPresent = await dropdownMediaBackgroundOptions.some(async (element) => {
                    return await element.getText() === option;
                });

                if (!isOptionPresent) {
                    throw new Error(`Option '${option}' is missing from the dropdown list.`);
                }
            }

            await expect(dropdownMediaBackgroundOptions).toHaveLength(expectedBackgroundOptions.length);
        }

        await verifyBackgroundOptions();

    });

    it('[S3C1070] Verify that Analytics for the Visual List Component with a Simple Visual List item is configured', async () => {
        const id=`VisualList-S3C1070-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnVisualList).scrollIntoView();
        await (await QALayoutPage.btnVisualList).click();
        await (await VisualListBlockPage.configBlock).waitForDisplayed();
        await VisualListBlockPage.createSimpleVisualListAnalytics(visualListBlockData[4].mainTitle, visualListBlockData[4].itemTitle, visualListBlockData[4].link, visualListBlockData[4].description);

        await QALayoutPage.goToPageView();
        await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
        await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining(visualListBlockData[4].itemTitle);
        await expect(VisualListBlockPage.visualListElement(id)).toExist();

        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g176e8b0086d_0_3
         *  */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'visual list',
            linkType: 'link',
            clickText: visualListBlockData[4].itemTitle,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        // Interact with the link to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`a[data-analytics-click-text="${visualListBlockData[4].itemTitle}"]`)).click();

        // Switch back to the tab where the analytics is being generated
        await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalyticsData.clickText.trim(),
            componentType: actualAnalyticsData.componentType,
            event: actualAnalyticsData.event,
            linkType: actualAnalyticsData.linkType,
            pageSlot: actualAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/simpleVisualList.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    });

    it('[S3C1320] Verify that Analytics for the Visual List Component with a Illustration Card List item is configured', async () => {
        const id=`VisualList-S3C1320-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnVisualList).scrollIntoView();
        await (await QALayoutPage.btnVisualList).click();
        await (await VisualListBlockPage.configBlock).waitForDisplayed();
        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await VisualListBlockPage.createVisualListIllustrationCardAnalytics(illustrationCard[1].mainTitle,illustrationCard[1].eyebrow, illustrationCard[1].heading, illustrationCard[1].url, illustrationCard[1].linkText, illustrationCard[1].description, imageFilePath, illustrationCard[1].altText)

        await QALayoutPage.goToPageView();
        await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
        await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining(illustrationCard[1].heading);
        await expect(VisualListBlockPage.visualListElement(id)).toExist();

        /**
         * Create the expected analytics 
         * object based on the spec below: 
         https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g23acaf9823b_0_145
         *  */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'visual list',
            linkType: 'link',
            clickText: illustrationCard[1].heading,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        // Interact with the link to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`a[data-analytics-click-text="${illustrationCard[1].heading}"]`)).click();

        // Switch back to the tab where the analytics is being generated
        await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalyticsData.clickText.trim(),
            componentType: actualAnalyticsData.componentType,
            event: actualAnalyticsData.event,
            linkType: actualAnalyticsData.linkType,
            pageSlot: actualAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/illustrationCardVisualList.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    });

    it('[S3C1321] Verify that Analytics for the Visual List Component with an Image Card List item is configured', async () => {
        const id=`VisualList-S3C1321-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnVisualList).scrollIntoView();
        await (await QALayoutPage.btnVisualList).click();
        await (await VisualListBlockPage.configBlock).waitForDisplayed();
        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await VisualListBlockPage.createVisualListImageCardAnalytics(imageCardData.mainTitle, imageCardData.eyebrow, imageCardData.heading, imageCardData.url, imageCardData.linkText, imageCardData.description, imageFilePath, imageCardData.altText)

        await QALayoutPage.goToPageView();
        await (await VisualListBlockPage.visualListElement(id)).scrollIntoView();
        await expect(await VisualListBlockPage.visualListElementTitle).toHaveTextContaining(imageCardData.heading);
        await expect(VisualListBlockPage.visualListElement(id)).toExist();

        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g23acaf9823b_0_156
         *  */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'visual list',
            linkType: 'link',
            clickText: imageCardData.heading,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        // Interact with the link to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`a[data-analytics-click-text="${imageCardData.heading}"]`)).click();

        // Switch back to the tab where the analytics is being generated
        await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalyticsData.clickText.trim(),
            componentType: actualAnalyticsData.componentType,
            event: actualAnalyticsData.event,
            linkType: actualAnalyticsData.linkType,
            pageSlot: actualAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/imageCardVisualList.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    });



});
