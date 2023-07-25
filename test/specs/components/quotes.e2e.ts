import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import QuotesBlockPage from '../../pageobjects/CMS/Components/quotes.page';
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
        const screenshotPath = `./screenshots/Quotes/${testName}.png`;
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

     
    it('[S3C850] Verify that a site Content Administrator can create a Quotes Component with the border being shown, without audio', async () => {
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnQuote).scrollIntoView();
        (await QALayoutPage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        await QuotesBlockPage.completeWithBorderNoAudio(quoteBlockData.title, quoteBlockData.quoteWithBorderNoAudio, quoteBlockData.author, quoteBlockData.authorTitle);
        await QALayoutPage.goToPageView();
        await (await QuotesBlockPage.borderElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await $('.mf-quotes__text')).toHaveText(quoteBlockData.quoteWithBorderNoAudio);
        await expect(QuotesBlockPage.borderElement).toBeDisplayed();  
    });
  
    it('[S3C851] Verify that a site Content Administrator can create a Quotes Component without the border being shown', async () => {
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnQuote).scrollIntoView();
        (await QALayoutPage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        await QuotesBlockPage.completeWithoutBorder(quoteBlockData.title, quoteBlockData.quoteWithoutBorder, quoteBlockData.author, quoteBlockData.authorTitle);
        await QALayoutPage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        await expect(await QuotesBlockPage.quoteElement).toHaveText(quoteBlockData.quoteWithoutBorder);
    });

    it('[S3C852] Verify that a site Content Administrator can create a Quotes Component with Audio and Transcript', async () => {
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnQuote).scrollIntoView();
        (await QALayoutPage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        const audioRemoteFilePath = await browser.uploadFile('scriptFiles/sampleAudio.mp3');
        await QuotesBlockPage.completeWithAudioAndTranscript(quoteBlockData.title, quoteBlockData.quoteWithAudioAndTrascript, quoteBlockData.author, quoteBlockData.authorTitle, audioRemoteFilePath, quoteBlockData.transcript);
        await QALayoutPage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        await expect(await QuotesBlockPage.quoteElement).toHaveText(quoteBlockData.quoteWithAudioAndTrascript);  
        await expect(QuotesBlockPage.quoteShowTranscriptElement).toBeDisplayed();
    });

    it('[S3C853] Verify that a site Content Administrator can create a Quotes Component with Audio and without Transcript', async () => {
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnQuote).scrollIntoView();
        (await QALayoutPage.btnQuote).click();
        (await QuotesBlockPage.configBlock).waitForDisplayed();
        const audioRemoteFilePath = await browser.uploadFile('scriptFiles/sampleAudio.mp3');
        await QuotesBlockPage.completeWithAudioNoTranscript(quoteBlockData.title, quoteBlockData.quoteWithAudioNoTrascript, quoteBlockData.author, quoteBlockData.authorTitle, audioRemoteFilePath);
        await QALayoutPage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        await expect(await QuotesBlockPage.quoteElement).toHaveText(quoteBlockData.quoteWithAudioNoTrascript);  
        await expect(QuotesBlockPage.quoteShowTranscriptElement).not.toBeDisplayed();
    });

    it('[S3C854] Verify that all design fields are present with the correct available options.', async () => {
     await (await QALayoutPage.tabLayout).click();
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
        await expect(checkbox).toBeDisplayed();
        await expect(await checkbox.isSelected()).toBe(false); 
    });

    
  });
