import LoginPage from '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import TypeaheadBlockPage from '../../pageobjects/CMS/Components/typeahead.page';
import {typeaheadBlockData} from '../../data/typeahead.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import { generateRandomString } from '../../../utils/utils'
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

    it.only('[S3C1112] Verify Content Administrator can create a Typeahead with default settings', async () => {
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

    it.only('[S3C1126] Verify that typeahead returns accurate and relevant results based on user input', async () => {
        await (await TypeaheadBlockPage.typeaheadSearch).setValue(typeaheadBlockData.searchTerm);

        const results = await TypeaheadBlockPage.resultList

        results.forEach(async (result)=> {
            const resultText = await result.getText();
            const expectedText = typeaheadBlockData.searchTerm; 
            await expect(resultText).toContain(expectedText);
        })
    });

    it.only('[S3C1127] Verify the display of "No Results Found" message when no relevant suggestions are available', async () => {
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

    it('[S3C1481] Verify search field maximum character limit', async() => {

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
    //Skipping this test case as the result counts for the QA environment is incorrect
    it('Verify the display of total result count next to each tab', async () => {
        await browser.url(await `${baseURL}search`);
        await browser.pause(2000)
        await (await TypeaheadBlockPage.inputSearch).click()
        await (await TypeaheadBlockPage.inputSearch).setValue(typeaheadBlockData.searchWord);
        await (await TypeaheadBlockPage.searchBtn).click() 
        await browser.pause(2000)

        const searchResultCount = await (await TypeaheadBlockPage.btnSearchResultTabs)

        const patientCareTabCount = await (await searchResultCount[0].getText())
        const collegeOfMedTabCount = await (await searchResultCount[1].getText())
        const expectedResultsCount = await (await searchResultCount[2].getText())

        const totalResultCount = parseInt(patientCareTabCount) + parseInt(collegeOfMedTabCount)
        
        await expect(totalResultCount).toEqual(parseInt(expectedResultsCount))
    })

    it('Verify “Suggested spelling” for alternative search results when no results are found for the search keyword', async () => {
        await browser.url(await `${baseURL}search`);
        await browser.pause(2000)
        await (await TypeaheadBlockPage.inputSearch).click()
        await (await TypeaheadBlockPage.inputSearch).setValue(typeaheadBlockData.errorKeyword);
        await (await TypeaheadBlockPage.searchBtn).click() 

        await (await TypeaheadBlockPage.suggestedSearchTerm).waitForDisplayed();
        const suggestedSpelling = await (await TypeaheadBlockPage.suggestedSearchTerm).getText()

        await expect(suggestedSpelling).toEqual(typeaheadBlockData.correctKeyword)
    })

    it('Verify that “More results” button is displayed after the first 10 search results', async () => {
        await browser.url(await `${baseURL}search`);
        await browser.pause(2000)
        await (await TypeaheadBlockPage.inputSearch).click()
        await (await TypeaheadBlockPage.inputSearch).setValue(typeaheadBlockData.searchWord);
        await (await TypeaheadBlockPage.searchBtn).click()
        
        await browser.pause(2000)
        const results = await TypeaheadBlockPage.searchResultsHeader

        await expect(results.length).toEqual(10)
        await (await TypeaheadBlockPage.btnMoreResults).scrollIntoView()
        await expect(TypeaheadBlockPage.btnMoreResults).toBeDisplayed()
        await (await TypeaheadBlockPage.btnMoreResults).click()
        await browser.pause(4000)
        const updatedResults = await TypeaheadBlockPage.searchResultsHeader

        await expect(updatedResults.length).toEqual(20)
    })

    it('Verify the display of total count next to each filter on the filter sidesheet', async () => {
        await browser.url(await `${baseURL}search`);
        await browser.pause(2000)
        await (await TypeaheadBlockPage.inputSearch).click()
        await (await TypeaheadBlockPage.inputSearch).setValue(typeaheadBlockData.searchWord);
        await (await TypeaheadBlockPage.searchBtn).click()
        await browser.pause(2000)
        await (await TypeaheadBlockPage.btnFilter).click()
        await browser.pause(1000)
        //Verify that a number is present beside each filter option
        await expect(TypeaheadBlockPage.textFilterCounts).toExist()
    })
    //Search Page
    it('Verify the display of “No Results Found” message when no relevant suggestions are available', async () => {
        await browser.url(await `${baseURL}search`);
        await browser.pause(2000)
        await (await TypeaheadBlockPage.inputSearch).click()
        await (await TypeaheadBlockPage.inputSearch).setValue(typeaheadBlockData.invalidTerm);
        await expect($(`span=No results found for '${typeaheadBlockData.invalidTerm}'`)).toBeDisplayed();  
    })

    it('Verify the absence of Flyout Menu (Primary Navigation) on the %2Fsearch page', async () => {
        await browser.url(await baseURL);
        const flyoutNavLinks = await TypeaheadBlockPage.flyoutMenuItems

        for (const result of flyoutNavLinks) {
            await expect(result).toBeDisplayed()
        }
        await browser.url(await `${baseURL}search`);
        for (const result of flyoutNavLinks) {
            await expect(result).not.toBeDisplayed()
        }
    })
    //Search Page
    it('Verify the ability to search with a single filter', async () => {
        await browser.url(await `${baseURL}search`);
        await browser.pause(2000)
        await (await TypeaheadBlockPage.inputSearch).click()
        await (await TypeaheadBlockPage.inputSearch).setValue(typeaheadBlockData.searchWord);
        await (await TypeaheadBlockPage.searchBtn).click()
        await browser.pause(2000)
        const initialResultCount = await ((await TypeaheadBlockPage.resultCount).getText())
        await (await TypeaheadBlockPage.btnFilter).click()
        await (await TypeaheadBlockPage.checkboxFirstFilterItem).click()
        await (await TypeaheadBlockPage.btnApplyFilter).click()
        await browser.pause(2000)
        const newResultCount = await ((await TypeaheadBlockPage.resultCount).getText())
        await expect(parseInt(newResultCount)).toBeLessThan(parseInt(initialResultCount));
    })
});


