import LoginPage from '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import QuickActionsBlockPage from '../../pageobjects/CMS/Components/quickActions.page';
import { quickActionsBlockData } from '../../data/quickActions.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';



describe('Quick Actions Component Tests', () => {

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

    before(async function () {
        global.suiteDescription = this.currentTest?.parent?.title;
        //navigate to admin content page
        await AdminContentPage.open();
        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getTestPage(global.suiteDescription);
        await expect(QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function () {
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/QuickActions/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //clean up job
    after(async function() { 
        await QuickActionsBlockPage.cleanUp();
        await expect(QuickActionsBlockPage.statusMsg).toBeDisplayedInViewport();
        await expect(QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.deleted);

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


    it('[S3C924] Verify that a Content Administrator can create a Quick Actions menu component with an external link', async () => {
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
        await browser.refresh();
        await (await QALayoutPage.linkAddBlock).waitForExist();
        await (await QALayoutPage.linkAddBlock).scrollIntoView();
        await (await QALayoutPage.linkAddBlock).click();
        await (await QALayoutPage.linkQuickActions).click();
        await QuickActionsBlockPage.createQuickAction(quickActionsBlockData.actionTitle, quickActionsBlockData.headline);
        await expect(QuickActionsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await QuickActionsBlockPage.quickActionsElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(QuickActionsBlockPage.quickActionsElement).toBeDisplayedInViewport();
        await expect(QuickActionsBlockPage.quickActionsButton).toHaveHref(quickActionsBlockData.extLink);

        //clear above
        await QuickActionsBlockPage.cleanUp();
        await expect(QuickActionsBlockPage.statusMsg).toBeDisplayedInViewport();
        await expect(QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.deleted);

    });

    it('[S3C1123] Verify that a site Content Administrator can create a Quick Actions Component with an internal link.', async () => {
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
        await browser.refresh();
        await (await QALayoutPage.linkAddBlock).waitForExist();
        await (await QALayoutPage.linkAddBlock).scrollIntoView();
        await (await QALayoutPage.linkAddBlock).click();
        await (await QALayoutPage.linkQuickActions).click();
        await QuickActionsBlockPage.createQuickAction(quickActionsBlockData.actionTitle, quickActionsBlockData.headline);
        await expect(QuickActionsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await QuickActionsBlockPage.quickActionsElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(QuickActionsBlockPage.quickActionsElement).toBeDisplayedInViewport();
        await expect(QuickActionsBlockPage.quickActionsButton).toHaveHref(quickActionsBlockData.intLink);

    });



});
