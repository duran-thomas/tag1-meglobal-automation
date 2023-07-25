import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import QuickActionsBlockPage from '../../pageobjects/CMS/Components/quickActions.page';
import {users} from '../../data/users.data';
import { quickActionsBlockData } from '../../data/quickActions.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Quick Actions Component Tests', () => {
    before(async () => {
        // Bypass AlertPrompt
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
        const screenshotPath = `./screenshots/QuickActions/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //clean up job
    afterEach(async function() { 
        // Get the current test result
        const testResult = this.currentTest;

        // Check if the test passed
        if (testResult.state === 'passed') {
            await QuickActionsBlockPage.cleanUp();
            await expect(QuickActionsBlockPage.statusMsg).toBeDisplayedInViewport();
            await expect(QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.deleted);

        }
    });

   
    it('[S3C924] Verify that a site Content Administrator can create a Quick Actions Component with an external link.', async () => {
        //create menu
        await QuickActionsBlockPage.openMenus();
        await QuickActionsBlockPage.createMenu(quickActionsBlockData.title);
        expect(await QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.menuSucess);

        //add link to menu
        await QuickActionsBlockPage.openMenus();
        await QuickActionsBlockPage.addLinkToMenu(quickActionsBlockData.extMenuLinkTitle, quickActionsBlockData.extLink);
        expect(await QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.linkSuccess);

        //create node
        await QuickActionsBlockPage.openNodes();
        await QuickActionsBlockPage.createNode(quickActionsBlockData.nodeTitle);
        await expect(QuickActionsBlockPage.successMsg).toBeDisplayedInViewport();

        //create quick action component
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        (await QALayoutPage.linkAddBlock).click();
        (await QALayoutPage.linkQuickActions).click();
        await QuickActionsBlockPage.createQuickAction(quickActionsBlockData.actionTitle, quickActionsBlockData.headline);
        await expect(QuickActionsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await QuickActionsBlockPage.quickActionsElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(QuickActionsBlockPage.quickActionsElement).toBeDisplayedInViewport();
        await expect(QuickActionsBlockPage.quickActionsButton).toHaveHref(quickActionsBlockData.extLink);
   
    });

    it('[S3C925] Verify that a site Content Administrator can create a Quick Actions Component with an internal link.', async () => {
        //create menu
        await QuickActionsBlockPage.openMenus();
        await QuickActionsBlockPage.createMenu(quickActionsBlockData.title);
        expect(await QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.menuSucess);

        //add link to menu
        await QuickActionsBlockPage.openMenus();
        await QuickActionsBlockPage.addLinkToMenu(quickActionsBlockData.intMenuLinkTitle, quickActionsBlockData.intLink);
        expect(await QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.linkSuccess);

        //create node
        await QuickActionsBlockPage.openNodes();
        await QuickActionsBlockPage.createNode(quickActionsBlockData.nodeTitle);
        await expect(QuickActionsBlockPage.successMsg).toBeDisplayedInViewport();

        //create quick action component
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        (await QALayoutPage.linkAddBlock).click();
        (await QALayoutPage.linkQuickActions).click();
        await QuickActionsBlockPage.createQuickAction(quickActionsBlockData.actionTitle, quickActionsBlockData.headline);
        await expect(QuickActionsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await QuickActionsBlockPage.quickActionsElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(QuickActionsBlockPage.quickActionsElement).toBeDisplayedInViewport();
        await expect(QuickActionsBlockPage.quickActionsButton).toHaveHref(quickActionsBlockData.intLink);
   
    });



  });
