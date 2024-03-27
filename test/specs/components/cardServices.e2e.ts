import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CardServicesBlockPage from '../../pageobjects/CMS/Components/cardServices.page';
import { cardServicesBlockData } from '../../data/cardServices.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";



describe('Card Services Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/CardServices/${testName}.png`;
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

  
    it('[S3C903] Verify that a site Content Administrator can create a Card Services Component with an external link', async () => {
        const id=`CardServices-S3C903-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardServices).scrollIntoView();
        await (await QALayoutPage.btnCardServices).click();
        await (await CardServicesBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardServicesBlockPage.createCardServiceExtLink(cardServicesBlockData.title, cardServicesBlockData.eyebrow, cardServicesBlockData.headline, cardServicesBlockData.content, cardServicesBlockData.list, cardServicesBlockData.btnText, cardServicesBlockData.btnUrl,cardServicesBlockData.linkText, cardServicesBlockData.linkUrl, cardServicesBlockData.infolabel, imageFilePath, cardServicesBlockData.altText);

        await expect(CardServicesBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardServicesBlockPage.cardContent(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(CardServicesBlockPage.cardServicesElement(id)).toExist; 
        await expect(await CardServicesBlockPage.cardContent(id)).toHaveText(cardServicesBlockData.content);   
    });

    it('[S3C904] Verify that a site Content Administrator can create a Card Services Component with an internal link', async () => {
        const id=`CardServices-S3C904-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardServices).scrollIntoView();
        (await QALayoutPage.btnCardServices).click();
        (await CardServicesBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await CardServicesBlockPage.createCardServiceIntLink(cardServicesBlockData.title, cardServicesBlockData.eyebrow, cardServicesBlockData.headline, cardServicesBlockData.content, cardServicesBlockData.list, cardServicesBlockData.resiText ,cardServicesBlockData.resiLink, cardServicesBlockData.infolabel, imageFilePath, cardServicesBlockData.altText);

        await expect(CardServicesBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardServicesBlockPage.listElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(CardServicesBlockPage.internalLink(id)).toExist;  
        await expect(await $(`#${id} .mt-16`)).toHaveText(cardServicesBlockData.resiText) 
    });

    it('[S3C1084] Verify that the Headline size defaults to h3 when creating a Card General Component', async () => {
        //const id=`CardServices-S3C1084-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardServices).scrollIntoView();
        await (await QALayoutPage.btnCardServices).click();
        await (await CardServicesBlockPage.configBlock).waitForDisplayed();

        await CardServicesBlockPage.checkHeadingSize();

        await expect(CardServicesBlockPage.dropdownRenderAs).toHaveValue('h3');
    });

    it('[S3C1103] Verify that Analytics for the Card Services Component is configured', async () => {
        const id=`CardServices-S3C1103-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardServices).scrollIntoView();
        await (await QALayoutPage.btnCardServices).click();
        await (await CardServicesBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardServicesBlockPage.createCardServicesAnalytics(cardServicesBlockData.title, cardServicesBlockData.eyebrow, cardServicesBlockData.headline, cardServicesBlockData.content, cardServicesBlockData.list, cardServicesBlockData.btnText, cardServicesBlockData.btnUrl,cardServicesBlockData.linkText, cardServicesBlockData.linkUrl, cardServicesBlockData.infolabel, imageFilePath, cardServicesBlockData.altText);

        await expect(CardServicesBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardServicesBlockPage.cardContent(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(CardServicesBlockPage.cardServicesElement(id)).toExist; 
        await expect(await CardServicesBlockPage.cardContent(id)).toHaveText(cardServicesBlockData.content); 
        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g23a9f051951_1_86
         *  */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'card services',
            itemTitle: cardServicesBlockData.headline,
            linkType: 'button',
            clickText: cardServicesBlockData.btnText,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();
        // Interact with the billboard button to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`#${id} a.mf-button`)).click();
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

        fs.writeFile('analyticsTestEvidence/cardServices.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/CardServices/Verify that Analytics for the Card Services Component is configured..png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);
    });


  });
