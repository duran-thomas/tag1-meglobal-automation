import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import QuotesBlockPage from '../../pageobjects/CMS/Components/quotes.page';
import LandingPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import {users} from '../../data/users.data';
import { quoteBlockData } from '../../data/quote.data';
import QALayoutPagePage from '../../pageobjects/CMS/Components/QALayoutPage.page';


describe('Quotes Component Tests', () => {
    before(async () => {
        // //Login
        await browser.url(`https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/`);
        await browser.maximizeWindow();

        // Set the cookie for the logged in user
        await browser.setCookies([
            {
              name: 'SSESSdf0d9aa5f85649894e921d4b01e00b05',
              value: 'LXmAuXucXgcyLudUgKqslFZimRDD6j64xFY-svh5ZnH%2Ck7DX',
              domain: 'meglobalode7.prod.acquia-sites.com',
              path: '/',
            },
            {
              name: 'hyro.token',
              value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMWJhNDhiNi1kMDQyLTQ2ZmItYThjZS04N2NhZmEzNWE5YTQiLCJpc3MiOiJhaXJidWQuaW8ifQ.7u9l8If-42_tesTWDpLJ0mu6SAMu6RPCptnZfTN-EW4',
              domain: 'meglobalode7.prod.acquia-sites.com',
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
        const screenshotPath = `./screenshots/Quotes/${testName}.png`;
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
        
        expect(await (await QuotesBlockPage.borderElement).getText).toHaveText(quoteBlockData.quoteWithBorderNoAudio);
        expect(await QuotesBlockPage.borderElement).toBeDisplayed();  
        await QALayoutPagePage.goToPageView();
        await (await QuotesBlockPage.borderElement).scrollIntoView();
        browser.pause(3000); 
    });
  
    it('Verify that a site Content Administrator can create a Quotes Component without the border being shown', async () => {
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnQuote).scrollIntoView();
        (await QALayoutPagePage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        await QuotesBlockPage.completeWithoutBorder(quoteBlockData.title, quoteBlockData.quoteWithoutBorder, quoteBlockData.author, quoteBlockData.authorTitle);
        await QALayoutPagePage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView();
        expect(await (await QuotesBlockPage.quoteElement).getText).toHaveText(quoteBlockData.quoteWithoutBorder);
    });

    it('Verify that a site Content Administrator can create a Quotes Component with Audio and Transcript', async () => {
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnQuote).scrollIntoView();
        (await QALayoutPagePage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        const audioRemoteFilePath = await browser.uploadFile('scriptFiles/sampleAudio.mp3');
        await QuotesBlockPage.completeWithAudioAndTranscript(quoteBlockData.title, quoteBlockData.quoteWithAudioAndTrascript, quoteBlockData.author, quoteBlockData.authorTitle, audioRemoteFilePath, quoteBlockData.transcript);
        await QALayoutPagePage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView();
        expect(await (await QuotesBlockPage.quoteElement).getText).toHaveText(quoteBlockData.quoteWithAudioAndTrascript);  
        expect(await QuotesBlockPage.quoteShowTranscriptElement).toBeDisplayed();
    });

    it.only('Verify that a site Content Administrator can create a Quotes Component with Audio and without Transcript', async () => {
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnQuote).scrollIntoView();
        (await QALayoutPagePage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        const audioRemoteFilePath = await browser.uploadFile('scriptFiles/sampleAudio.mp3');
        await QuotesBlockPage.completeWithAudioNoTranscript(quoteBlockData.title, quoteBlockData.quoteWithAudioNoTrascript, quoteBlockData.author, quoteBlockData.authorTitle, audioRemoteFilePath);
        await QALayoutPagePage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView();
        expect(await (await QuotesBlockPage.quoteElement).getText).toHaveText(quoteBlockData.quoteWithAudioNoTrascript);  
        expect(await QuotesBlockPage.quoteShowTranscriptElement).toBeDisplayed();
    });

    it('Verify that all design fields are present with the correct available options.', async () => {
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnQuote).scrollIntoView();
        (await QALayoutPagePage.btnQuote).click();
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
