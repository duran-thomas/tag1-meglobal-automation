import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CardGeneralBlockPage from '../../pageobjects/CMS/Components/cardGeneral.page';
import { cardGeneralBlockData } from '../../data/cardGeneral.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';


describe('Card General Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/CardGeneral/${testName}.png`;
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

  
    it('[S3C860] Verify that a site Content Administrator can create a  Card - General Component.', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardGeneral).scrollIntoView();
        await (await QALayoutPage.btnCardGeneral).click();
        await (await CardGeneralBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardGeneralBlockPage.createCardGeneral(cardGeneralBlockData.title, cardGeneralBlockData.headline, cardGeneralBlockData.eyebrow, cardGeneralBlockData.list, cardGeneralBlockData.btnText, cardGeneralBlockData.url,imageFilePath, cardGeneralBlockData.altText);

        await expect(CardGeneralBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardGeneralBlockPage.cardEyebrow).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await CardGeneralBlockPage.cardEyebrow).toHaveText(cardGeneralBlockData.eyebrow); 
        await expect(CardGeneralBlockPage.cardGeneralElement).toBeExisting();   
    });

    // it('[S3C861] Verify that the available paragraph types in the Card General form are correct.', async () => {
    //  await (await QALayoutPage.tabLayout).click();
    //     await QALayoutPage.createNewSection();
    //     await QALayoutPage.navigateToBlockList();
    //     (await QALayoutPage.btnCardGeneral).scrollIntoView();
    //     (await QALayoutPage.btnCardGeneral).click();
    //     (await CardGeneralBlockPage.configBlock).waitForDisplayed();

    //     await CardGeneralBlockPage.navToStyling()
        
    //     await expect(CardGeneralBlockPage.dropdownSite).toBeDisplayed();
    //     await expect(CardGeneralBlockPage.dropdownSite).toHaveValue('_none');
    //     await expect(CardGeneralBlockPage.dropdownSite).toHaveValue('montefiore');
    //     await expect(CardGeneralBlockPage.dropdownSite).toHaveValue('einstein');

    //     await expect(CardGeneralBlockPage.dropdownContentPosition).toBeDisplayed();
    //     await expect(CardGeneralBlockPage.dropdownContentPosition).toHaveValue('_none');
    //     await expect(CardGeneralBlockPage.dropdownContentPosition).toHaveValue('left');
    //     await expect(CardGeneralBlockPage.dropdownContentPosition).toHaveValue('right');
    //     await expect(CardGeneralBlockPage.dropdownContentPosition).toHaveValue('inside');
    //     await expect(CardGeneralBlockPage.dropdownContentPosition).toHaveValue('below');

    //     await CardGeneralBlockPage.dropdownContentSize.scrollIntoView();
    //     await expect(CardGeneralBlockPage.dropdownContentSize).toBeDisplayed();
    //     await expect(CardGeneralBlockPage.dropdownContentSize).toHaveValue('_none');
    //     await expect(CardGeneralBlockPage.dropdownContentSize).toHaveValue('100');
    //     await expect(CardGeneralBlockPage.dropdownContentSize).toHaveValue('75');
    //     await expect(CardGeneralBlockPage.dropdownContentSize).toHaveValue('50');

    //     await expect(CardGeneralBlockPage.dropdownContentPadding).toBeDisplayed();
    //     await expect(CardGeneralBlockPage.dropdownContentPadding).toHaveValue('base');
    //     await expect(CardGeneralBlockPage.dropdownContentPadding).toHaveValue('none');
    //     await expect(CardGeneralBlockPage.dropdownContentPadding).toHaveValue('small');

    //     await expect(CardGeneralBlockPage.dropdownContentPadding).toBeDisplayed();
    //     await expect(CardGeneralBlockPage.dropdownContentPadding).toHaveValue('_none');
    //     await expect(CardGeneralBlockPage.dropdownContentPadding).toHaveValue('center');
    //     await expect(CardGeneralBlockPage.dropdownContentPadding).toHaveValue('bottom');

    //     await expect(CardGeneralBlockPage.dropdownContentBackground).toBeDisplayed();
    //     await expect(CardGeneralBlockPage.dropdownContentBackground).toHaveValue('none');
    //     await expect(CardGeneralBlockPage.dropdownContentBackground).toHaveValue('white');

    //     const fillCheckbox = await CardGeneralBlockPage.checkboxFill;
    //     await expect(fillCheckbox).toBeDisplayed();
    //     await expect(fillCheckbox.isSelected()).toBe(false);

    //     await expect(CardGeneralBlockPage.dropdownMobileAspectRatio).toBeDisplayed();
    //     await expect(CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('none');
    //     await expect(CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('fluid');
    //     await expect(CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('1:1');
    //     await expect(CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('5:4');
    //     await expect(CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('4:3');
    //     await expect(CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('3:4');
    //     await expect(CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('3:2');
    //     await expect(CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('16:9');
    //     await expect(CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('2:1');
    //     await expect(CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('21:9');
    //     await expect(CardGeneralBlockPage.dropdownMobileAspectRatio).toHaveValue('25:6');
        
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toBeDisplayed();
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('none');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('fluid');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('1:1');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('5:4');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('4:3');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:4');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:2');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('16:9');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('2:1');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('21:9');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('25:6');

    //     await expect(CardGeneralBlockPage.dropdownTheme).toBeDisplayed();
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('_none');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('dark');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('light');

    //     await expect(CardGeneralBlockPage.dropdownAlignment).toBeDisplayed();
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('_none');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('left');
    //     await expect(CardGeneralBlockPage.dropdownDesktopAspectRatio).toHaveValue('center');

    // });

  });
