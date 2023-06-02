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

    beforeEach(async function() {
        //navigate to admin content page
        await AdminContentPage.open();
        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getQALandingPage();  //TODO: This function may need some checking out. When its run with all tests at once. I don't think it behaves as expected.
        expect(await QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { //TODO: This needs some checking out. The screenshots that it create seem to be taken a bit too early in the execution?
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Media/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
    it('[S3C867] Verify that a site Content Administrator can create an Image Paragraph Type', async () => {
        const alt = mediaBlockData.altText;
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnImage).scrollIntoView();
        (await QALayoutPage.btnImage).click();
        (await MediaBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        await MediaBlockPage.createImageType(mediaBlockData.title, imageFilePath, mediaBlockData.altText, mediaBlockData.link, mediaBlockData.caption);

        expect(MediaBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await MediaBlockPage.captionElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        expect(await $(`img[alt="${alt}"]`)).toExist; 
        expect((await MediaBlockPage.captionElement).getText).toHaveText(mediaBlockData.caption);   
    });

    it('[S3C868] Verify that when the Cover field value is true for the Image paragraph type, the form is updated accordingly', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnImage).scrollIntoView();
        (await QALayoutPage.btnImage).click();
        (await MediaBlockPage.configBlock).waitForDisplayed();

        await MediaBlockPage.navToStyleVisibility();
        await (await MediaBlockPage.checkboxCover).click();
        await browser.pause(2000);
        
        expect(await MediaBlockPage.dropdownMobileAspectRatio).not.toBeDisplayedInViewport;  
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).not.toBeDisplayedInViewport;    
    });

    it('[S3C869] Verify that when the Rounded field value is true for the Image paragraph type, the form is updated accordingly', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnImage).scrollIntoView();
        (await QALayoutPage.btnImage).click();
        (await MediaBlockPage.configBlock).waitForDisplayed();

        await MediaBlockPage.navToStyleVisibility();
        await (await MediaBlockPage.checkboxRounded).click();
        await browser.pause(2000);
        
        expect(await MediaBlockPage.dropdownMobileAspectRatio).not.toBeDisplayedInViewport;  
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).not.toBeDisplayedInViewport;    
    });

    it('[S3C870] Verify that a site Content Administrator can create a Video Paragraph Type', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnVideo).scrollIntoView();
        (await QALayoutPage.btnVideo).click();
        (await MediaBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        const videoFilePath = await browser.uploadFile('scriptFiles/sampleVideo.mp4');
        await MediaBlockPage.createVideoType(mediaBlockData.title, videoFilePath, mediaBlockData.duration, imageFilePath, mediaBlockData.altText);

        expect(MediaBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await MediaBlockPage.durationElement).scrollIntoView({ behavior: 'auto', block: 'center' }); 
        
        expect(await MediaBlockPage.mediaElement).toExist; 
        expect((await MediaBlockPage.durationElement).getText).toHaveText(mediaBlockData.duration);   
    });

   
    it('[S3C871] Verify that all design fields are present with the correct available options for the Video Paragraph Type', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnVideo).scrollIntoView();
        (await QALayoutPage.btnVideo).click();
        (await MediaBlockPage.configBlock).waitForDisplayed();

        await MediaBlockPage.navToStyling()
        
        expect(await MediaBlockPage.dropdownContentPadding).toBeDisplayed();
        expect(await MediaBlockPage.dropdownContentPadding).toHaveValue('base');

        expect(await MediaBlockPage.dropdownDesktopAspectRatio).toBeDisplayed();
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('none');
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('fluid');
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('1:1');
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('5:4');
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('4:3');
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:4');
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:2');
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('16:9');
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('2:1');
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('21:9');
        expect(await MediaBlockPage.dropdownDesktopAspectRatio).toHaveValue('25:6');

        expect(await MediaBlockPage.dropdownMobileAspectRatio).toBeDisplayed();
        expect(await MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('none');
        expect(await MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('fluid');
        expect(await MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('1:1');
        expect(await MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('5:4');
        expect(await MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('4:3');
        expect(await MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('3:4');
        expect(await MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('3:2');
        expect(await MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('16:9');
        expect(await MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('2:1');
        expect(await MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('21:9');
        expect(await MediaBlockPage.dropdownMobileAspectRatio).toHaveValue('25:6');

        expect(await MediaBlockPage.dropdownSite).toBeDisplayed();
        expect(await MediaBlockPage.dropdownSite).toHaveValue('_none');
        expect(await MediaBlockPage.dropdownSite).toHaveValue('montefiore');
        expect(await MediaBlockPage.dropdownSite).toHaveValue('einstein');

    });

  });
