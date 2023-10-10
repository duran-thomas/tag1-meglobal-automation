import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import EventBlockPage from '../../pageobjects/CMS/Components/event.page';
import { eventBlockData } from '../../data/event.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import * as fs from "fs";
import { getEnvironmentConfig } from '../../../envSelector';


describe('Event Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/Event/${testName}.png`;
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

  
    it('[S3C918] Verify that a site Content Administrator can create a Event Component in an Event Block', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnEvent).scrollIntoView();
        await (await QALayoutPage.btnEvent).click();
        await (await EventBlockPage.configBlock).waitForDisplayed();

        await EventBlockPage.createEvent(eventBlockData.title, eventBlockData.eventID);

        await expect(EventBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await EventBlockPage.stringDate).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await EventBlockPage.stringDate).toHaveTextContaining('m to'); 
        await expect(EventBlockPage.eventElement).toBeExisting();   
    });

    it('[S3C1108] Verify that a site Content Administrator can create a Event List Component in an Event Block', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnEvent).scrollIntoView();
        await (await QALayoutPage.btnEvent).click();
        await (await EventBlockPage.configBlock).waitForDisplayed();

        await EventBlockPage.createEventList(eventBlockData.title);

        await expect(EventBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await EventBlockPage.timeElements[0]).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        const elements = await $$('time.block');
        const dateValues = [];

        //Retrieve date values and convert to Date objects
        for (const element of elements) {
            const datetime = await element.getAttribute('datetime');
            const date = new Date(datetime);
            dateValues.push(date);
        }

        // Assert that all dates are either today's date or in the future
        for (const date of dateValues) {
            const currentDate = new Date();
            expect(date >= currentDate).toBe(true);
        }
        //Sort the dates in ascending order
        dateValues.sort((a, b) => a - b);

        // Assert that the dates are sorted in ascending order
        for (let i = 0; i < dateValues.length - 1; i++) {
            expect(dateValues[i].getTime()).toBeLessThanOrEqual(dateValues[i + 1].getTime());
        }

        //Record the current window handles (tabs)
        const oldWindowHandles = await browser.getWindowHandles();

        // Perform the click action that is expected to open a new tab
        await (await EventBlockPage.linkMoreAboutEvent).click();

        // Get the updated window handles after the click
        const newWindowHandles = await browser.getWindowHandles();

        // Compare the old and new window handles
        expect(newWindowHandles.length).toBeGreaterThan(oldWindowHandles.length);
    });

    it('[S3C1086] Verify that Analytics for the Events Component is configured', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnEvent).scrollIntoView();
        await (await QALayoutPage.btnEvent).click();
        await (await EventBlockPage.configBlock).waitForDisplayed();

        await EventBlockPage.createEvent(eventBlockData.title, eventBlockData.eventID);

        await expect(EventBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await EventBlockPage.stringDate).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await EventBlockPage.stringDate).toHaveTextContaining('m to'); 
        await expect(EventBlockPage.eventElement).toBeExisting();   

        const text = await (await EventBlockPage.linkMoreAboutEvent).getText();
        const title = await EventBlockPage.testEventTitle;

        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g23acaf9823b_0_14
         *  */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'event',
            itemTitle: title,
            linkType: 'link',
            clickText: text,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        // Interact with the billboard button to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await EventBlockPage.linkMoreAboutEvent).click();

        // Switch back to the tab where the analytics is being generated
        await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalyticsData.clickText.trim(),
            componentType: actualAnalyticsData.componentType,
            event: actualAnalyticsData.event,
            // Remove html tags, whitespace and newlines from the Headline
            itemTitle: actualAnalyticsData.itemTitle.replace(/(<([^>]+)>)/ig, '').trim(),
            linkType: actualAnalyticsData.linkType,
            pageSlot: actualAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/event.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/Event/Verify that Analytics for the Events Component is configured..png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);
    });


    it('[S3C1144] Verify that a site Content Administrator can create a Event Component for a Hybrid Event in an Event Block', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnEvent).scrollIntoView();
        await (await QALayoutPage.btnEvent).click();
        await (await EventBlockPage.configBlock).waitForDisplayed();

        await EventBlockPage.createHybridEvent(eventBlockData.title, eventBlockData.hybridEventID);

        await expect(EventBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await EventBlockPage.stringDate).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await EventBlockPage.stringDate).toHaveTextContaining(' at '); 
        await expect(EventBlockPage.eventElement).toBeExisting();   
        await expect(EventBlockPage.hybridTextElement).toBeDisplayed();
    });

    it('[S3C1146] Verify that an Event block with no data displays correctly', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnEvent).scrollIntoView();
        await (await QALayoutPage.btnEvent).click();
        await (await EventBlockPage.configBlock).waitForDisplayed();

        await EventBlockPage.createEmptyEvent(eventBlockData.title, eventBlockData.nullID, eventBlockData.eventResults);

        await expect(EventBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();

        const text = await $(`p=${eventBlockData.eventResults}`);
        
        await expect(text).toBeDisplayed();   
    });

    it('[S3C1147] Verify that an Event List with no data displays correctly', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnEvent).scrollIntoView();
        await (await QALayoutPage.btnEvent).click();
        await (await EventBlockPage.configBlock).waitForDisplayed();

        await EventBlockPage.createEmptyEventList(eventBlockData.title, eventBlockData.eventListResults);

        await expect(EventBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();

        const text = await $(`p=${eventBlockData.eventListResults}`);
        
        await expect(text).toBeDisplayed();   
    });




  });
