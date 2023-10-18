import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CardServicesBlockPage from '../../pageobjects/CMS/Components/cardServices.page';
import { cardServicesBlockData } from '../../data/cardServices.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';



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

  
    it('[S3C903] Verify that a site Content Administrator can create a Card Services Component with an external link', async () => {
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardServices).scrollIntoView();
        (await QALayoutPage.btnCardServices).click();
        (await CardServicesBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardServicesBlockPage.createCardServiceExtLink(cardServicesBlockData.title, cardServicesBlockData.eyebrow, cardServicesBlockData.headline, cardServicesBlockData.content, cardServicesBlockData.list, cardServicesBlockData.btnText, cardServicesBlockData.btnUrl,cardServicesBlockData.linkText, cardServicesBlockData.linkUrl, cardServicesBlockData.infolabel, imageFilePath, cardServicesBlockData.altText);

        await expect(CardServicesBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardServicesBlockPage.cardContent).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(CardServicesBlockPage.cardServicesElement).toExist; 
        await expect(await CardServicesBlockPage.cardContent).toHaveText(cardServicesBlockData.content);   
    });

    it('[S3C904] Verify that a site Content Administrator can create a Card Services Component with an internal link', async () => {
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardServices).scrollIntoView();
        (await QALayoutPage.btnCardServices).click();
        (await CardServicesBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await CardServicesBlockPage.createCardServiceIntLink(cardServicesBlockData.title, cardServicesBlockData.eyebrow, cardServicesBlockData.headline, cardServicesBlockData.content, cardServicesBlockData.list, cardServicesBlockData.resiText ,cardServicesBlockData.resiLink, cardServicesBlockData.infolabel, imageFilePath, cardServicesBlockData.altText);

        await expect(CardServicesBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardServicesBlockPage.listElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(CardServicesBlockPage.internalLink).toExist;  
        await expect(await $('.mt-16')).toHaveText(cardServicesBlockData.resiText) 
    });

  });
