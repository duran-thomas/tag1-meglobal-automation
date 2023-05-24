import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CardFeatureBlockPage from '../../pageobjects/CMS/Components/cardFeature.page';
import {users} from '../../data/users.data';
import { cardFeatureBlockData } from '../../data/cardFeature.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Card Feature Component Tests', () => {
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
        const screenshotPath = `./screenshots/CardFeature/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
    it('Verify that a site Content Administrator can create a Card Feature Component', async () => {
        const headline = cardFeatureBlockData.headline;
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardFeature).scrollIntoView();
        (await QALayoutPage.btnCardFeature).click();
        (await CardFeatureBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardFeatureBlockPage.createCardFeature(cardFeatureBlockData.title, cardFeatureBlockData.headline, cardFeatureBlockData.eyebrow, cardFeatureBlockData.list, cardFeatureBlockData.btnText, cardFeatureBlockData.url,imageFilePath, cardFeatureBlockData.altText);

        expect(CardFeatureBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardFeatureBlockPage.cardFeatureElement).scrollIntoView();
        
        expect(await $(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        expect(await $('a[href="https://google.com/"]')).toExist; 
        expect(await CardFeatureBlockPage.cardFeatureImage).toBeDisplayed();   
    });

    it('Verify that a site Content Administrator can create a Card Clinical Feature Component, using an internal url', async () => {
        const headline = cardFeatureBlockData.headline;
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardFeature).scrollIntoView();
        (await QALayoutPage.btnCardFeature).click();
        (await CardFeatureBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await CardFeatureBlockPage.createCardFeatureInternal(cardFeatureBlockData.title, cardFeatureBlockData.headline, cardFeatureBlockData.eyebrow, cardFeatureBlockData.list, cardFeatureBlockData.btnText,imageFilePath, cardFeatureBlockData.altText);

        expect(CardFeatureBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardFeatureBlockPage.cardFeatureElement).scrollIntoView();
        
        expect(await $(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        expect(await $('a[href="/education/residency"]')).toExist; 
        expect(await CardFeatureBlockPage.cardFeatureImage).toBeDisplayed();   
    });


    it.only('Verify that all design fields are present with the correct available options.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardFeature).scrollIntoView();
        (await QALayoutPage.btnCardFeature).click();
        (await CardFeatureBlockPage.configBlock).waitForDisplayed();

        await CardFeatureBlockPage.navToStyling()
        
        expect(await CardFeatureBlockPage.dropdownContentPosition).toBeDisplayed();
        expect(await CardFeatureBlockPage.dropdownContentPosition).toHaveValue('_none');
        expect(await CardFeatureBlockPage.dropdownContentPosition).toHaveValue('left');
        expect(await CardFeatureBlockPage.dropdownContentPosition).toHaveValue('right');

        const insetCheckbox = await CardFeatureBlockPage.checkboxInset;
        await insetCheckbox.scrollIntoView();
        expect(await insetCheckbox).toBeDisplayed();
        expect(await insetCheckbox.isSelected()).toBe(false);

        expect(await CardFeatureBlockPage.dropdownDesktopAspectRatio).toBeDisplayed();
        expect(await CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('none');
        expect(await CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('fluid');
        expect(await CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('1:1');
        expect(await CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('5:4');
        expect(await CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('4:3');
        expect(await CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:4');
        expect(await CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:2');
        expect(await CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('16:9');
        expect(await CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('2:1');
        expect(await CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('21:9');
        expect(await CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('25:6');

        expect(await CardFeatureBlockPage.dropdownMobileAspectRatio).toBeDisplayed();
        expect(await CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('none');
        expect(await CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('fluid');
        expect(await CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('1:1');
        expect(await CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('5:4');
        expect(await CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('4:3');
        expect(await CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('3:4');
        expect(await CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('3:2');
        expect(await CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('16:9');
        expect(await CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('2:1');
        expect(await CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('21:9');
        expect(await CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('25:6');

        expect(await CardFeatureBlockPage.dropdownTheme).toBeDisplayed();
        expect(await CardFeatureBlockPage.dropdownTheme).toHaveValue('_none');
        expect(await CardFeatureBlockPage.dropdownTheme).toHaveValue('dark');
        expect(await CardFeatureBlockPage.dropdownTheme).toHaveValue('light');

        expect(await CardFeatureBlockPage.dropdownAlignment).toBeDisplayed();
        expect(await CardFeatureBlockPage.dropdownAlignment).toHaveValue('_none');
        expect(await CardFeatureBlockPage.dropdownAlignment).toHaveValue('left');
        expect(await CardFeatureBlockPage.dropdownAlignment).toHaveValue('center');

        expect(await CardFeatureBlockPage.dropdownBackground).toBeDisplayed();
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('_none');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('white');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('soft-blue');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('soft-gray');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('mist-gray');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('soft-fuchsia');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('montefiore-primary-500');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('montefiore-secondary-500');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('einstein-primary-500');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('einstein-secondary-500');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('sky');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('water');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('flesh');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('wheat');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('mint');
        expect(await CardFeatureBlockPage.dropdownBackground).toHaveValue('bronze');

        const minimalCheckbox = await CardFeatureBlockPage.checkboxMinimal;
        expect(await minimalCheckbox).toBeDisplayed();
        expect(await minimalCheckbox.isSelected()).toBe(false);
    });

  });
