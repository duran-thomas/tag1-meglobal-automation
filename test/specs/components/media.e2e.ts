import LoginPage from '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import MediaBlockPage from '../../pageobjects/CMS/Components/media.page';
import { mediaBlockData } from '../../data/media.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import * as fs from "fs";
import { getEnvironmentConfig } from '../../../envSelector';


describe('Media Component Tests', () => {

    before(async () => {
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
    })

    afterEach(async function () {
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Media/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function () {
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


    it('[S3C867] Verify that a site Content Administrator can create an Image Paragraph Type', async () => {
        const id=`Media-S3C867-${Date.now()}`;
        const alt = mediaBlockData.altText;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnImage).scrollIntoView();
        (await QALayoutPage.btnImage).click();
        (await MediaBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        await MediaBlockPage.createImageType(mediaBlockData.title, imageFilePath, mediaBlockData.altText, mediaBlockData.link, mediaBlockData.caption);

        await expect(MediaBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await MediaBlockPage.captionElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await $(`#${id} img[alt="${alt}"]`)).toExist;
        const text = await MediaBlockPage.captionElement;
        await expect(text).toHaveText(mediaBlockData.caption);
    });

    it('[S3C868] Verify that when the Cover field value is true for the Image paragraph type, the form is updated accordingly', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnImage).scrollIntoView();
        (await QALayoutPage.btnImage).click();
        (await MediaBlockPage.configBlock).waitForDisplayed();

        await MediaBlockPage.navToStyleVisibility();
        await (await MediaBlockPage.checkboxCover).click();
        await browser.pause(2000);

        await expect(MediaBlockPage.dropdownMobileAspectRatio).not.toBeDisplayedInViewport;
        await expect(MediaBlockPage.dropdownDesktopAspectRatio).not.toBeDisplayedInViewport;
    });

    it('[S3C869] Verify that when the Rounded field value is true for the Image paragraph type, the form is updated accordingly', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnImage).scrollIntoView();
        await (await QALayoutPage.btnImage).click();
        await (await MediaBlockPage.configBlock).waitForDisplayed();

        await MediaBlockPage.navToStyleVisibility();
        await (await MediaBlockPage.checkboxRounded).click();
        await browser.pause(2000);

        await expect(MediaBlockPage.dropdownMobileAspectRatio).not.toBeDisplayedInViewport;
        await expect(MediaBlockPage.dropdownDesktopAspectRatio).not.toBeDisplayedInViewport;
    });

    it('[S3C870] Verify that a site Content Administrator can create a Video Paragraph Type', async () => {
        const id=`Media-S3C870-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnVideo).scrollIntoView();
        await QALayoutPage.closeChatPopup()
        await (await QALayoutPage.btnVideo).click();
        await (await MediaBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        const videoFilePath = await browser.uploadFile('scriptFiles/sampleVideo.mp4');
        await MediaBlockPage.createVideoType(mediaBlockData.title, videoFilePath, mediaBlockData.duration, imageFilePath, mediaBlockData.altText);

        await expect(MediaBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await MediaBlockPage.durationElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(MediaBlockPage.mediaElement(id)).toExist;
        await expect((await MediaBlockPage.durationElement(id))).toHaveText(mediaBlockData.duration);
    });


    it('[S3C1102] Verify that Analytics for the Image Component is configured', async () => {
        const id=`Media-S3C1102-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnImage).scrollIntoView();
        await (await QALayoutPage.btnImage).click();
        await (await MediaBlockPage.configBlock).waitForDisplayed();
    
        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        await MediaBlockPage.createImageType(mediaBlockData.title, imageFilePath, mediaBlockData.altText, mediaBlockData.link, mediaBlockData.caption);
    
        await expect(MediaBlockPage.successMsg).toBeDisplayed();
    
        await QALayoutPage.goToPageView();
    
    /**
     * Create the expected analytics 
     * object based on the spec below: 
     * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g14a70e2868a_0_5
     *  */ 
    const expectedAnalyticsData = {
        event: 'e_componentClick',
        componentType:'media image',
        linkType: 'image',
        //clickText: `sampleImg3.jpg`,
        pageSlot: '1'
    }
    
    let variable='placeholder value';
    
    // Get the data layer for the window and get the data for the click event for the component
    const dataLayer = await browser.execute(function(argument:any, element:any){
        /**
         * Add the event listener to store the window.dataLayer object into the argument variable before the window unloads
         */
        window.addEventListener('beforeunload',function(){
            argument = window.dataLayer;
        })
        // Interact with the Image link to generate the analytics. (Clicking the image link brings the user to a new page)
        element.click();
        return Array.from(window.dataLayer);
    }, variable, (await $(`#${id} a[href="${mediaBlockData.link}"]`)))
    
    
    
    const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];
    // Build the actual analytics data object
    const parsedActualAnalyticsData = {
        //clickText: actualAnalyticsData.clickText.trim(),
        componentType: actualAnalyticsData.componentType,
        event: actualAnalyticsData.event,
        // Remove html tags, whitespace and newlines from the Headline
        linkType: actualAnalyticsData.linkType,
        pageSlot: actualAnalyticsData.pageSlot
    }
    fs.writeFile('analyticsTestEvidence/mediaImage.json', JSON.stringify(dataLayer), err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
    
    await expect(expectedAnalyticsData).toEqual(parsedActualAnalyticsData);
    await expect(actualAnalyticsData.clickText.trim()).toContain('sampleImg3')
    });

});
