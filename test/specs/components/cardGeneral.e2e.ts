import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CardGeneralBlockPage from '../../pageobjects/CMS/Components/cardGeneral.page';
import {users} from '../../data/users.data';
import { cardGeneralBlockData } from '../../data/cardGeneral.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';
import { cardFeatureBlockData } from '../../data/cardFeature.data';


describe('Card General Component Tests', () => {
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
        expect(await QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/CardGeneral/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        await AdminContentPage.getQALandingPage();
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        expect(await QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getQALandingPage();  
    });

  
    it('[S3C860] Verify that a site Content Administrator can create a  Card - General Component.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardGeneral).scrollIntoView();
        (await QALayoutPage.btnCardGeneral).click();
        (await CardGeneralBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardGeneralBlockPage.createCardGeneral(cardGeneralBlockData.title, cardGeneralBlockData.headline, cardGeneralBlockData.eyebrow, cardGeneralBlockData.list, cardGeneralBlockData.btnText, cardGeneralBlockData.url,imageFilePath, cardGeneralBlockData.altText);

        expect(CardGeneralBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardGeneralBlockPage.cardEyebrow).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        expect((await CardGeneralBlockPage.cardEyebrow).getText).toHaveText(cardFeatureBlockData.eyebrow); 
        expect(await CardGeneralBlockPage.cardGeneralElement).toBeDisplayed();   
    });

    it('[S3C861] Verify that the available paragraph types in the Card General form are correct.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardGeneral).scrollIntoView();
        (await QALayoutPage.btnCardGeneral).click();
        (await CardGeneralBlockPage.configBlock).waitForDisplayed();

        await CardGeneralBlockPage.navToStyling()
        
        expect(await CardGeneralBlockPage.dropdownSite).toBeDisplayed();
        expect(await CardGeneralBlockPage.dropdownSite).toHaveValue('_none');
        expect(await CardGeneralBlockPage.dropdownSite).toHaveValue('montefiore');
        expect(await CardGeneralBlockPage.dropdownSite).toHaveValue('einstein');

        expect(await CardGeneralBlockPage.dropdownContentPosition).toBeDisplayed();
        expect(await CardGeneralBlockPage.dropdownContentPosition).toHaveValue('_none');
        expect(await CardGeneralBlockPage.dropdownContentPosition).toHaveValue('left');
        expect(await CardGeneralBlockPage.dropdownContentPosition).toHaveValue('right');
        expect(await CardGeneralBlockPage.dropdownContentPosition).toHaveValue('inside');
        expect(await CardGeneralBlockPage.dropdownContentPosition).toHaveValue('below');

        await CardGeneralBlockPage.dropdownContentSize.scrollIntoView();
        expect(await CardGeneralBlockPage.dropdownContentSize).toBeDisplayed();
        expect(await CardGeneralBlockPage.dropdownContentSize).toHaveValue('_none');
        expect(await CardGeneralBlockPage.dropdownContentSize).toHaveValue('100');
        expect(await CardGeneralBlockPage.dropdownContentSize).toHaveValue('75');
        expect(await CardGeneralBlockPage.dropdownContentSize).toHaveValue('50');

        expect(await CardGeneralBlockPage.dropdownContentPadding).toBeDisplayed();
        expect(await CardGeneralBlockPage.dropdownContentPadding).toHaveValue('base');
        expect(await CardGeneralBlockPage.dropdownContentPadding).toHaveValue('none');
        expect(await CardGeneralBlockPage.dropdownContentPadding).toHaveValue('small');

        expect(await CardGeneralBlockPage.dropdownContentPadding).toBeDisplayed();
        expect(await CardGeneralBlockPage.dropdownContentPadding).toHaveValue('_none');
        expect(await CardGeneralBlockPage.dropdownContentPadding).toHaveValue('center');
        expect(await CardGeneralBlockPage.dropdownContentPadding).toHaveValue('bottom');

        expect(await CardGeneralBlockPage.dropdownContentBackground).toBeDisplayed();
        expect(await CardGeneralBlockPage.dropdownContentBackground).toHaveValue('none');
        expect(await CardGeneralBlockPage.dropdownContentBackground).toHaveValue('white');

        const fillCheckbox = await CardGeneralBlockPage.checkboxFill;
        expect(await fillCheckbox).toBeDisplayed();
        expect(await fillCheckbox.isSelected()).toBe(false);

        expect(await CardGeneralBlockPage.dropdownMobileAspectRatio).toBeDisplayed();
        expect(await CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('none');
        expect(await CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('fluid');
        expect(await CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('1:1');
        expect(await CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('5:4');
        expect(await CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('4:3');
        expect(await CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('3:4');
        expect(await CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('3:2');
        expect(await CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('16:9');
        expect(await CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('2:1');
        expect(await CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('21:9');
        expect(await CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('25:6');
        
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toBeDisplayed();
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('none');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('fluid');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('1:1');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('5:4');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('4:3');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:4');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:2');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('16:9');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('2:1');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('21:9');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('25:6');

        expect(await CardGeneralBlockPage.dropdownTheme).toBeDisplayed();
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('_none');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('dark');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('light');

        expect(await CardGeneralBlockPage.dropdownAlignment).toBeDisplayed();
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('_none');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('left');
        expect(await CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('center');

    });

  });
