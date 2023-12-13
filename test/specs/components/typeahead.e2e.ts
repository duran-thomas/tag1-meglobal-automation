import LoginPage from '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import TypeaheadBlockPage from '../../pageobjects/CMS/Components/typeahead.page';
import {typeaheadBlockData} from '../../data/typeahead.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
const assert = require('assert');


describe('Typeahead Component Tests', () => {
    const environment = getEnvironmentConfig(process.env.ENV);
    const baseURL = environment.baseUrl;

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
   
            // Function to generate a specified length random characters
    const generateRandomString = (length) => {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

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

    it('[S3C1131] Verify typeahead in the search box provides relevant suggestions based on user input', async () => {
        await browser.url(await `${baseURL}search`);
        await browser.pause(3000)

        await (await TypeaheadBlockPage.inputSearch).click()
        await (await TypeaheadBlockPage.inputSearch).setValue('h')
        await browser.pause(1000)
        
        const results = await TypeaheadBlockPage.resultList

        // Filter out blank results
        const filteredResults = [];

        for (const result of results) {
            const resultText = await result.getText();
            const trimmedText = resultText.trim();

            // Check if the trimmed text is not empty
            if (trimmedText !== '') {
                filteredResults.push(result);
            }
        }

        for (const result of filteredResults) {
            const resultText = await result.getText();
            const wordsInResult = resultText.split(' ');

            // Check the first letter of each word
            for (const word of wordsInResult) {
                assert.strictEqual(word.charAt(0), 'h');
            }
        }
    });

    it('Verify typeahead for global navigation search provides relevant suggestions based in user input', async () => {
        await browser.url(await baseURL);
        await browser.pause(1000)
        await (await TypeaheadBlockPage.btnNavSearch).click()
        await (await TypeaheadBlockPage.inputNavSearch).setValue('h')
        await browser.pause(1000)
        
        const results = await TypeaheadBlockPage.resultList

        // Filter out blank results
        const filteredResults = [];

        for (const result of results) {
            const resultText = await result.getText();
            const trimmedText = resultText.trim();

            // Check if the trimmed text is not empty
            if (trimmedText !== '') {
                filteredResults.push(result);
            }
        }

        for (const result of filteredResults) {
            const resultText = await result.getText();
            const wordsInResult = resultText.split(' ');

            // Check the first letter of each word
            for (const word of wordsInResult) {
                assert.strictEqual(word.charAt(0), 'h');
            }
        }
    });

    it('[S3C1436] Verify search field maximum character limit', async() => {

        // Generate 105 characters 
        const testString = generateRandomString(105)

        await browser.url(await `${baseURL}search`);
        await browser.pause(3000)

        await (await TypeaheadBlockPage.inputSearch).click()
        await (await TypeaheadBlockPage.inputSearch).setValue(testString)
        const typedText = await TypeaheadBlockPage.inputSearch.getValue()

        const maxLength = await (await TypeaheadBlockPage.inputSearch).getAttribute('maxlength');

        await expect(typedText).toHaveLength(100);
        await expect(parseInt(maxLength)).toEqual(100);
    })

    it('Verify navigation search field maximum character limit', async() => {
        // Generate 105 characters 
        const testString = generateRandomString(105)

        await browser.url(await baseURL);
        await browser.pause(3000)

        await (await TypeaheadBlockPage.btnNavSearch).click()
        await (await TypeaheadBlockPage.inputNavSearch).setValue(testString)
        const typedText = await TypeaheadBlockPage.inputNavSearch.getValue()

        const maxLength = await (await TypeaheadBlockPage.inputNavSearch).getAttribute('maxlength');

        await expect(typedText).toHaveLength(100);
        await expect(parseInt(maxLength)).toEqual(100);
    })

});
