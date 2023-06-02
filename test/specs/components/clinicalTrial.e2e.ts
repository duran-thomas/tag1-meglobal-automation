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
        const screenshotPath = `./screenshots/ClinicalTrial/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
    it('Verify that a site Content Administrator can create a Card Clinical Trial Component.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardClinicalTrial).scrollIntoView();
        (await QALayoutPage.btnCardClinicalTrial).click();
        (await ClinicalTrialBlockPage.configBlock).waitForDisplayed();

        await ClinicalTrialBlockPage.createCardClinicalTrial(clinicalTrialBlockData.mainTitle, clinicalTrialBlockData.title, clinicalTrialBlockData.tag1, clinicalTrialBlockData.tag2, clinicalTrialBlockData.tag3, clinicalTrialBlockData.link, clinicalTrialBlockData.strDate, clinicalTrialBlockData.condition1, clinicalTrialBlockData.condition2);

        expect(ClinicalTrialBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ClinicalTrialBlockPage.clinicalCardElement).scrollIntoView();
        
        expect(await ClinicalTrialBlockPage.clinicalCardElement).toExist; 
        expect((await ClinicalTrialBlockPage.clinicalCardElement).getText).toHaveTextContaining(clinicalTrialBlockData.mainTitle);   
    });

    it('Verify that a site Content Administrator can create a Card Clinical Trial Component, using an internal url', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardClinicalTrial).scrollIntoView();
        (await QALayoutPage.btnCardClinicalTrial).click();
        (await ClinicalTrialBlockPage.configBlock).waitForDisplayed();

        await ClinicalTrialBlockPage.createCardClinicalTrialInternalUrl(clinicalTrialBlockData.mainTitle, clinicalTrialBlockData.title, clinicalTrialBlockData.tag1, clinicalTrialBlockData.tag2, clinicalTrialBlockData.tag3, clinicalTrialBlockData.strDate, clinicalTrialBlockData.condition1, clinicalTrialBlockData.condition2);

        expect(ClinicalTrialBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ClinicalTrialBlockPage.clinicalCardElement).scrollIntoView();
        
        expect(await ClinicalTrialBlockPage.clinicalCardElement).toExist; 
        expect((await ClinicalTrialBlockPage.clinicalCardElement).getText).toHaveTextContaining(clinicalTrialBlockData.mainTitle);   
    });
  
  

  });
