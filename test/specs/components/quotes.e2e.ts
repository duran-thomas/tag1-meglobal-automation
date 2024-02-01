import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import QuotesBlockPage from '../../pageobjects/CMS/Components/quotes.page';
import { quoteBlockData } from '../../data/quote.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";



describe('Quotes Component Tests', () => {
    
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
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);
        //await browser.url(environment.baseUrl+'user/logout');
        await browser.setCookies(environment.admin);
        await AdminContentPage.open();
        await AdminContentPage.deleteTestPage(global.suiteDescription);
        await expect($('.mf-alert__container--highlight')).toBeDisplayed();
    });

     
    it('[S3C850] Verify that a site Content Administrator can create a Quotes Component with the border being shown, without audio', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnQuote).scrollIntoView();
        await (await QALayoutPage.btnQuote).click();
        await (await QuotesBlockPage.configBlock).waitForDisplayed();
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
        await (await QALayoutPage.btnQuote).scrollIntoView();
        await (await QALayoutPage.btnQuote).click();
        await (await QuotesBlockPage.configBlock).waitForDisplayed();
        await QuotesBlockPage.completeWithoutBorder(quoteBlockData.title, quoteBlockData.quoteWithoutBorder, quoteBlockData.author, quoteBlockData.authorTitle);
        await QALayoutPage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        await expect(await QuotesBlockPage.quoteElement).toHaveText(quoteBlockData.quoteWithoutBorder);
    });

    it('[S3C852] Verify that a site Content Administrator can create a Quotes Component with Audio and Transcript', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnQuote).scrollIntoView();
        await (await QALayoutPage.btnQuote).click();
        await (await QuotesBlockPage.configBlock).waitForDisplayed();
        const audioRemoteFilePath = await browser.uploadFile('scriptFiles/sampleAudio.mp3');
        await QuotesBlockPage.completeWithAudioAndTranscript(quoteBlockData.title, quoteBlockData.quoteWithAudioAndTranscript, quoteBlockData.author, quoteBlockData.authorTitle, audioRemoteFilePath, quoteBlockData.transcript);
        await QALayoutPage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        await expect(await QuotesBlockPage.quoteElement).toHaveText(quoteBlockData.quoteWithAudioAndTranscript);  
        await expect(QuotesBlockPage.quoteShowTranscriptElement).toBeDisplayed();
    });

    it('[S3C853] Verify that a site Content Administrator can create a Quotes Component with Audio and without Transcript', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnQuote).scrollIntoView();
        await (await QALayoutPage.btnQuote).click();
        await (await QuotesBlockPage.configBlock).waitForDisplayed();
        const audioRemoteFilePath = await browser.uploadFile('scriptFiles/sampleAudio.mp3');
        await QuotesBlockPage.completeWithAudioNoTranscript(quoteBlockData.title, quoteBlockData.quoteWithAudioNoTranscript, quoteBlockData.author, quoteBlockData.authorTitle, audioRemoteFilePath);
        await QALayoutPage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        await expect(await QuotesBlockPage.quoteElement).toHaveText(quoteBlockData.quoteWithAudioNoTranscript);  
        await expect(QuotesBlockPage.quoteShowTranscriptElement).not.toBeDisplayed();
    });

    it('[S3C854] Verify that all design fields are present with the correct available options.', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnQuote).scrollIntoView();
        await (await QALayoutPage.btnQuote).click();
        await (await QuotesBlockPage.configBlock).waitForDisplayed();
        await QuotesBlockPage.navToStyling();
        //assert its displayed as well as it's default not ticked
        const checkbox = await QuotesBlockPage.checkboxShowBorder;
        await expect(checkbox).toBeDisplayed();
        await expect(await checkbox.isSelected()).toBe(false); 
    });

    it('[S3C1355] Verify that Analytics for the Quotes Component is configured', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnQuote).scrollIntoView();
        await (await QALayoutPage.btnQuote).click();
        await (await QuotesBlockPage.configBlock).waitForDisplayed();
        const audioRemoteFilePath = await browser.uploadFile('scriptFiles/sampleAudio.mp3');
        await QuotesBlockPage.completeWithAudioAndTranscript(quoteBlockData.title, quoteBlockData.quoteWithAudioAndTranscript, quoteBlockData.author, quoteBlockData.authorTitle, audioRemoteFilePath, quoteBlockData.transcript);
        await QALayoutPage.goToPageView();
        await (await QuotesBlockPage.quoteElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        await expect(await QuotesBlockPage.quoteElement).toHaveText(quoteBlockData.quoteWithAudioAndTranscript);  
        await expect(QuotesBlockPage.quoteShowTranscriptElement).toBeDisplayed();

        /**
              * Create the expected analytics 
              * object based on the spec below: 
              * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g127fd856972_0_409
              * */
        const expectedAnalyticsData = {
            event: 'e_mediaEngagement',
            mediaTitle: 'sampleAudio',
            mediaAction: 'play',
            mediaType: 'audio',
	        mediaLength: '00:27',
            pageSlot: '1'
        }

        // Interact with the button to generate the analytics.
        await ($(`button[data-analytics-click-text="play"]`)).click();

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer', []);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_mediaEngagement")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            event: actualAnalyticsData.event,
            mediaTitle: actualAnalyticsData.mediaTitle.substring(0, 11),
            mediaAction: actualAnalyticsData.mediaAction,
            mediaType: actualAnalyticsData.mediaType,
	        mediaLength: actualAnalyticsData.mediaLength,
            pageSlot: actualAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/quotesPlay.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

        //check for the pause analytics
        const expectedAnalyticsData1 = {
            event: 'e_mediaEngagement',
            mediaTitle: 'sampleAudio',
            mediaAction: 'pause',
            mediaType: 'audio',
	        mediaLength: '00:27',
            pageSlot: '1'
        }

        // Interact with the button to generate the analytics.
        await ($(`button[data-analytics-click-text="play"]`)).click();

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer1 = await browser.executeScript('return window.dataLayer', []);
        const actualAnalyticsData1 = dataLayer1.filter((item) => item.event === "e_mediaEngagement")[1];

        // Build the actual analytics data object
        const parsedActualAnalyticsData1 = {
            event: actualAnalyticsData1.event,
            mediaTitle: actualAnalyticsData1.mediaTitle.substring(0, 11),
            mediaAction: actualAnalyticsData1.mediaAction,
            mediaType: actualAnalyticsData1.mediaType,
	        mediaLength: actualAnalyticsData1.mediaLength,
            pageSlot: actualAnalyticsData1.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/quotesPause.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        await expect(parsedActualAnalyticsData1).toEqual(expectedAnalyticsData1);
    });

    
  });
