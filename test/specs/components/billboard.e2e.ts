import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import BillboardBlockPage from '../../pageobjects/CMS/Components/billboard.page';
import {users} from '../../data/users.data';
import { billboardBlockData } from '../../data/billboard.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';
import * as fs from "fs";


describe('Billboard Component Tests', () => {
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
        const screenshotPath = `./screenshots/Billboard/${testName}.png`;
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

     
    it('[S3C887] Verify that a site Content Administrator can create a Billboard Component.', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnBillBoard).scrollIntoView();
        (await QALayoutPage.btnBillBoard).click();
        (await BillboardBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        await BillboardBlockPage.createBillboard(billboardBlockData.title, billboardBlockData.headline, billboardBlockData.eyebrow, billboardBlockData.intro, billboardBlockData.content, billboardBlockData.btnText, billboardBlockData.url,imageFilePath, billboardBlockData.altText, '_self');

        await expect(BillboardBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await BillboardBlockPage.billboardEyebrow).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(BillboardBlockPage.billboardHeadline).toHaveText(billboardBlockData.headline); 
        await expect(BillboardBlockPage.billboardImage).toBeDisplayedInViewport();   
    });

    it('[S3C888] Verify that a site Content Administrator can create a Billboard Component in a Carousel Block', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await BillboardBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await BillboardBlockPage.createCarouselBillboard(billboardBlockData.title, billboardBlockData.headline, billboardBlockData.eyebrow, billboardBlockData.intro, billboardBlockData.content, billboardBlockData.btnText, billboardBlockData.url,imageFilePath, billboardBlockData.altText);

        await expect(BillboardBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await BillboardBlockPage.billboardEyebrow).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(BillboardBlockPage.carouselElement).toExist();
        await expect(BillboardBlockPage.billboardHeadline).toHaveText(billboardBlockData.headline); 
        await expect(BillboardBlockPage.billboardImage).toBeDisplayedInViewport();   
    });
    
    
    it('[S3C1075] Verify that Analytics works as expected for a Billboard Component', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnBillBoard).scrollIntoView();
        (await QALayoutPage.btnBillBoard).click();
        (await BillboardBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        await BillboardBlockPage.createBillboard(billboardBlockData.title, billboardBlockData.headline, billboardBlockData.eyebrow, billboardBlockData.intro, billboardBlockData.content, billboardBlockData.btnText, billboardBlockData.url,imageFilePath, billboardBlockData.altText, '_blank');

        await expect(BillboardBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await BillboardBlockPage.billboardEyebrow).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(BillboardBlockPage.billboardHeadline).toHaveText(billboardBlockData.headline); 
        await expect(BillboardBlockPage.billboardImage).toBeDisplayedInViewport();

        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g127fd856972_0_330
         *  */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'billboard',
            itemTitle: billboardBlockData.headline,
            linkType: 'button',
            clickText: billboardBlockData.btnText,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        // Interact with the billboard button to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`a[data-analytics-click-text="${billboardBlockData.btnText}"]`)).click();

        // Switch back to the tab where the analytics is being generated
        await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalayticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalayticsData.clickText.trim(),
            componentType: actualAnalayticsData.componentType,
            event: actualAnalayticsData.event,
            // Remove html tags, whitespace and newlines from the Headline
            itemTitle: actualAnalayticsData.itemTitle.replace(/(<([^>]+)>)/ig, '').trim(),
            linkType: actualAnalayticsData.linkType,
            pageSlot: actualAnalayticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/billboard.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/Billboard/Verify_that Analytics works as expected for a Billboard Component..png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    });

    // it('[S3C889] Verify that all design fields are present with the correct available options.', async () => {
    //  await (await QALayoutPage.tabLayout).click();
    //     await QALayoutPage.createNewSection();
    //     await QALayoutPage.navigateToBlockList();
    //     (await QALayoutPage.btnBillBoard).scrollIntoView();
    //     (await QALayoutPage.btnBillBoard).click();
    //     (await BillboardBlockPage.configBlock).waitForDisplayed();

    //     await BillboardBlockPage.navToStyling()
        
    //     await expect(BillboardBlockPage.dropdownTheme).toBeDisplayed();
    //     await expect(BillboardBlockPage.dropdownTheme).toHaveValue('dark');
    //     await expect(BillboardBlockPage.dropdownTheme).toHaveValue('light');

    //     await expect(BillboardBlockPage.dropdownGradientIntensity).toBeDisplayed();
    //     await expect(BillboardBlockPage.dropdownGradientIntensity).toHaveValue('soft');
    //     await expect(BillboardBlockPage.dropdownGradientIntensity).toHaveValue('medium');
    //     await expect(BillboardBlockPage.dropdownGradientIntensity).toHaveValue('hard');

    //     await BillboardBlockPage.inputMobileFixedHeight.scrollIntoView();
    //     await expect(BillboardBlockPage.inputMobileFixedHeight).toBeDisplayed();
    //     await expect(BillboardBlockPage.inputMobileFixedHeight).toHaveValue('');

    //     await expect(BillboardBlockPage.inputDesktopFixedHeight).toBeDisplayed();
    //     await expect(BillboardBlockPage.inputDesktopFixedHeight).toHaveValue('');

    //     await expect(BillboardBlockPage.dropdownMobileAspectRatio).toBeDisplayed();
    //     await expect(BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('none');
    //     await expect(BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('fluid');
    //     await expect(BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('1:1');
    //     await expect(BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('5:4');
    //     await expect(BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('4:3');
    //     await expect(BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('3:4');
    //     await expect(BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('3:2');
    //     await expect(BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('16:9');
    //     await expect(BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('2:1');
    //     await expect(BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('21:9');
    //     await expect(BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('25:6');
        
    //     await expect(BillboardBlockPage.dropdownDesktopAspectRatio).toBeDisplayed();
    //     await expect(BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('none');
    //     await expect(BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('fluid');
    //     await expect(BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('1:1');
    //     await expect(BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('5:4');
    //     await expect(BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('4:3');
    //     await expect(BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:4');
    //     await expect(BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:2');
    //     await expect(BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('16:9');
    //     await expect(BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('2:1');
    //     await expect(BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('21:9');
    //     await expect(BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('25:6');

    //     await expect(BillboardBlockPage.dropdownContentPosition).toBeDisplayed();
    //     await expect(BillboardBlockPage.dropdownContentPosition).toHaveValue('bottom left');
    //     await expect(BillboardBlockPage.dropdownContentPosition).toHaveValue('left center');
    //     await expect(BillboardBlockPage.dropdownContentPosition).toHaveValue('right center');

    //     await expect(BillboardBlockPage.dropdownContentColumns).toBeDisplayed();
    //     await expect(BillboardBlockPage.dropdownContentColumns).toHaveValue('1');
    //     await expect(BillboardBlockPage.dropdownContentColumns).toHaveValue('2');

    // });

  });
