import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import FreeformBlockPage from '../../pageobjects/CMS/Components/freeform.page';
import {users} from '../../data/users.data';
import * as data from '../../data/freeform.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';

describe('Freeform Component Tests', () => {
    before(async () => {
        //Login
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
    });

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Freeform/${testName}.png`;
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
        await AdminContentPage.open();
        await AdminContentPage.deleteTestPage(global.suiteDescription);
        await expect($('.mf-alert__container--highlight')).toBeDisplayed();
    });

    

  
    it('[S3C1011] Verify that a site Content Administrator can create a Freeform Component with an Accordion block)', async () => {
        const titleID = data.accordionFreeformData.title.replace(/\s+/g, '-').toLowerCase();
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformAccordion(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.accordionFreeformData.title, data.accordionFreeformData.content);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.btnAccordion).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect($(`button#${titleID}`)).toBeExisting();

    });

    it('[S3C1012] Verify that a site Content Administrator can create a Freeform Component with a Button)', async () => {
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformButton(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.buttonFreeformData.text, data.buttonFreeformData.url, data.buttonFreeformData.text1, data.buttonFreeformData.url1, data.buttonFreeformData.text2, data.buttonFreeformData.url2);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect($(`a[href="${data.buttonFreeformData.url}"]`)).toBeExisting();
        await expect($(`a[href="${data.buttonFreeformData.url1}"]`)).toBeExisting();
        await expect($(`a[href="${data.buttonFreeformData.url2}"]`)).toBeExisting();

    });

    it('[S3C1013] Verify that a site Content Administrator can create a Freeform Component with a Divider)', async () => {
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformDivider(data.freeformBlockData.adminTitle, data.freeformBlockData.headline);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await FreeformBlockPage.dividerElement).toBeExisting();

    });


  });
