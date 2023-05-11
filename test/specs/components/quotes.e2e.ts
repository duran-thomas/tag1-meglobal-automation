import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import QuotesBlockPage from '../../pageobjects/CMS/Components/quotes.page';
import LandingPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import {users} from '../../data/users.data';
import { quoteBlockData } from '../../data/quote.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Quotes Component Tests', () => {
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
        expect(await LandingPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { //TODO: This needs some checking out. The screenshots that it create seem to be taken a bit too early in the execution?
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Quotes/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
    it('Verify that a site Content Administrator can create a Quotes Component with the border being shown, without audio', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnQuote).scrollIntoView();
        (await QALayoutPage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        await QuotesBlockPage.completeWithBorderNoAudio(quoteBlockData.title, quoteBlockData.quoteWithBorderNoAudio, quoteBlockData.author, quoteBlockData.authorTitle);
        
        expect(await (await QuotesBlockPage.borderElement).getText).toHaveText(quoteBlockData.quoteWithBorderNoAudio);
        expect(await QuotesBlockPage.borderElement).toBeDisplayed();  
        await QALayoutPage.goToPageView();
        await (await QuotesBlockPage.borderElement).scrollIntoView();
        browser.pause(3000); 
    });
  
    it('Verify that a site Content Administrator can create a Quotes Component without the border being shown', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnQuote).scrollIntoView();
        (await QALayoutPage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        await QuotesBlockPage.completeWithoutBorder(quoteBlockData.title, quoteBlockData.quoteWithoutBorder, quoteBlockData.author, quoteBlockData.authorTitle);
        await QALayoutPage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView();
        expect(await (await QuotesBlockPage.quoteElement).getText).toHaveText(quoteBlockData.quoteWithoutBorder);
    });

    it('Verify that a site Content Administrator can create a Quotes Component with Audio and Transcript', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnQuote).scrollIntoView();
        (await QALayoutPage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        const audioRemoteFilePath = await browser.uploadFile('scriptFiles/sampleAudio.mp3');
        await QuotesBlockPage.completeWithAudioAndTranscript(quoteBlockData.title, quoteBlockData.quoteWithAudioAndTrascript, quoteBlockData.author, quoteBlockData.authorTitle, audioRemoteFilePath, quoteBlockData.transcript);
        await QALayoutPage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView();
        expect(await (await QuotesBlockPage.quoteElement).getText).toHaveText(quoteBlockData.quoteWithAudioAndTrascript);  
        expect(await QuotesBlockPage.quoteShowTranscriptElement).toBeDisplayed();
    });

    it.only('Verify that a site Content Administrator can create a Quotes Component with Audio and without Transcript', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnQuote).scrollIntoView();
        (await QALayoutPage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        const audioRemoteFilePath = await browser.uploadFile('scriptFiles/sampleAudio.mp3');
        await QuotesBlockPage.completeWithAudioNoTranscript(quoteBlockData.title, quoteBlockData.quoteWithAudioNoTrascript, quoteBlockData.author, quoteBlockData.authorTitle, audioRemoteFilePath);
        await QALayoutPage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView();
        expect(await (await QuotesBlockPage.quoteElement).getText).toHaveText(quoteBlockData.quoteWithAudioNoTrascript);  
        expect(await QuotesBlockPage.quoteShowTranscriptElement).toBeDisplayed();
    });

    it('Verify that all design fields are present with the correct available options.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnQuote).scrollIntoView();
        (await QALayoutPage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        (await QuotesBlockPage.dropdownStyling).scrollIntoView();
        (await QuotesBlockPage.dropdownStyling).click();
        await QuotesBlockPage.navToStyling();
        //assert its displayed as well as it's default not ticked
        const checkbox = await QuotesBlockPage.checkboxShowBorder;
        expect(await checkbox).toBeDisplayed();
        expect(await checkbox.isSelected()).toBe(false); 
    });

    
  });
