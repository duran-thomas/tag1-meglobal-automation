import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CardFeatureBlockPage from '../../pageobjects/CMS/Components/cardFeature.page';
import { cardFeatureBlockData } from '../../data/cardFeature.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";


describe('Card Feature Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/CardFeature/${testName}.png`;
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

     
    it('[S3C862] Verify that a site Content Administrator can create a Card Feature Component', async () => {
        const id=`CardFeature-S3C862-${Date.now()}`;
        const headline = cardFeatureBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardFeature).scrollIntoView();
        await (await QALayoutPage.btnCardFeature).click();
        await (await CardFeatureBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardFeatureBlockPage.createCardFeature(cardFeatureBlockData.title, cardFeatureBlockData.headline, cardFeatureBlockData.eyebrow, cardFeatureBlockData.list, cardFeatureBlockData.btnText, cardFeatureBlockData.url,imageFilePath, cardFeatureBlockData.altText);

        await expect(CardFeatureBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardFeatureBlockPage.cardFeatureElement).scrollIntoView();
        await expect($(`#${id} div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect($(`#${id} a[href="https://google.com/"]`)).toExist; 
        await expect(CardFeatureBlockPage.cardFeatureImage).toBeDisplayed();   
    });

    it('[S3C863] Verify that a site Content Administrator can create a Card Clinical Feature Component, using an internal url', async () => {
        const headline = cardFeatureBlockData.headline;
        const id=`CardFeature-S3C863-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardFeature).scrollIntoView();
        await (await QALayoutPage.btnCardFeature).click();
        await (await CardFeatureBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await CardFeatureBlockPage.createCardFeatureInternal(cardFeatureBlockData.title, cardFeatureBlockData.headline, cardFeatureBlockData.eyebrow, cardFeatureBlockData.list, cardFeatureBlockData.btnText,imageFilePath, cardFeatureBlockData.altText);

        await expect(CardFeatureBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardFeatureBlockPage.cardFeatureElement).scrollIntoView();
        
        await expect($(`#${id} div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect($(`#${id} a[href="/education/residency"]`)).toExist; 
        await expect(CardFeatureBlockPage.cardFeatureImage).toBeDisplayed();   
    });

    it('[S3C1083] Verify that the Headline size defaults to h3 when creating a Card Feature Component', async () => {
        const id=`CardFeature-S3C1083-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardFeature).scrollIntoView();
        await (await QALayoutPage.btnCardFeature).click();
        await (await CardFeatureBlockPage.configBlock).waitForDisplayed();

        await CardFeatureBlockPage.checkHeadingSize();

        await expect(CardFeatureBlockPage.dropdownRenderAs).toHaveValue('h3');
    });

    it('[S3C1352] Verify that Analytics for the Card Feature Component is configured', async () => {
        const headline = cardFeatureBlockData.headline;
        const id=`CardFeature-S3C1352-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardFeature).scrollIntoView();
        await (await QALayoutPage.btnCardFeature).click();
        await (await CardFeatureBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardFeatureBlockPage.createCardFeatureAnalytics(cardFeatureBlockData.title, cardFeatureBlockData.headline, cardFeatureBlockData.eyebrow, cardFeatureBlockData.list, cardFeatureBlockData.btnText, cardFeatureBlockData.url,imageFilePath, cardFeatureBlockData.altText);

        await expect(CardFeatureBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardFeatureBlockPage.cardFeatureElement).scrollIntoView();
        
        await expect($(`#${id} div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect($(`#${id} a[href="https://google.com/"]`)).toExist;
        await expect(CardFeatureBlockPage.cardFeatureImage).toBeDisplayed();  
        
        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g23a9f051951_1_66
         * */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'card feature',
            itemTitle: cardFeatureBlockData.headline,
            linkType: 'button',
            clickText: cardFeatureBlockData.btnText,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        // Interact with the button to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`a[data-analytics-click-text="${cardFeatureBlockData.btnText}"]`)).click();

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

        fs.writeFile('analyticsTestEvidence/cardFeature.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    });

  });
