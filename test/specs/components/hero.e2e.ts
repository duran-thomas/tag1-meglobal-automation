import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import HeroBlockPage from '../../pageobjects/CMS/Components/hero.page';
import {users} from '../../data/users.data';
import { heroBlockData } from '../../data/hero.data';
import { cookieData } from '../../data/cookie.data';

async function cleanJob() {
    do {
      await AdminContentPage.open();
      await HeroBlockPage.deletePages();
      await AdminContentPage.open();
    } while (await (await HeroBlockPage.heroPageLink).isExisting());
  }

describe('Hero Component Tests', () => {
    before(async () => {
        // //Login
        await browser.url(await users.bypassUrl);
        await browser.maximizeWindow();

        // Set the cookie for a logged in user
        await browser.setCookies([
            {
              name: cookieData.name,
              value: cookieData.value,
              domain: cookieData.domain,
              path: cookieData.path,
            }
        ]);
    });

    beforeEach(async function() {
        //navigate to admin content page
        await AdminContentPage.open();
        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getQALandingPage();  
        expect(await QALayoutPage.tabLayout).toBeDisplayed();
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
        await AdminContentPage.getQALandingPage();
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        expect(await QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getQALandingPage();  
    });
  
    it('[S3C821] Verify that a site Content Administrator can create a Hero Component with an Image Media Type', async () => {
        (await QALayoutPage.tabLayout).click();
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
        expect(((await HeroBlockPage.titleBlockElement).getText)).toHaveTextContaining(heroBlockData.title);

    });

    it('[S3C822] Verify that a site Content Administrator can create a Hero Component with a Video Media Type', async () => {
        (await QALayoutPage.tabLayout).click();
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
        expect(((await HeroBlockPage.titleBlockElement).getText)).toHaveTextContaining(heroBlockData.title);
       
    });

    it('[S3C823] Verify that the Hero Headline is rendered as a `h1` HTML element.', async () => {
        (await QALayoutPage.tabLayout).click();
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
