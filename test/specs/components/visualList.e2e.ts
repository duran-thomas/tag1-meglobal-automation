import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import VisualListBlockPage from '../../pageobjects/CMS/Components/visualList.page';
import {users} from '../../data/users.data';
import { visualListBlockData } from '../../data/visualList.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Visual List Component Tests', () => {
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
        const screenshotPath = `./screenshots/VisualList/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
    it.skip('[S3C832] Verify that a site Content Administrator can create a Visual List Component with a Simple visual list item paragraph', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnVisualList).scrollIntoView();
        (await QALayoutPage.btnVisualList).click();
        (await VisualListBlockPage.configBlock).waitForDisplayed();
        await VisualListBlockPage.createVisualComponentWithSimpleList(visualListBlockData.mainTitle, visualListBlockData.itemTitle, visualListBlockData.link, visualListBlockData.description);
        
        await QALayoutPage.goToPageView();
        await (await VisualListBlockPage.visualListElement).scrollIntoView();

        expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(visualListBlockData.mainTitle);
        expect(await VisualListBlockPage.visualListElement).toExist();  
        
    });

  });
