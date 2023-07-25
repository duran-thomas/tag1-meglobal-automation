import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import ClinicalTrialBlockPage from '../../pageobjects/CMS/Components/clinicalTrial.page';
import {users} from '../../data/users.data';
import { clinicalTrialBlockData } from '../../data/clinicalTrial.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Clinical Trial Component Tests', () => {
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
        const screenshotPath = `./screenshots/ClinicalTrial/${testName}.png`;
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

     
    it('[S3C819] Verify that a site Content Administrator can create a Card Clinical Trial Component.', async () => {
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardClinicalTrial).scrollIntoView();
        (await QALayoutPage.btnCardClinicalTrial).click();
        (await ClinicalTrialBlockPage.configBlock).waitForDisplayed();

        await ClinicalTrialBlockPage.createCardClinicalTrial(clinicalTrialBlockData.mainTitle, clinicalTrialBlockData.title, clinicalTrialBlockData.tag1, clinicalTrialBlockData.tag2, clinicalTrialBlockData.tag3, clinicalTrialBlockData.link, clinicalTrialBlockData.strDate, clinicalTrialBlockData.condition1, clinicalTrialBlockData.condition2);

        await expect(ClinicalTrialBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ClinicalTrialBlockPage.clinicalCardElement).scrollIntoView();
        
        await expect(ClinicalTrialBlockPage.clinicalCardElement).toExist; 
        await expect(await $('h2.mb-16')).toHaveTextContaining(clinicalTrialBlockData.title);   
    });

    it('[S3C820] Verify that a site Content Administrator can create a Card Clinical Trial Component, using an internal url', async () => {
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardClinicalTrial).scrollIntoView();
        (await QALayoutPage.btnCardClinicalTrial).click();
        (await ClinicalTrialBlockPage.configBlock).waitForDisplayed();

        await ClinicalTrialBlockPage.createCardClinicalTrialInternalUrl(clinicalTrialBlockData.mainTitle, clinicalTrialBlockData.title, clinicalTrialBlockData.tag1, clinicalTrialBlockData.tag2, clinicalTrialBlockData.tag3, clinicalTrialBlockData.strDate, clinicalTrialBlockData.condition1, clinicalTrialBlockData.condition2);

        await expect(ClinicalTrialBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ClinicalTrialBlockPage.clinicalCardElement).scrollIntoView();
        
        await expect(ClinicalTrialBlockPage.clinicalCardElement).toExist; 
        await expect(await $('h2.mb-16')).toHaveTextContaining(clinicalTrialBlockData.title);   
    });
  
  

  });
