import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import TabsBlockPage from '../../pageobjects/CMS/Components/tabs.page';
import {users} from '../../data/users.data';
import { tabBlockData } from '../../data/tabs.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Tabs Component Tests', () => {
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
        await expect(QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Tabs/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        await AdminContentPage.getQALandingPage();
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getQALandingPage();  
    });
  
    it('[S3C911] Verify that a site Content Administrator can create a Tabs Component with a single Tab Item', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnTabs).scrollIntoView();
        (await QALayoutPage.btnTabs).click();
        (await TabsBlockPage.configBlock).waitForDisplayed();

        await TabsBlockPage.createTab(tabBlockData.title, tabBlockData.label, tabBlockData.name+' 1', tabBlockData.content+' 1');

        await expect(TabsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TabsBlockPage.tabElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(TabsBlockPage.tabPanel).toBeDisplayedInViewport();
        await expect(TabsBlockPage.tabPanel).toHaveTextContaining(tabBlockData.content+' 1'); 
    });

    it('[S3C912] Verify that a site Content Administrator can create a Tabs Component with a multiple Tab Item', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnTabs).scrollIntoView();
        (await QALayoutPage.btnTabs).click();
        (await TabsBlockPage.configBlock).waitForDisplayed();

        await TabsBlockPage.createMultiTab(tabBlockData.title, tabBlockData.label, tabBlockData.name+' 1', tabBlockData.content+' 1', tabBlockData.label+' 2', tabBlockData.name+' 2', tabBlockData.content+' 2');

        await expect(TabsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TabsBlockPage.tabElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(TabsBlockPage.tabPanel).toBeDisplayedInViewport();
        await expect(TabsBlockPage.tabPanel[1]).toHaveTextContaining(tabBlockData.content+' 2'); 
    });

   

  });
