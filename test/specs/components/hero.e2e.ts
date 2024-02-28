import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import HeroBlockPage from '../../pageobjects/CMS/Components/hero.page';
import { heroBlockData } from '../../data/hero.data';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";




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
        const id=`Hero-S3C821-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnHero).scrollIntoView();
        await (await QALayoutPage.btnHero).click();
        await (await HeroBlockPage.configBlock).waitForDisplayed();


        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await HeroBlockPage.createComponentWithImage(heroBlockData.title, heroBlockData.headline, heroBlockData.eyebrow, heroBlockData.intro, heroBlockData.content, heroBlockData.btnText, heroBlockData.url,imageFilePath, heroBlockData.altText);
        
        await expect(HeroBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        
        await (await HeroBlockPage.headlineElement(id)).scrollIntoView();
        const elem = await HeroBlockPage.headlineElement(id);
        await expect(elem).toHaveTextContaining(heroBlockData.headline);

    });

    it('[S3C822] Verify that a site Content Administrator can create a Hero Component with a Video Media Type', async () => {
        const id=`Hero-S3C822-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnHero).scrollIntoView();
        (await QALayoutPage.btnHero).click();
        (await HeroBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleVideo.mp4');
        await HeroBlockPage.createComponentWithVideo(heroBlockData.title, heroBlockData.headline, heroBlockData.eyebrow, heroBlockData.intro, heroBlockData.content, heroBlockData.btnText, heroBlockData.url,imageFilePath, heroBlockData.altText);
        
        await expect(HeroBlockPage.successMsg).toBeDisplayed();
        await QALayoutPage.goToPageView();

        await (await HeroBlockPage.headlineElement(id)).scrollIntoView();
        const elem = await HeroBlockPage.headlineElement(id);
        await expect(elem).toHaveTextContaining(heroBlockData.headline);
       
    });

    it('[S3C823] Verify that the Hero Headline is rendered as a `h1` HTML element.', async () => {
        const id=`Hero-S3C823-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnHero).scrollIntoView();
        await (await QALayoutPage.btnHero).click();
        await (await HeroBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await HeroBlockPage.createComponentWithImage(heroBlockData.title, heroBlockData.headline, heroBlockData.eyebrow, heroBlockData.intro, heroBlockData.content, heroBlockData.btnText, heroBlockData.url,imageFilePath, heroBlockData.altText);
        
        await expect(HeroBlockPage.successMsg).toBeDisplayed();
        await QALayoutPage.goToPageView();

        await (await HeroBlockPage.headlineElement(id)).scrollIntoView();

        const tagName = await HeroBlockPage.headlineElement(id).getTagName();
        expect(tagName).toBe('h1');
    });

    it('[S3C1105] Verify that Analytics for the Hero Component is configured', async () => {
        const id=`Hero-S3C1105-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnHero).scrollIntoView();
        await (await QALayoutPage.btnHero).click();
        await (await HeroBlockPage.configBlock).waitForDisplayed();


        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await HeroBlockPage.createHeroAnalytics(heroBlockData.title, heroBlockData.headline, heroBlockData.eyebrow, heroBlockData.intro, heroBlockData.content, heroBlockData.btnText, heroBlockData.url,imageFilePath, heroBlockData.altText);
        
        await expect(HeroBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        
        await (await HeroBlockPage.headlineElement(id)).scrollIntoView();
        const elem = await HeroBlockPage.headlineElement(id);
        await expect(elem).toHaveTextContaining(heroBlockData.headline);

        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g23a9f051951_1_185
         * */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'hero',
            itemTitle: heroBlockData.headline,
            linkType: 'button',
            clickText: heroBlockData.btnText,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        // Interact with the button to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`#${id} a[data-analytics-click-text="${heroBlockData.btnText}"]`)).click();

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

        fs.writeFile('analyticsTestEvidence/hero.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/Hero/Verify that Analytics for the Hero Component is configured..png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);


    });



  });
