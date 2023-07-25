import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import SectionHeaderBlockPage from '../../pageobjects/CMS/Components/sectionHeader.page';
import {users} from '../../data/users.data';
import { sectionHeaderBlockData } from '../../data/sectionHeader.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Section Header Component Tests', () => {
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
        const screenshotPath = `./screenshots/SectionHeader/${testName}.png`;
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

     
    it('[S3C865] Verify that a site Content Administrator can create a Section Header Component', async () => {
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnSectionHeader).scrollIntoView();
        (await QALayoutPage.btnSectionHeader).click();
        (await SectionHeaderBlockPage.configBlock).waitForDisplayed();

        await SectionHeaderBlockPage.createSectionHeader(sectionHeaderBlockData.title, sectionHeaderBlockData.headline, sectionHeaderBlockData.content, sectionHeaderBlockData.btnText, sectionHeaderBlockData.btnUrl, sectionHeaderBlockData.linkText, sectionHeaderBlockData.linkUrl);

        expect(SectionHeaderBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await SectionHeaderBlockPage.sectionHeaderElement).scrollIntoView();
        
        await expect(SectionHeaderBlockPage.sectionHeaderElement).toExist; 
        expect(await SectionHeaderBlockPage.sectionHeaderElement).toHaveTextContaining(sectionHeaderBlockData.headline);   
    });


    it('[S3C866] Verify that all design fields are present with the correct available options.', async () => {
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnSectionHeader).scrollIntoView();
        (await QALayoutPage.btnSectionHeader).click();
        (await SectionHeaderBlockPage.configBlock).waitForDisplayed();

        await SectionHeaderBlockPage.navToStyling()

        const minimalCheckbox = await SectionHeaderBlockPage.checkboxMinimal;
        await minimalCheckbox.scrollIntoView();
        await expect(minimalCheckbox).toBeDisplayed();
        await expect(await minimalCheckbox.isSelected()).toBe(false);
    });

  });
