import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CardGeneralBlockPage from '../../pageobjects/CMS/Components/cardGeneral.page';
import { cardGeneralBlockData } from '../../data/cardGeneral.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';


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

  
    it('[S3C860] Verify that a site Content Administrator can create a  Card - General Component.', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardGeneral).scrollIntoView();
        await (await QALayoutPage.btnCardGeneral).click();
        await (await CardGeneralBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardGeneralBlockPage.createCardGeneral(cardGeneralBlockData.title, cardGeneralBlockData.headline, cardGeneralBlockData.eyebrow, cardGeneralBlockData.list, cardGeneralBlockData.btnText, cardGeneralBlockData.url,imageFilePath, cardGeneralBlockData.altText);

        await expect(CardGeneralBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardGeneralBlockPage.cardEyebrow).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await CardGeneralBlockPage.cardEyebrow).toHaveText(cardGeneralBlockData.eyebrow); 
        await expect(CardGeneralBlockPage.cardGeneralElement).toBeExisting();   
    });

  });
