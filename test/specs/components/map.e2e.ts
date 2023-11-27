import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import MapBlockPage from '../../pageobjects/CMS/Components/map.page';
import { mapBlockData } from '../../data/map.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';


describe('Map Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/Map/${testName}.png`;
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

     
    it.only('[S3C872] Verify that a site Content Administrator can create a Map Component', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnMap).scrollIntoView();
        await (await QALayoutPage.btnMap).click();
        await (await MapBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        const imageFilePath2 = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await MapBlockPage.createMap(mapBlockData.title, mapBlockData.highlightTitle, mapBlockData.latitude, mapBlockData.longitude, imageFilePath, mapBlockData.altText, imageFilePath2, mapBlockData.iconAltText);

        await expect(MapBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();

        await (await MapBlockPage.mapElement).scrollIntoView();
        await expect(MapBlockPage.mapElement).toBeDisplayed(); 

        //dismiss google alert for clean screenshot
        (await $('.dismissButton')).click(); 
    });


    it('[S3C873] Verify that all design fields are present with the correct available options.', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnMap).scrollIntoView();
        (await QALayoutPage.btnMap).click();
        (await MapBlockPage.configBlock).waitForDisplayed();

        await MapBlockPage.navToStyling();

        const hideLocationCheckbox = await MapBlockPage.checkboxHideLocationCards;
        await hideLocationCheckbox.scrollIntoView();
        await expect(hideLocationCheckbox).toBeDisplayed();
        await expect(await hideLocationCheckbox.isSelected()).toBe(false);
    });

  });
