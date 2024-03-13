import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import InlineNavigationBlockPage from '../../pageobjects/CMS/Components/inlineNavigation.page';
import { inlineNavigationBlockData } from '../../data/inlineNavigation.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import BillboardBlockPage from '../../pageobjects/CMS/Components/billboard.page';
import { billboardBlockData } from '../../data/billboard.data';
import AccordionBlockPage from '../../pageobjects/CMS/Components/accordion.page';
import { accordionBlockData } from '../../data/accordion.data';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";





describe('Inline Navigation Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/InlineNavigation/${testName}.png`;
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

     
    it('[S3C895] Verify that a site Content Administrator can create an Inline Navigation Component with an external link', async () => {
        const id=`InlineNavigation-S3C895-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnInlineNavigation).scrollIntoView();
        await (await QALayoutPage.btnInlineNavigation).click();
        await (await InlineNavigationBlockPage.configBlock).waitForDisplayed();

        await InlineNavigationBlockPage.createExtInlineNav(inlineNavigationBlockData.title, inlineNavigationBlockData.label, inlineNavigationBlockData.headline, inlineNavigationBlockData.linkTxt, inlineNavigationBlockData.url, inlineNavigationBlockData.id+'1');

        await expect(InlineNavigationBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await InlineNavigationBlockPage.inlineNavElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect($(`#${inlineNavigationBlockData.id}1`)).toExist; 
        await expect($(`#${inlineNavigationBlockData.id}1`)).toHaveElementClassContaining('scrollto'); 
    });

    it('[S3C896] Verify that a site Content Administrator can create an Inline Navigation Component with an internal link', async () => {
        const id=`InlineNavigation-S3C896-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnInlineNavigation).scrollIntoView();
        await (await QALayoutPage.btnInlineNavigation).click();
        await (await InlineNavigationBlockPage.configBlock).waitForDisplayed();

        await InlineNavigationBlockPage.createIntInlineNav(inlineNavigationBlockData.title, inlineNavigationBlockData.label, inlineNavigationBlockData.headline, inlineNavigationBlockData.intLinkTxt, inlineNavigationBlockData.intUrl, inlineNavigationBlockData.id+'2');

        await expect(InlineNavigationBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await InlineNavigationBlockPage.inlineNavElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect($(`#${inlineNavigationBlockData.id}2`)).toExist; 
        await expect($(`#${inlineNavigationBlockData.id}2`)).toHaveElementClassContaining('scrollto'); 
    });

    it('[S3C897] Verify that a site Content Administrator can create an Inline Navigation Component with a same page fragment', async () => {
        const id=`InlineNavigation-S3C897-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnInlineNavigation).scrollIntoView();
        await (await QALayoutPage.btnInlineNavigation).click();
        await (await InlineNavigationBlockPage.configBlock).waitForDisplayed();

        await InlineNavigationBlockPage.createInlineNavFragment(inlineNavigationBlockData.title, inlineNavigationBlockData.label, inlineNavigationBlockData.headline, inlineNavigationBlockData.linkTxt, inlineNavigationBlockData.jumpUrl, inlineNavigationBlockData.id+'3');
        
        await browser.refresh();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnBillBoard).click();
        await (await QALayoutPage.btnBillBoard).waitForDisplayed();
        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await BillboardBlockPage.createBillboard(billboardBlockData.title, billboardBlockData.headline, billboardBlockData.eyebrow, billboardBlockData.intro, billboardBlockData.content, billboardBlockData.btnText, billboardBlockData.url,imageFilePath, billboardBlockData.altText, '_self');
       
        await (await QALayoutPage.tabLayout).click();
        await browser.pause(3000);
        await QALayoutPage.navigateToBlockList();
       
        (await QALayoutPage.btnAccordion).scrollIntoView();
        (await QALayoutPage.btnAccordion).click();
        (await AccordionBlockPage.configBlock).waitForDisplayed();
        await AccordionBlockPage.createAccordionWithID(accordionBlockData.mainTitle, accordionBlockData.title, accordionBlockData.content, inlineNavigationBlockData.jumpID);

        await expect(AccordionBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await InlineNavigationBlockPage.inlineLink).click();
        
        await expect($(`#${inlineNavigationBlockData.id}3`)).toExist; 
        await expect($(`#${inlineNavigationBlockData.id}3`)).toHaveElementClassContaining('scrollto'); 
        await expect($('div[data-analytics-component-type="accordion"]')).toBeDisplayedInViewport();
    });

    it('[S3C898] Verify that a site Content Administrator can create an Inline Navigation Component in a Freeform block', async () => {
        const id=`InlineNavigation-S3C898-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnFreeform).scrollIntoView();
        await (await QALayoutPage.btnFreeform).click();
        await (await InlineNavigationBlockPage.configBlock).waitForDisplayed();

        await InlineNavigationBlockPage.createFreeformInlineNav(inlineNavigationBlockData.title, inlineNavigationBlockData.label, inlineNavigationBlockData.headline, inlineNavigationBlockData.linkTxt, inlineNavigationBlockData.url, inlineNavigationBlockData.id+'4');

        await expect(InlineNavigationBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await InlineNavigationBlockPage.inlineNavElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect($(`#${inlineNavigationBlockData.id}4`)).toExist; 
        await expect($(`#${inlineNavigationBlockData.id}4`)).toHaveElementClassContaining('scrollto'); 
    });


    it('[S3C1120] Verify that Analytics for the Inline Navigation Component is configured', async () => {
        const id=`InlineNavigation-S3C1120-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnInlineNavigation).scrollIntoView();
        await (await QALayoutPage.btnInlineNavigation).click();
        await (await InlineNavigationBlockPage.configBlock).waitForDisplayed();

        await InlineNavigationBlockPage.createInlineNavAnalytics(inlineNavigationBlockData.title, inlineNavigationBlockData.label, inlineNavigationBlockData.headline, inlineNavigationBlockData.linkTxt, inlineNavigationBlockData.url, inlineNavigationBlockData.id+'1');

        await expect(InlineNavigationBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await InlineNavigationBlockPage.inlineNavElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect($(`#${inlineNavigationBlockData.id}1`)).toExist; 
        await expect($(`#${inlineNavigationBlockData.id}1`)).toHaveElementClassContaining('scrollto'); 

        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g23a9f051951_1_185
         * */ 
        const expectedAnalyticsData = {
            event: 'e_navigationClick',
            navigationType:'inline navigation',
            clickText: inlineNavigationBlockData.linkTxt
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        // Interact with the button to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`a[data-analytics-click-text="${inlineNavigationBlockData.linkTxt}"]`)).click();

        // Switch back to the tab where the analytics is being generated
        await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_navigationClick")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalyticsData.clickText.trim(),
            navigationType: actualAnalyticsData.navigationType,
            event: actualAnalyticsData.event
        }

        fs.writeFile('analyticsTestEvidence/inlineNavigation.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/InlineNavigation/Verify that Analytics for the Inline Navigation Component is configured..png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    });
   
  });
