import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import HeroBlockPage from '../../pageobjects/CMS/Components/hero.page';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
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
    })

    afterEach(async function() { //TODO: This needs some checking out. The screenshots that it create seem to be taken a bit too early in the execution?
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Hero/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    after(async () => {
        //delete hero pages from tests executed
        await cleanJob();
        
    })

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
    it('Verify that a site Content Administrator can create a Hero Component with an Image Media Type', async () => {
        await (await AdminContentPage.btnAddContent).click();
        await (await AdminContentPage.linkLandingPage).click();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await HeroBlockPage.createComponentWithImage(heroBlockData.title, heroBlockData.headline, heroBlockData.eyebrow, heroBlockData.intro, heroBlockData.content, heroBlockData.btnText, heroBlockData.url,imageFilePath, heroBlockData.altText);
        
        await expect(HeroBlockPage.successMsg).toBeDisplayed();
        await (await HeroBlockPage.headlineElement).scrollIntoView();
        expect(((await HeroBlockPage.titleBlockElement).getText)).toHaveTextContaining(heroBlockData.title);

        //Verify that the Hero Headline is rendered as a `h1` HTML element.
        const tagName = await HeroBlockPage.headlineElement.getTagName();
        expect(tagName).toBe('h1');
    });

    it('Verify that a site Content Administrator can create a Hero Component with a Video Media Type', async () => {
        await (await AdminContentPage.btnAddContent).click();
        await (await AdminContentPage.linkLandingPage).click();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleVideo.mp4');
        await HeroBlockPage.createComponentWithVideo(heroBlockData.title, heroBlockData.headline, heroBlockData.eyebrow, heroBlockData.intro, heroBlockData.content, heroBlockData.btnText, heroBlockData.url,imageFilePath, heroBlockData.altText);
        
        await expect(HeroBlockPage.successMsg).toBeDisplayed();
        await (await HeroBlockPage.headlineElement).scrollIntoView();
        expect(((await HeroBlockPage.titleBlockElement).getText)).toHaveTextContaining(heroBlockData.title);
       
    });

    it('Verify that a site Content Administrator can not create a Hero Component in the Default Paragraph.', async () => {
        await AdminContentPage.open();
        await AdminContentPage.getQALandingPage();
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnDefault).scrollIntoView();
        await (await QALayoutPage.btnDefault).click();
        (await HeroBlockPage.configBlock).waitForDisplayed();
        await HeroBlockPage.switchIntoFrame();

        const ulElement = await $('.dropbutton.dropbutton--small.dropbutton--multiple');
        const listElements = await ulElement.$$('li'); // Get all list elements within the unordered list element

        let isValuePresent = false;

        for (const element of listElements) {
        const text = await element.getText();
        if (text.includes('Hero')) {
            isValuePresent = true;
            break;
        }
        }

        expect(isValuePresent).toBe(false); // Assert that the value is not present in any list element
    });



  });
