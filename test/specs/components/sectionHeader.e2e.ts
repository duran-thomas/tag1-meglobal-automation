import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import SectionHeaderBlockPage from '../../pageobjects/CMS/Components/sectionHeader.page';
import { sectionHeaderBlockData } from '../../data/sectionHeader.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";



describe('Section Header Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/SectionHeader/${testName}.png`;
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

     
    it('[S3C865] Verify that a site Content Administrator can create a Section Header Component', async () => {
        const id=`SectionHeader-S3C865-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnSectionHeader).scrollIntoView();
        await (await QALayoutPage.btnSectionHeader).click();
        await (await SectionHeaderBlockPage.configBlock).waitForDisplayed();

        await SectionHeaderBlockPage.createSectionHeader(sectionHeaderBlockData.title, sectionHeaderBlockData.headline, sectionHeaderBlockData.content, sectionHeaderBlockData.btnText, sectionHeaderBlockData.btnUrl, sectionHeaderBlockData.linkText, sectionHeaderBlockData.linkUrl);

        await expect(SectionHeaderBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await SectionHeaderBlockPage.sectionHeaderElement(id)).scrollIntoView();
        
        await expect(SectionHeaderBlockPage.sectionHeaderElement(id)).toExist; 
        await expect(await SectionHeaderBlockPage.sectionHeaderElement(id)).toHaveTextContaining(sectionHeaderBlockData.headline);   
    });


    it('[S3C866] Verify that all design fields are present with the correct available options.', async () => {
        const id=`SectionHeader-S3C866-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnSectionHeader).scrollIntoView();
        await (await QALayoutPage.btnSectionHeader).click();
        await (await SectionHeaderBlockPage.configBlock).waitForDisplayed();

        await SectionHeaderBlockPage.navToStyling()

        const minimalCheckbox = await SectionHeaderBlockPage.checkboxMinimal;
        await minimalCheckbox.scrollIntoView();
        await expect(minimalCheckbox).toBeDisplayed();
        await expect(await minimalCheckbox.isSelected()).toBe(false);
    });

    it('[S3C1085] Verify that the Headline size defaults to h2 when creating a Section Header Component', async () => {
        const id=`SectionHeader-S3C1085-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnSectionHeader).scrollIntoView();
        await (await QALayoutPage.btnSectionHeader).click();
        await (await SectionHeaderBlockPage.configBlock).waitForDisplayed();

        await SectionHeaderBlockPage.checkHeadingSize();

        await expect(SectionHeaderBlockPage.dropdownRenderAs).toHaveValue('h2');
    });

    it('[S3C1356] Verify that Analytics for the Section Header Component is configured', async () => {
        const id=`SectionHeader-S3C1356-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnSectionHeader).scrollIntoView();
        await (await QALayoutPage.btnSectionHeader).click();
        await (await SectionHeaderBlockPage.configBlock).waitForDisplayed();

        await SectionHeaderBlockPage.createSectionHeaderAnalytics(sectionHeaderBlockData.title, sectionHeaderBlockData.headline, sectionHeaderBlockData.content, sectionHeaderBlockData.btnText, sectionHeaderBlockData.btnUrl, sectionHeaderBlockData.linkText, sectionHeaderBlockData.linkUrl);

        await expect(SectionHeaderBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await SectionHeaderBlockPage.sectionHeaderElement(id)).scrollIntoView();
        
        await expect(SectionHeaderBlockPage.sectionHeaderElement(id)).toExist; 
        await expect(await SectionHeaderBlockPage.sectionHeaderElement(id)).toHaveTextContaining(sectionHeaderBlockData.headline); 
        
         /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g127fd856972_0_393
         *  */ 

        //Button Analytics
        const expectedButtonAnalyticsData = {
            event: 'e_componentClick',
            componentType:'section header',
            itemTitle: sectionHeaderBlockData.headline,
            linkType: 'button',
            clickText: sectionHeaderBlockData.btnText,
            pageSlot: '1'
        }

        // Get the current url of the page
        let currentUrl = await browser.getUrl();

        // Interact with the button to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`#${id} a[data-analytics-click-text="${sectionHeaderBlockData.btnText}"]`)).click();

        // Switch back to the tab where the analytics is being generated
        await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const buttonDataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualButtonAnalyticsData = buttonDataLayer.filter((item) => item.event === "e_componentClick")[0];

        // Build the actual analytics data object
        const parsedButtonAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualButtonAnalyticsData.clickText.trim(),
            componentType: actualButtonAnalyticsData.componentType,
            event: actualButtonAnalyticsData.event,
            // Remove html tags, whitespace and newlines from the Headline
            itemTitle: actualButtonAnalyticsData.itemTitle.replace(/(<([^>]+)>)/ig, '').trim(),
            linkType: actualButtonAnalyticsData.linkType,
            pageSlot: actualButtonAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/sectionHeaderButton.json', JSON.stringify(buttonDataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        //Link Analytics
        const expectedLinkAnalyticsData = {
            event: 'e_componentClick',
            componentType:'section header',
            itemTitle: sectionHeaderBlockData.headline,
            linkType: 'link',
            clickText: sectionHeaderBlockData.linkText,
            pageSlot: '1'
        }

        // Get the current url of the page
        currentUrl = await browser.getUrl();

        // Interact with the button to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`a[data-analytics-click-text="${sectionHeaderBlockData.linkText}"]`)).click();

        // Switch back to the tab where the analytics is being generated
        await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[1];

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

        fs.writeFile('analyticsTestEvidence/sectionHeaderLink.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedLinkAnalyticsData);

    });

  });
