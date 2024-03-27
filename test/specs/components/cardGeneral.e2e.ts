import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CardGeneralBlockPage from '../../pageobjects/CMS/Components/cardGeneral.page';
import { cardGeneralBlockData } from '../../data/cardGeneral.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";


describe('Card General Component Tests', () => {
    
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

    before(async function() {
        global.suiteDescription = this.currentTest?.parent?.title;
        //navigate to admin content page
        await AdminContentPage.open();
        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getTestPage(global.suiteDescription);  
        await expect(QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/CardGeneral/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
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

  
    it('[S3C860] Verify that a site Content Administrator can create a  Card - General Component.', async () => {
        const id=`CardGeneral-S3C860-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardGeneral).scrollIntoView();
        await (await QALayoutPage.btnCardGeneral).click();
        await (await CardGeneralBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardGeneralBlockPage.createCardGeneral(cardGeneralBlockData.title, cardGeneralBlockData.headline, cardGeneralBlockData.eyebrow, cardGeneralBlockData.list, cardGeneralBlockData.btnText, cardGeneralBlockData.url,imageFilePath, cardGeneralBlockData.altText);

        await expect(CardGeneralBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardGeneralBlockPage.cardEyebrow(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await CardGeneralBlockPage.cardEyebrow(id)).toHaveText(cardGeneralBlockData.eyebrow); 
        await expect(CardGeneralBlockPage.cardGeneralElement(id)).toBeExisting();   
    });

    it('[S3C1082] Verify that the Headline size defaults to h3 when creating a Card General Component', async () => {
        const id=`CardGeneral-S3C1082-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardGeneral).scrollIntoView();
        await (await QALayoutPage.btnCardGeneral).click();
        await (await CardGeneralBlockPage.configBlock).waitForDisplayed();

        await CardGeneralBlockPage.checkHeadingSize();

        await expect(CardGeneralBlockPage.dropdownRenderAs).toHaveValue('h3');
    });

    it('[S3C1075] Verify that Analytics for the Card General Component is configured', async () => {
        const id=`CardGeneral-S3C1075-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardGeneral).scrollIntoView();
        await (await QALayoutPage.btnCardGeneral).click();
        await (await CardGeneralBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardGeneralBlockPage.createCardGeneralAnalytics(cardGeneralBlockData.title, cardGeneralBlockData.headline, cardGeneralBlockData.eyebrow, cardGeneralBlockData.list, cardGeneralBlockData.btnText, cardGeneralBlockData.url,imageFilePath, cardGeneralBlockData.altText);

        await expect(CardGeneralBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardGeneralBlockPage.cardEyebrow(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await CardGeneralBlockPage.cardEyebrow(id)).toHaveText(cardGeneralBlockData.eyebrow); 
        await expect(CardGeneralBlockPage.cardGeneralElement(id)).toBeExisting(); 

        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g23a9f051951_1_53
         *  */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'card',
            itemTitle: cardGeneralBlockData.headline,
            linkType: 'button',
            clickText: cardGeneralBlockData.btnText,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        // Interact with the button to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`a[data-analytics-click-text="${cardGeneralBlockData.btnText}"]`)).click();

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
            // Remove html tags, whitespace and newlines from the Headline
            itemTitle: actualAnalyticsData.itemTitle.replace(/(<([^>]+)>)/ig, '').trim(),
            linkType: actualAnalyticsData.linkType,
            pageSlot: actualAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/cardGeneral.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/CardGeneral/Verify that Analytics for the Card General Component is configured..png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    });

  });
