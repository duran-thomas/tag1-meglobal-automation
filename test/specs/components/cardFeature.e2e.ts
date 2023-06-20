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
        await AdminContentPage.getQALandingPage();  
        await expect(QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/CardFeature/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        await AdminContentPage.getQALandingPage();
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getQALandingPage();  
    });
  
    it('[S3C862] Verify that a site Content Administrator can create a Card Feature Component', async () => {
        const headline = cardFeatureBlockData.headline;
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardFeature).scrollIntoView();
        (await QALayoutPage.btnCardFeature).click();
        (await CardFeatureBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardFeatureBlockPage.createCardFeature(cardFeatureBlockData.title, cardFeatureBlockData.headline, cardFeatureBlockData.eyebrow, cardFeatureBlockData.list, cardFeatureBlockData.btnText, cardFeatureBlockData.url,imageFilePath, cardFeatureBlockData.altText);

        await expect(CardFeatureBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardFeatureBlockPage.cardFeatureElement).scrollIntoView();
        
        await expect($(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect($('a[href="https://google.com/"]')).toExist; 
        await expect(CardFeatureBlockPage.cardFeatureImage).toBeDisplayed();   
    });

    it('[S3C863] Verify that a site Content Administrator can create a Card Clinical Feature Component, using an internal url', async () => {
        const headline = cardFeatureBlockData.headline;
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardFeature).scrollIntoView();
        (await QALayoutPage.btnCardFeature).click();
        (await CardFeatureBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await CardFeatureBlockPage.createCardFeatureInternal(cardFeatureBlockData.title, cardFeatureBlockData.headline, cardFeatureBlockData.eyebrow, cardFeatureBlockData.list, cardFeatureBlockData.btnText,imageFilePath, cardFeatureBlockData.altText);

        await expect(CardFeatureBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardFeatureBlockPage.cardFeatureElement).scrollIntoView();
        
        await expect($(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect($('a[href="/education/residency"]')).toExist; 
        await expect(CardFeatureBlockPage.cardFeatureImage).toBeDisplayed();   
    });


    // it('[S3C864] Verify that all design fields are present with the correct available options.', async () => {
    //     (await QALayoutPage.tabLayout).click();
    //     await QALayoutPage.createNewSection();
    //     await QALayoutPage.navigateToBlockList();
    //     (await QALayoutPage.btnCardFeature).scrollIntoView();
    //     (await QALayoutPage.btnCardFeature).click();
    //     (await CardFeatureBlockPage.configBlock).waitForDisplayed();

    //     await CardFeatureBlockPage.navToStyling()
        
    //     await expect(CardFeatureBlockPage.dropdownContentPosition).toBeDisplayed();
    //     await expect(CardFeatureBlockPage.dropdownContentPosition).toHaveValue('_none');
    //     await expect(CardFeatureBlockPage.dropdownContentPosition).toHaveValue('left');
    //     await expect(CardFeatureBlockPage.dropdownContentPosition).toHaveValue('right');

    //     const insetCheckbox = await CardFeatureBlockPage.checkboxInset;
    //     await insetCheckbox.scrollIntoView();
    //     await expect(insetCheckbox).toBeDisplayed();
    //     await expect(insetCheckbox.isSelected()).toBe(false);

    //     await expect(CardFeatureBlockPage.dropdownDesktopAspectRatio).toBeDisplayed();
    //     await expect(CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('none');
    //     await expect(CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('fluid');
    //     await expect(CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('1:1');
    //     await expect(CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('5:4');
    //     await expect(CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('4:3');
    //     await expect(CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:4');
    //     await expect(CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:2');
    //     await expect(CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('16:9');
    //     await expect(CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('2:1');
    //     await expect(CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('21:9');
    //     await expect(CardFeatureBlockPage.dropdownDesktopAspectRatio).toHaveValue('25:6');

    //     await expect(CardFeatureBlockPage.dropdownMobileAspectRatio).toBeDisplayed();
    //     await expect(CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('none');
    //     await expect(CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('fluid');
    //     await expect(CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('1:1');
    //     await expect(CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('5:4');
    //     await expect(CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('4:3');
    //     await expect(CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('3:4');
    //     await expect(CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('3:2');
    //     await expect(CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('16:9');
    //     await expect(CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('2:1');
    //     await expect(CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('21:9');
    //     await expect(CardFeatureBlockPage.dropdownMobileAspectRatio).toHaveValue('25:6');

    //     await expect(CardFeatureBlockPage.dropdownTheme).toBeDisplayed();
    //     await expect(CardFeatureBlockPage.dropdownTheme).toHaveValue('_none');
    //     await expect(CardFeatureBlockPage.dropdownTheme).toHaveValue('dark');
    //     await expect(CardFeatureBlockPage.dropdownTheme).toHaveValue('light');

    //     await expect(CardFeatureBlockPage.dropdownAlignment).toBeDisplayed();
    //     await expect(CardFeatureBlockPage.dropdownAlignment).toHaveValue('_none');
    //     await expect(CardFeatureBlockPage.dropdownAlignment).toHaveValue('left');
    //     await expect(CardFeatureBlockPage.dropdownAlignment).toHaveValue('center');

    //     await expect(CardFeatureBlockPage.dropdownBackground).toBeDisplayed();
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('_none');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('white');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('soft-blue');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('soft-gray');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('mist-gray');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('soft-fuchsia');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('montefiore-primary-500');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('montefiore-secondary-500');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('einstein-primary-500');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('einstein-secondary-500');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('sky');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('water');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('flesh');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('wheat');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('mint');
    //     await expect(CardFeatureBlockPage.dropdownBackground).toHaveValue('bronze');

    //     const minimalCheckbox = await CardFeatureBlockPage.checkboxMinimal;
    //     await expect(minimalCheckbox).toBeDisplayed();
    //     await expect(minimalCheckbox.isSelected()).toBe(false);
    // });

  });
