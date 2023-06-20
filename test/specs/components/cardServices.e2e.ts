import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CardServicesBlockPage from '../../pageobjects/CMS/Components/cardServices.page';
import {users} from '../../data/users.data';
import { cardServicesBlockData } from '../../data/cardServices.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Card Services Component Tests', () => {
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
        const screenshotPath = `./screenshots/CardServices/${testName}.png`;
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

  
    it('[S3C903] Verify that a site Content Administrator can create a Card Services Component with an external link', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardServices).scrollIntoView();
        (await QALayoutPage.btnCardServices).click();
        (await CardServicesBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardServicesBlockPage.createCardServiceExtLink(cardServicesBlockData.title, cardServicesBlockData.eyebrow, cardServicesBlockData.headline, cardServicesBlockData.content, cardServicesBlockData.list, cardServicesBlockData.btnText, cardServicesBlockData.btnUrl,cardServicesBlockData.linkText, cardServicesBlockData.linkUrl, cardServicesBlockData.infolabel, imageFilePath, cardServicesBlockData.altText);

        await expect(CardServicesBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardServicesBlockPage.cardContent).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(CardServicesBlockPage.cardServicesElement).toExist; 
        await expect(await CardServicesBlockPage.cardContent).toHaveText(cardServicesBlockData.content);   
    });

    it('[S3C904] Verify that a site Content Administrator can create a Card Services Component with an internal link', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardServices).scrollIntoView();
        (await QALayoutPage.btnCardServices).click();
        (await CardServicesBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await CardServicesBlockPage.createCardServiceIntLink(cardServicesBlockData.title, cardServicesBlockData.eyebrow, cardServicesBlockData.headline, cardServicesBlockData.content, cardServicesBlockData.list, cardServicesBlockData.resiText ,cardServicesBlockData.resiLink, cardServicesBlockData.infolabel, imageFilePath, cardServicesBlockData.altText);

        await expect(CardServicesBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardServicesBlockPage.listElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(CardServicesBlockPage.internalLink).toExist;  
        await expect(await $('.mt-16')).toHaveText(cardServicesBlockData.resiText) 
    });

    // it('[S3C905] Verify that all design fields are present with the correct available options.', async () => {
    //     (await QALayoutPage.tabLayout).click();
    //     await QALayoutPage.createNewSection();
    //     await QALayoutPage.navigateToBlockList();
    //     (await QALayoutPage.btnCardServices).scrollIntoView();
    //     (await QALayoutPage.btnCardServices).click();
    //     (await CardServicesBlockPage.configBlock).waitForDisplayed();

    //     await CardServicesBlockPage.navToStyling()
        
    //     await expect(CardServicesBlockPage.dropdownBackground).toBeDisplayed();
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('_none');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('white');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('soft-blue');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('soft-gray');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('mist-gray');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('soft-fuchsia');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('montefiore-primary-500');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('montefiore-secondary-500');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('einstein-primary-500');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('einstein-secondary-500');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('sky');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('water');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('flesh');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('wheat');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('mint');
    //     await expect(CardServicesBlockPage.dropdownBackground).toHaveValue('bronze');

    //     await expect(CardServicesBlockPage.dropdownContentPosition).toBeDisplayed();
    //     await expect(CardServicesBlockPage.dropdownContentPosition).toHaveValue('_none');
    //     await expect(CardServicesBlockPage.dropdownContentPosition).toHaveValue('left');
    //     await expect(CardServicesBlockPage.dropdownContentPosition).toHaveValue('right');

    //     await expect(CardServicesBlockPage.dropdownServicesDisplay).toBeDisplayed();
    //     await expect(CardServicesBlockPage.dropdownServicesDisplay).toHaveValue('_none');
    //     await expect(CardServicesBlockPage.dropdownServicesDisplay).toHaveValue('grid');
    //     await expect(CardServicesBlockPage.dropdownServicesDisplay).toHaveValue('inline');

    //     const minimalCheckbox = await CardServicesBlockPage.checkboxMinimal;
    //     await expect(minimalCheckbox).toBeDisplayed();
    //     await expect(minimalCheckbox.isSelected()).toBe(false);

    //     await expect(CardServicesBlockPage.dropdownMobileAspectRatio).toBeDisplayed();
    //     await expect(CardServicesBlockPage.dropdownMobileAspectRatio).toHaveValue('none');
    //     await expect(CardServicesBlockPage.dropdownMobileAspectRatio).toHaveValue('fluid');
    //     await expect(CardServicesBlockPage.dropdownMobileAspectRatio).toHaveValue('1:1');
    //     await expect(CardServicesBlockPage.dropdownMobileAspectRatio).toHaveValue('5:4');
    //     await expect(CardServicesBlockPage.dropdownMobileAspectRatio).toHaveValue('4:3');
    //     await expect(CardServicesBlockPage.dropdownMobileAspectRatio).toHaveValue('3:4');
    //     await expect(CardServicesBlockPage.dropdownMobileAspectRatio).toHaveValue('3:2');
    //     await expect(CardServicesBlockPage.dropdownMobileAspectRatio).toHaveValue('16:9');
    //     await expect(CardServicesBlockPage.dropdownMobileAspectRatio).toHaveValue('2:1');
    //     await expect(CardServicesBlockPage.dropdownMobileAspectRatio).toHaveValue('21:9');
    //     await expect(CardServicesBlockPage.dropdownMobileAspectRatio).toHaveValue('25:6');
        
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toBeDisplayed();
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('none');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('fluid');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('1:1');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('5:4');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('4:3');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:4');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:2');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('16:9');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('2:1');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('21:9');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('25:6');

    //     await expect(CardServicesBlockPage.dropdownTheme).toBeDisplayed();
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('_none');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('dark');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('light');

    //     await expect(CardServicesBlockPage.dropdownAlignment).toBeDisplayed();
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('_none');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('left');
    //     await expect(CardServicesBlockPage.dropdownDesktopAspectRatio).toHaveValue('center');
    // });

  });
