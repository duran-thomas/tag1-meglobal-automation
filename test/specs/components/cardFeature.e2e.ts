import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CardFeatureBlockPage from '../../pageobjects/CMS/Components/cardFeature.page';
import { cardFeatureBlockData } from '../../data/cardFeature.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';


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

     
    it('[S3C862] Verify that a site Content Administrator can create a Card Feature Component', async () => {
        const headline = cardFeatureBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardFeature).scrollIntoView();
        await (await QALayoutPage.btnCardFeature).click();
        await (await CardFeatureBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardFeatureBlockPage.createCardFeature(cardFeatureBlockData.title, cardFeatureBlockData.headline, cardFeatureBlockData.eyebrow, cardFeatureBlockData.list, cardFeatureBlockData.btnText, cardFeatureBlockData.url,imageFilePath, cardFeatureBlockData.altText);

        await expect(CardFeatureBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardFeatureBlockPage.cardFeatureElement).scrollIntoView();
        
        await expect($(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect($('a[href="https://google.com/"]')).toExist; 
        await expect(CardFeatureBlockPage.cardFeatureImage).toBeDisplayed();   
    });

    it('[S3C863] Verify that a site Content Administrator can create a Card Clinical Feature Component, using an internal url', async () => {
        const headline = cardFeatureBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardFeature).scrollIntoView();
        await (await QALayoutPage.btnCardFeature).click();
        await (await CardFeatureBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await CardFeatureBlockPage.createCardFeatureInternal(cardFeatureBlockData.title, cardFeatureBlockData.headline, cardFeatureBlockData.eyebrow, cardFeatureBlockData.list, cardFeatureBlockData.btnText,imageFilePath, cardFeatureBlockData.altText);

        await expect(CardFeatureBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardFeatureBlockPage.cardFeatureElement).scrollIntoView();
        
        await expect($(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect($('a[href="/education/residency"]')).toExist; 
        await expect(CardFeatureBlockPage.cardFeatureImage).toBeDisplayed();   
    });

    it('[S3C1083] Verify that the Headline size defaults to h3 when creating a Card Feature Component', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardFeature).scrollIntoView();
        await (await QALayoutPage.btnCardFeature).click();
        await (await CardFeatureBlockPage.configBlock).waitForDisplayed();

        await CardFeatureBlockPage.checkHeadingSize();

        await expect(CardFeatureBlockPage.dropdownRenderAs).toHaveValue('h3');
    });

  });
