import LoginPage from '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import TypeaheadBlockPage from '../../pageobjects/CMS/Components/typeahead.page';
import {typeaheadBlockData} from '../../data/typeahead.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';


describe('Typeahead Component Tests', () => {

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
    });

    afterEach(async function () {
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Typeahead/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
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
   

    it('[S3C1112] Verify Content Administrator can create a Typeahead with default settings', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await TypeaheadBlockPage.configBlock).waitForDisplayed();

        await TypeaheadBlockPage.createFreeformTypeahead(typeaheadBlockData.adminTitle, typeaheadBlockData.headline, typeaheadBlockData.label, typeaheadBlockData.placeholder);

        await expect(TypeaheadBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TypeaheadBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(TypeaheadBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $('.mf-typeahead')).toBeExisting();
        await expect(await $(`input[placeholder="${typeaheadBlockData.placeholder}"]`)).toBeExisting();
    });

    it('[S3C1126] Verify that typeahead returns accurate and relevant results based on user input', async () => {
        await (await TypeaheadBlockPage.typeaheadSearch).setValue(typeaheadBlockData.searchTerm);

        const results = await TypeaheadBlockPage.resultList

        results.forEach(async (result)=> {
            const resultText = await result.getText();
            const expectedText = typeaheadBlockData.searchTerm; 

            await expect(resultText).toContain(expectedText);
        })
    });

    it('[S3C1127] Verify the display of "No Results Found" message when no relevant suggestions are available', async () => {
        await (await TypeaheadBlockPage.typeaheadSearch).clearValue();
        await (await TypeaheadBlockPage.typeaheadSearch).setValue(typeaheadBlockData.invalidTerm);
        //Asserting the the college links to the Spanish version of the site
        await expect($(`span=No results found for '${typeaheadBlockData.invalidTerm}'`)).toBeDisplayed();
    });

});
