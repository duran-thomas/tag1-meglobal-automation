import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import MediaBlockPage from '../../pageobjects/CMS/Components/media.page';
import {users} from '../../data/users.data';
import { mediaBlockData } from '../../data/media.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Media Component Tests', () => {
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
        const screenshotPath = `./screenshots/Media/${testName}.png`;
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

     
    it('[S3C867] Verify that a site Content Administrator can create an Image Paragraph Type', async () => {
        const alt = mediaBlockData.altText;
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnImage).scrollIntoView();
        (await QALayoutPage.btnImage).click();
        (await MediaBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        await MediaBlockPage.createImageType(mediaBlockData.title, imageFilePath, mediaBlockData.altText, mediaBlockData.link, mediaBlockData.caption);

        await expect(MediaBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await MediaBlockPage.captionElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await $(`img[alt="${alt}"]`)).toExist; 
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
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnVideo).scrollIntoView();
        await (await QALayoutPage.btnVideo).click();
        await (await MediaBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        const videoFilePath = await browser.uploadFile('scriptFiles/sampleVideo.mp4');
        await MediaBlockPage.createVideoType(mediaBlockData.title, videoFilePath, mediaBlockData.duration, imageFilePath, mediaBlockData.altText);

        await expect(MediaBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await MediaBlockPage.durationElement).scrollIntoView({ behavior: 'auto', block: 'center' }); 
        
        await expect(MediaBlockPage.mediaElement).toExist; 
        await expect((await MediaBlockPage.durationElement)).toHaveText(mediaBlockData.duration);   
    });

   
    // it('[S3C871] Verify that all design fields are present with the correct available options for the Video Paragraph Type', async () => {
    //  await (await QALayoutPage.tabLayout).click();
    //     await QALayoutPage.createNewSection();
    //     await QALayoutPage.navigateToBlockList();
    //     (await QALayoutPage.btnVideo).scrollIntoView();
    //     (await QALayoutPage.btnVideo).click();
    //     (await MediaBlockPage.configBlock).waitForDisplayed();

    //     await MediaBlockPage.navToStyling()
        
    //     await expect(MediaBlockPage.dropdownContentPadding).toBeDisplayed();
    //     await expect(MediaBlockPage.dropdownContentPadding).toHaveValue('base');

    //     await expect(MediaBlockPage.dropdownDesktopAspectRatio).toBeDisplayed();
    //     await expect(MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('none');
    //     await expect(MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('fluid');
    //     await expect(MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('1:1');
    //     await expect(MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('5:4');
    //     await expect(MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('4:3');
    //     await expect(MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:4');
    //     await expect(MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:2');
    //     await expect(MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('16:9');
    //     await expect(MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('2:1');
    //     await expect(MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('21:9');
    //     await expect(MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('25:6');

    //     await expect(MediaBlockPage.dropdownMobileAspectRatio).toBeDisplayed();
    //     await expect(MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('none');
    //     await expect(MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('fluid');
    //     await expect(MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('1:1');
    //     await expect(MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('5:4');
    //     await expect(MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('4:3');
    //     await expect(MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('3:4');
    //     await expect(MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('3:2');
    //     await expect(MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('16:9');
    //     await expect(MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('2:1');
    //     await expect(MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('21:9');
    //     await expect(MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('25:6');

    //     await expect(MediaBlockPage.dropdownSite).toBeDisplayed();
    //     await expect(MediaBlockPage.dropdownSite).toHaveValue('_none');
    //     await expect(MediaBlockPage.dropdownSite).toHaveValue('montefiore');
    //     await expect(MediaBlockPage.dropdownSite).toHaveValue('einstein');

    // });

  });
