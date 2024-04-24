import LoginPage from '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import QuickActionsBlockPage from '../../pageobjects/CMS/Components/quickActions.page';
import { quickActionsBlockData } from '../../data/quickActions.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";

describe('Quick Actions Component Tests', () => {

before(async () => {
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
    after(async function () {
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);
        //await browser.url(environment.baseUrl+'user/logout');
        await browser.setCookies(environment.admin);
        await AdminContentPage.open();
        await AdminContentPage.deleteTestPage('Quick Action test node');
        await expect($('.mf-alert__container--highlight')).toBeDisplayed();

        await QuickActionsBlockPage[openCleanUpMethod]();


        //await QuickActionsBlockPage.cleanUp();
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

    // Determine the appropriate menu and node method based on the environment
    const openMenusMethod = getOpenMenusMethod(process.env.ENV);
    const openNodesMethod = getOpenNodesMethod(process.env.ENV);
    const openCleanUpMethod = getCleanUp(process.env.ENV);

    it('[S3C924] Verify that a Content Administrator can create a Quick Actions menu component with an external link', async () => {
        const id=`QuickActions-S3C924-${Date.now()}`;
        // Call open menus method
        await QuickActionsBlockPage[openMenusMethod]();
        await QuickActionsBlockPage.createMenu(quickActionsBlockData.title);
        expect(await QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.menuSucess);

        //add link to menu
        await QuickActionsBlockPage[openMenusMethod]();
        await QuickActionsBlockPage.addLinkToMenu(quickActionsBlockData.extMenuLinkTitle, quickActionsBlockData.extLink);
        expect(await QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.linkSuccess);

        //create node
        await QuickActionsBlockPage[openNodesMethod]();
        await QuickActionsBlockPage.createNode(quickActionsBlockData.nodeTitle);
        await expect(QuickActionsBlockPage.successMsg).toBeDisplayedInViewport();

        //create quick action component
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await browser.refresh();
        await (await QALayoutPage.linkAddBlock).waitForExist();
        await (await QALayoutPage.linkAddBlock).scrollIntoView({block: 'start'});
        await (await QALayoutPage.linkAddBlock).click();
        await (await QALayoutPage.linkQuickActions).scrollIntoView({block: 'start'});
        await (await QALayoutPage.linkQuickActions).click();
        await QuickActionsBlockPage.createQuickAction(quickActionsBlockData.actionTitle, quickActionsBlockData.headline);
        await expect(QuickActionsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await QuickActionsBlockPage.quickActionsElement(id)).scrollIntoView({block: 'start'});

        await expect(QuickActionsBlockPage.quickActionsElement(id)).toBeDisplayedInViewport();
        //await expect(QuickActionsBlockPage.quickActionsButton).toHaveHref(quickActionsBlockData.extLink);

        //Create assertion to account for environment differences
        const buttonHref = await QuickActionsBlockPage.quickActionsButton(id).getAttribute('href');

        if (buttonHref === quickActionsBlockData.extLink) {
          // Expectation: href matches extLink
          await expect(buttonHref).toEqual(quickActionsBlockData.extLink);
        } else if (buttonHref === quickActionsBlockData.devLink) {
          // Expectation: href matches devLink
          await expect(buttonHref).toEqual(quickActionsBlockData.devLink);
        } else {
          // Expectation: href doesn't match extLink or devLink
          throw new Error(`Expected href to be either '${quickActionsBlockData.extLink}' or '${quickActionsBlockData.devLink}', but got '${buttonHref}'`);
        }

});

    it('[S3C1123] Verify that a site Content Administrator can create a Quick Actions Component with an internal link.', async () => {
        const id=`QuickActions-S3C1123-${Date.now()}`;

        //create menu
        await QuickActionsBlockPage[openMenusMethod]();
        await QuickActionsBlockPage.createMenu(quickActionsBlockData.title);
        expect(await QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.menuSucess);

        //add link to menu
        await QuickActionsBlockPage[openMenusMethod]();
        await QuickActionsBlockPage.addLinkToMenu(quickActionsBlockData.intMenuLinkTitle, quickActionsBlockData.intLink);
        expect(await QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.linkSuccess);

        //create node
        await QuickActionsBlockPage[openNodesMethod]();
        await QuickActionsBlockPage.createNode(quickActionsBlockData.nodeTitle);
        await expect(QuickActionsBlockPage.successMsg).toBeDisplayedInViewport();

    //create quick action component
    await (await QALayoutPage.tabLayout).click();
    await QALayoutPage.createNewSection();
    await browser.refresh();
    await (await QALayoutPage.linkAddBlock).waitForExist();
    await (await QALayoutPage.linkAddBlock).scrollIntoView();
    await (await QALayoutPage.linkAddBlock).click();
    await (await QALayoutPage.linkQuickActions).scrollIntoView({block: 'start'});
    await (await QALayoutPage.linkQuickActions).click();
    await QuickActionsBlockPage.createQuickAction(quickActionsBlockData.actionTitle, quickActionsBlockData.headline);
    await expect(QuickActionsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await QuickActionsBlockPage.quickActionsElement(id)).scrollIntoView({block: 'start'});

        await expect(QuickActionsBlockPage.quickActionsElement(id)).toBeDisplayedInViewport();
        //await expect(QuickActionsBlockPage.quickActionsButton).toHaveHref(quickActionsBlockData.intLink);
        
        //Create assertion to account for environment differences
        const buttonHref = await QuickActionsBlockPage.quickActionsButton(id).getAttribute('href');

        if (buttonHref === quickActionsBlockData.intLink) {
          // Expectation: href matches intLink
          await expect(buttonHref).toEqual(quickActionsBlockData.intLink);
        } else if (buttonHref === quickActionsBlockData.devLink) {
          // Expectation: href matches devLink
          await expect(buttonHref).toEqual(quickActionsBlockData.devLink);
        } else {
          // Expectation: href doesn't match intLink or devLink
          throw new Error(`Expected href to be either '${quickActionsBlockData.intLink}' or '${quickActionsBlockData.devLink}', but got '${buttonHref}'`);
        }
        
    });

    it('[S3C1322] Verify that Analytics for the Quick Actions Component is configured', async () => {
        const id=`QuickActions-S3C1322-${Date.now()}`;

        //create menu
        await QuickActionsBlockPage[openMenusMethod]();
        await QuickActionsBlockPage.createMenu(quickActionsBlockData.title);
        expect(await QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.menuSucess);

        //add link to menu
        await QuickActionsBlockPage[openMenusMethod]();
        await QuickActionsBlockPage.addLinkToMenu(quickActionsBlockData.extMenuLinkTitle, quickActionsBlockData.extLink);
        expect(await QuickActionsBlockPage.statusMsg).toHaveTextContaining(quickActionsBlockData.statMsg.linkSuccess);

        //create node
        await QuickActionsBlockPage[openNodesMethod]();
        await QuickActionsBlockPage.createNode(quickActionsBlockData.nodeTitle);
        await expect(QuickActionsBlockPage.successMsg).toBeDisplayedInViewport();

    //create quick action component
    await (await QALayoutPage.tabLayout).click();
    await QALayoutPage.createNewSection();
    await browser.refresh();
    await (await QALayoutPage.linkAddBlock).waitForExist();
    await (await QALayoutPage.linkAddBlock).scrollIntoView();
    await (await QALayoutPage.linkAddBlock).click();
    await (await QALayoutPage.linkQuickActions).scrollIntoView({block: 'start'});
    await (await QALayoutPage.linkQuickActions).click();
    await QuickActionsBlockPage.createQuickAction(quickActionsBlockData.actionTitle, quickActionsBlockData.headline);
    await expect(QuickActionsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await QuickActionsBlockPage.quickActionsElement(id)).scrollIntoView({block: 'start'});

    const expectedAnalyticsData = {
        clickText: quickActionsBlockData.extMenuLinkTitle,
        event: 'e_navigationClick',
        linkType: 'button',
        navigationType: 'quick actions'
    }

    const currentUrl = await browser.getUrl();

    await $('a[data-analytics-click-text="Test External Link"]').click();
    await browser.switchWindow(currentUrl);

    const dataLayer = await browser.executeScript('return window.dataLayer', []);
    const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_navigationClick");
    let parsedAnalyticsData = []

    for (let x in actualAnalyticsData) {
        parsedAnalyticsData.push({
            clickText: actualAnalyticsData[x].clickText,
            event: actualAnalyticsData[x].event,
            linkType: actualAnalyticsData[x].linkType,
            navigationType: actualAnalyticsData[x].navigationType
        })
    }

    fs.writeFile('analyticsTestEvidence/quickActions.json', JSON.stringify(dataLayer), err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });

        const screenshotPath = `./screenshots/QuickActions/Verify that Analytics for the Quick Actions Component is configured.png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedAnalyticsData[0]).toEqual(expectedAnalyticsData);
    });

    // Helper functions to determine the appropriate menu and node method based on the environment
    function getOpenMenusMethod(env) {
        const envToMethodMap = {
            dev: 'openDevMenus',
            qaAuto: 'openMenus'
        };

        return envToMethodMap[env];
    }

    function getOpenNodesMethod(env) {
        const envToMethodMap = {
            dev: 'openDevNodes',
            qaAuto: 'openNodes'
        };

        return envToMethodMap[env];
    }

    function getCleanUp(env) {
        const envToMethodMap = {
            dev: 'devCleanUp',
            qaAuto: 'cleanUp'
        };

        return envToMethodMap[env];
    }

});