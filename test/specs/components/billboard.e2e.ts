import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import BillboardBlockPage from '../../pageobjects/CMS/Components/billboard.page';
import {users} from '../../data/users.data';
import { billboardBlockData } from '../../data/billboard.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


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
        const screenshotPath = `./screenshots/Billboard/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
    it('[S3C887] Verify that a site Content Administrator can create a Billboard Component.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnBillBoard).scrollIntoView();
        (await QALayoutPage.btnBillBoard).click();
        (await BillboardBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        await BillboardBlockPage.createBillboard(billboardBlockData.title, billboardBlockData.headline, billboardBlockData.eyebrow, billboardBlockData.intro, billboardBlockData.content, billboardBlockData.btnText, billboardBlockData.url,imageFilePath, billboardBlockData.altText);

        expect(BillboardBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await BillboardBlockPage.billboardEyebrow).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        expect(await BillboardBlockPage.billboardHeadline).toHaveText(billboardBlockData.headline); 
        expect(await BillboardBlockPage.billboardImage).toBeDisplayedInViewport();   
    });

    it('[S3C888] Verify that a site Content Administrator can create a Billboard Component in a Carousel Block', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await BillboardBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await BillboardBlockPage.createCarouselBillboard(billboardBlockData.title, billboardBlockData.headline, billboardBlockData.eyebrow, billboardBlockData.intro, billboardBlockData.content, billboardBlockData.btnText, billboardBlockData.url,imageFilePath, billboardBlockData.altText);

        expect(BillboardBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await BillboardBlockPage.billboardEyebrow).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        expect(await BillboardBlockPage.carouselElement).toExist();
        expect(await BillboardBlockPage.billboardHeadline).toHaveText(billboardBlockData.headline); 
        expect(await BillboardBlockPage.billboardImage).toBeDisplayedInViewport();   
    });


    it('[S3C889] Verify that all design fields are present with the correct available options.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnBillBoard).scrollIntoView();
        (await QALayoutPage.btnBillBoard).click();
        (await BillboardBlockPage.configBlock).waitForDisplayed();

        await BillboardBlockPage.navToStyling()
        
        expect(await BillboardBlockPage.dropdownTheme).toBeDisplayed();
        expect(await BillboardBlockPage.dropdownTheme).toHaveValue('dark');
        expect(await BillboardBlockPage.dropdownTheme).toHaveValue('light');

        expect(await BillboardBlockPage.dropdownGradientIntensity).toBeDisplayed();
        expect(await BillboardBlockPage.dropdownGradientIntensity).toHaveValue('soft');
        expect(await BillboardBlockPage.dropdownGradientIntensity).toHaveValue('medium');
        expect(await BillboardBlockPage.dropdownGradientIntensity).toHaveValue('hard');

        await BillboardBlockPage.inputMobileFixedHeight.scrollIntoView();
        expect(await BillboardBlockPage.inputMobileFixedHeight).toBeDisplayed();
        expect(await BillboardBlockPage.inputMobileFixedHeight).toHaveValue('');

        expect(await BillboardBlockPage.inputDesktopFixedHeight).toBeDisplayed();
        expect(await BillboardBlockPage.inputDesktopFixedHeight).toHaveValue('');

        expect(await BillboardBlockPage.dropdownMobileAspectRatio).toBeDisplayed();
        expect(await BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('none');
        expect(await BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('fluid');
        expect(await BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('1:1');
        expect(await BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('5:4');
        expect(await BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('4:3');
        expect(await BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('3:4');
        expect(await BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('3:2');
        expect(await BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('16:9');
        expect(await BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('2:1');
        expect(await BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('21:9');
        expect(await BillboardBlockPage.dropdownMobileAspectRatio).toHaveValue('25:6');
        
        expect(await BillboardBlockPage.dropdownDesktopAspectRatio).toBeDisplayed();
        expect(await BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('none');
        expect(await BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('fluid');
        expect(await BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('1:1');
        expect(await BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('5:4');
        expect(await BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('4:3');
        expect(await BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:4');
        expect(await BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:2');
        expect(await BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('16:9');
        expect(await BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('2:1');
        expect(await BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('21:9');
        expect(await BillboardBlockPage.dropdownDesktopAspectRatio).toHaveValue('25:6');

        expect(await BillboardBlockPage.dropdownContentPosition).toBeDisplayed();
        expect(await BillboardBlockPage.dropdownContentPosition).toHaveValue('bottom left');
        expect(await BillboardBlockPage.dropdownContentPosition).toHaveValue('left center');
        expect(await BillboardBlockPage.dropdownContentPosition).toHaveValue('right center');

        expect(await BillboardBlockPage.dropdownContentColumns).toBeDisplayed();
        expect(await BillboardBlockPage.dropdownContentColumns).toHaveValue('1');
        expect(await BillboardBlockPage.dropdownContentColumns).toHaveValue('2');

    });

  });
