import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import BillboardBlockPage from '../../pageobjects/CMS/Components/billboard.page';
import { billboardBlockData } from '../../data/billboard.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import * as fs from "fs";
import { getEnvironmentConfig } from '../../../envSelector';


describe('Billboard Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/Billboard/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
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

     
    it('[S3C887] Verify that a site Content Administrator can create a Billboard Component.', async () => {
        const id=`Billboard-S3C887-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnBillBoard).scrollIntoView();
        (await QALayoutPage.btnBillBoard).click();
        (await BillboardBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        await BillboardBlockPage.createBillboard(billboardBlockData.title, billboardBlockData.headline, billboardBlockData.eyebrow, billboardBlockData.intro, billboardBlockData.content, billboardBlockData.btnText, billboardBlockData.url,imageFilePath, billboardBlockData.altText, '_self');

        await expect(BillboardBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await BillboardBlockPage.billboardEyebrow(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(BillboardBlockPage.billboardHeadline(id)).toHaveText(billboardBlockData.headline); 
        await expect(BillboardBlockPage.billboardImage(id)).toBeDisplayedInViewport();   
    });

    it('[S3C888] Verify that a site Content Administrator can create a Billboard Component in a Carousel Block', async () => {
        const id=`Billboard-S3C888-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await BillboardBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await BillboardBlockPage.createCarouselBillboard(billboardBlockData.title, billboardBlockData.headline, billboardBlockData.eyebrow, billboardBlockData.intro, billboardBlockData.content, billboardBlockData.btnText, billboardBlockData.url,imageFilePath, billboardBlockData.altText);

        await expect(BillboardBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await BillboardBlockPage.billboardEyebrow(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(BillboardBlockPage.carouselElement(id)).toExist();
        await expect(BillboardBlockPage.billboardHeadline(id)).toHaveText(billboardBlockData.headline); 
        await expect(BillboardBlockPage.billboardImage(id)).toBeDisplayedInViewport();   
    });
    
    
    it('[S3C1075] Verify that Analytics for the Billboard Component is configured', async () => {
        const id=`Billboard-S3C1075-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnBillBoard).scrollIntoView();
        (await QALayoutPage.btnBillBoard).click();
        (await BillboardBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        await BillboardBlockPage.createBillboard(billboardBlockData.title, billboardBlockData.headline, billboardBlockData.eyebrow, billboardBlockData.intro, billboardBlockData.content, billboardBlockData.btnText, billboardBlockData.url,imageFilePath, billboardBlockData.altText, '_blank');

        await expect(BillboardBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await BillboardBlockPage.billboardEyebrow(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(BillboardBlockPage.billboardHeadline(id)).toHaveText(billboardBlockData.headline); 
        await expect(BillboardBlockPage.billboardImage(id)).toBeDisplayedInViewport();

        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g127fd856972_0_330
         *  */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'billboard',
            itemTitle: billboardBlockData.headline,
            linkType: 'button',
            clickText: billboardBlockData.btnText,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        // Interact with the billboard button to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`a[data-analytics-click-text="${billboardBlockData.btnText}"]`)).scrollIntoView();
        await (await $(`a[data-analytics-click-text="${billboardBlockData.btnText}"]`)).click();

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

        fs.writeFile('analyticsTestEvidence/billboard.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/Billboard/Verify_that Analytics works as expected for a Billboard Component..png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    });


  });
