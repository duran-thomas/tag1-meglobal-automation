import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page'
import QuotesBlockPage from '../../pageobjects/CMS/Components/quotes.page'
import LandingPage from '../../pageobjects/CMS/Components/QALayoutPage.page'
import {users} from '../../data/users.data'
import { quoteBlockData } from '../../data/quote.data';
import QALayoutPagePage from '../../pageobjects/CMS/Components/QALayoutPage.page';


describe('Quotes Component Tests', () => {
    before(async () => {
        // //Login
        await browser.url(`https://meda2022:meda2022@meglobalstg.prod.acquia-sites.com/`);
        await browser.maximizeWindow();

        // Set the cookie for the logged in user
        await browser.setCookies([
            {
              name: 'SSESSaa21775f23303ec27f377cce4bdc4f02',
              value: '38rjKWuZw0cJBnsWaQDCcRBXqbLr-25xv8oSZJXhr2R0cNXD',
              domain: 'meglobalstg.prod.acquia-sites.com',
              path: '/',
            },
            {
              name: 'hyro.token',
              value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhOTlmZGQ3Mi02MWNjLTQxMjMtYTg1MS04MDkzZTJmMjg1NDIiLCJpc3MiOiJhaXJidWQuaW8ifQ.nGvkH0mIWlP8TCJhtkgZ9rqL9G_M9JHh-balo5uyGrg',
              domain: 'meglobalstg.prod.acquia-sites.com',
              path: '/'
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
        const screenshotPath = `./screenshots/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
    it('Verify that a site Content Administrator can create a Quotes Component with the border being shown, without audio', async () => {
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnQuote).scrollIntoView();
        (await QALayoutPagePage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        await QuotesBlockPage.completeWithBorderNoAudio(quoteBlockData.title, quoteBlockData.quoteWithBorderNoAudio, quoteBlockData.author, quoteBlockData.authorTitle);
        expect(await (await QuotesBlockPage.quoteElement).getText).toHaveText(quoteBlockData.quoteWithBorderNoAudio);
        expect(await QuotesBlockPage.borderElement).toBeDisplayed();     
    });
  
    it('Verify that a site Content Administrator can create a Quotes Component without the border being shown', async () => {
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnQuote).scrollIntoView();
        (await QALayoutPagePage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        await QuotesBlockPage.completeWithoutBorder(quoteBlockData.title, quoteBlockData.quoteWithoutBorder, quoteBlockData.author, quoteBlockData.authorTitle);
        expect(await (await QuotesBlockPage.quoteElement).getText).toHaveText(quoteBlockData.quoteWithoutBorder);
    });

    it('Verify that a site Content Administrator can create a Quotes Component with Audio and Transcript', async () => {
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnQuote).scrollIntoView();
        (await QALayoutPagePage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        const audioRemoteFilePath = await browser.uploadFile('/Users/doneilscottland/Desktop/Work/tag1-dap-automation/scriptFiles/sampleAudio.mp3');
        await QuotesBlockPage.completeWithAudioAndTranscript(quoteBlockData.title, quoteBlockData.quoteWithAudioAndTrascript, quoteBlockData.author, quoteBlockData.authorTitle, audioRemoteFilePath, quoteBlockData.transcript);
        expect(await (await QuotesBlockPage.quoteElement).getText).toHaveText(quoteBlockData.quoteWithAudioAndTrascript);  
        expect(await QuotesBlockPage.quoteShowTranscriptElement).toBeDisplayed();
    });

    it('Verify that a site Content Administrator can create a Quotes Component with Audio and without Transcript', async () => {
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnQuote).scrollIntoView();
        (await QALayoutPagePage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        const audioRemoteFilePath = await browser.uploadFile('/Users/doneilscottland/Desktop/Work/tag1-dap-automation/scriptFiles/sampleAudio.mp3');
        await QuotesBlockPage.completeWithAudioNoTranscript(quoteBlockData.title, quoteBlockData.quoteWithAudioNoTrascript, quoteBlockData.author, quoteBlockData.authorTitle, audioRemoteFilePath);
        expect(await (await QuotesBlockPage.quoteElement).getText).toHaveText(quoteBlockData.quoteWithAudioNoTrascript);  
        expect(await QuotesBlockPage.quoteShowTranscriptElement).toBeDisplayed();
    });

    it.skip('Verify that all design fields are present with the correct available options.', async () => {
      
    });

    
  });
