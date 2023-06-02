import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import MapBlockPage from '../../pageobjects/CMS/Components/map.page';
import {users} from '../../data/users.data';
import { mapBlockData } from '../../data/map.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Map Component Tests', () => {
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
        await AdminContentPage.getQALandingPage();  //TODO: This function may need some checking out. When its run with all tests at once. I don't think it behaves as expected.
        expect(await QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { //TODO: This needs some checking out. The screenshots that it create seem to be taken a bit too early in the execution?
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Map/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
    it('[S3C872] Verify that a site Content Administrator can create a Map Component', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnMap).scrollIntoView();
        (await QALayoutPage.btnMap).click();
        (await MapBlockPage.configBlock).waitForDisplayed();

        await MapBlockPage.createMap(mapBlockData.title, mapBlockData.highlightTitle, mapBlockData.mapConfig);

        expect(MapBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();

        await (await MapBlockPage.mapElement).scrollIntoView();
        expect(await MapBlockPage.mapElement).toBeDisplayed(); 

        //dismiss google alert for clean screenshot
        (await $('.dismissButton')).click(); 
    });


    it('[S3C873] Verify that all design fields are present with the correct available options.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnMap).scrollIntoView();
        (await QALayoutPage.btnMap).click();
        (await MapBlockPage.configBlock).waitForDisplayed();

        await MapBlockPage.navToStyling();

        const hideLocationCheckbox = await MapBlockPage.checkboxHideLocationCards;
        await hideLocationCheckbox.scrollIntoView();
        expect(await hideLocationCheckbox).toBeDisplayed();
        expect(await hideLocationCheckbox.isSelected()).toBe(false);
    });

  });
