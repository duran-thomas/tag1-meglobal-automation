import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import HeroBlockPage from '../../pageobjects/CMS/Components/hero.page';
import { heroBlockData } from '../../data/hero.data';
import { getEnvironmentConfig } from '../../../envSelector';



describe('Hero Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/Hero/${testName}.png`;
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

     
    it('[S3C821] Verify that a site Content Administrator can create a Hero Component with an Image Media Type', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnHero).scrollIntoView();
        (await QALayoutPage.btnHero).click();
        (await HeroBlockPage.configBlock).waitForDisplayed();


        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await HeroBlockPage.createComponentWithImage(heroBlockData.title, heroBlockData.headline, heroBlockData.eyebrow, heroBlockData.intro, heroBlockData.content, heroBlockData.btnText, heroBlockData.url,imageFilePath, heroBlockData.altText);
        
        await expect(HeroBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        
        await (await HeroBlockPage.headlineElement).scrollIntoView();
        const elem = await HeroBlockPage.headlineElement;
        await expect(elem).toHaveTextContaining(heroBlockData.headline);

    });

    it('[S3C822] Verify that a site Content Administrator can create a Hero Component with a Video Media Type', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnHero).scrollIntoView();
        (await QALayoutPage.btnHero).click();
        (await HeroBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleVideo.mp4');
        await HeroBlockPage.createComponentWithVideo(heroBlockData.title, heroBlockData.headline, heroBlockData.eyebrow, heroBlockData.intro, heroBlockData.content, heroBlockData.btnText, heroBlockData.url,imageFilePath, heroBlockData.altText);
        
        await expect(HeroBlockPage.successMsg).toBeDisplayed();
        await QALayoutPage.goToPageView();

        await (await HeroBlockPage.headlineElement).scrollIntoView();
        const elem = await HeroBlockPage.headlineElement;
        await expect(elem).toHaveTextContaining(heroBlockData.headline);
       
    });

    it('[S3C823] Verify that the Hero Headline is rendered as a `h1` HTML element.', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnHero).scrollIntoView();
        (await QALayoutPage.btnHero).click();
        (await HeroBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await HeroBlockPage.createComponentWithImage(heroBlockData.title, heroBlockData.headline, heroBlockData.eyebrow, heroBlockData.intro, heroBlockData.content, heroBlockData.btnText, heroBlockData.url,imageFilePath, heroBlockData.altText);
        
        await expect(HeroBlockPage.successMsg).toBeDisplayed();
        await QALayoutPage.goToPageView();

        await (await HeroBlockPage.headlineElement).scrollIntoView();

        const tagName = await HeroBlockPage.headlineElement.getTagName();
        expect(tagName).toBe('h1');
    });



  });
