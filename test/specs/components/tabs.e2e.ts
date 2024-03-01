import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import TabsBlockPage from '../../pageobjects/CMS/Components/tabs.page';
import { tabBlockData } from '../../data/tabs.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";


describe('Tabs Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/Tabs/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        //await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
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

     
    it('[S3C911] Verify that a site Content Administrator can create a Tabs Component with a single Tab Item', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnTabs).scrollIntoView();
        await (await QALayoutPage.btnTabs).click();
        await (await TabsBlockPage.configBlock).waitForDisplayed();

        await TabsBlockPage.createTab(tabBlockData.title, tabBlockData.label, tabBlockData.name, tabBlockData.content);

        await expect(TabsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TabsBlockPage.tabElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await TabsBlockPage.tabPanel).toBeDisplayedInViewport();
        await expect(await TabsBlockPage.tabPanel).toHaveTextContaining(tabBlockData.content); 
    });

    it('[S3C912] Verify that a site Content Administrator can create a Tabs Component with a multiple Tab Item', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnTabs).scrollIntoView();
        await (await QALayoutPage.btnTabs).click();
        await (await TabsBlockPage.configBlock).waitForDisplayed();

        await TabsBlockPage.createMultiTab(tabBlockData.title, tabBlockData.label, tabBlockData.name, tabBlockData.content, tabBlockData.multi.name1, tabBlockData.multi.content1, tabBlockData.multi.name2, tabBlockData.multi.content2, tabBlockData.multi.name3, tabBlockData.multi.content3);

        await expect(TabsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TabsBlockPage.tabElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(TabsBlockPage.tabPanel).toBeDisplayedInViewport();
        await expect(await $(`#${tabBlockData.name.toLowerCase()}`)).toBeExisting();
        await expect(await $(`#${tabBlockData.multi.name1.toLowerCase()}`)).toBeExisting();
        await expect(await $(`#${tabBlockData.multi.name2.toLowerCase().replace(/\s/g, '-')}`)).toBeExisting();
        await expect(await $(`#${tabBlockData.multi.name3.toLowerCase()}`)).toBeExisting();
    });

    it('[S3C1347] Verify that Analytics for the Tabs Component is configured', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnTabs).scrollIntoView();
        await (await QALayoutPage.btnTabs).click();
        await (await TabsBlockPage.configBlock).waitForDisplayed();

        await TabsBlockPage.createMultiTab(tabBlockData.title, tabBlockData.label, tabBlockData.name, tabBlockData.content, tabBlockData.multi.name1, tabBlockData.multi.content1, tabBlockData.multi.name2, tabBlockData.multi.content2, tabBlockData.multi.name3, tabBlockData.multi.content3);

        await expect(TabsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TabsBlockPage.tabElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(TabsBlockPage.tabPanel).toBeDisplayedInViewport();
        await expect(await $(`#${tabBlockData.name.toLowerCase()}`)).toBeExisting();
        await expect(await $(`#${tabBlockData.multi.name1.toLowerCase()}`)).toBeExisting();
        await expect(await $(`#${tabBlockData.multi.name2.toLowerCase().replace(/\s/g, '-')}`)).toBeExisting();
        await expect(await $(`#${tabBlockData.multi.name3.toLowerCase()}`)).toBeExisting();

        /**
              * Create the expected analytics 
              * object based on the spec below: 
              * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g127fd856972_0_409
              * */
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType: 'tabs',
            clickText: tabBlockData.multi.name1,
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        //set element to open links in new tab
        await browser.execute(() => {
            const clickElement = document.querySelector('#running');
            clickElement.setAttribute('target', '_blank');
        })

        // Interact with the button to generate the analytics. (Clicking the button navigates us to a new tab)
        await ($(`button[data-analytics-click-text="${tabBlockData.multi.name1}"]`)).click();

        // Switch back to the tab where the analytics is being generated
        await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer', []);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalyticsData.clickText.trim(),
            componentType: actualAnalyticsData.componentType,
            event: actualAnalyticsData.event
        }

        fs.writeFile('analyticsTestEvidence/tabs.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);
    });
   

  });
