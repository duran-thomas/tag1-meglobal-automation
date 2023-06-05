import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import IconListBlockPage from '../../pageobjects/CMS/Components/iconList.page';
import {users} from '../../data/users.data';
import { iconListBlockData } from '../../data/iconList.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Icon List Component Tests', () => {
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
        const screenshotPath = `./screenshots/IconList/${testName}.png`;
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
  
    it('[S3C899] Verify that a site Content Administrator can create an Icon List Component with a single Item', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnIconList).scrollIntoView();
        (await QALayoutPage.btnIconList).click();
        (await IconListBlockPage.configBlock).waitForDisplayed();

        await IconListBlockPage.createIconList(iconListBlockData.title, iconListBlockData.text);

        expect(IconListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await IconListBlockPage.iconListElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        expect(await IconListBlockPage.iconStyle).toHaveAttribute('data-analytics-click-text="bullet-square"'); 
        expect(await IconListBlockPage.listItem).toHaveText(iconListBlockData.text);   
    });

    it('[S3C900] Verify that a site Content Administrator can create an Icon List Component with multiple Items', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnIconList).scrollIntoView();
        (await QALayoutPage.btnIconList).click();
        (await IconListBlockPage.configBlock).waitForDisplayed();

        await IconListBlockPage.createMultiIconList(iconListBlockData.title, iconListBlockData.text+' 1', iconListBlockData.text+' 2', iconListBlockData.text+' 3', iconListBlockData.text+' 4', iconListBlockData.text+' 5', iconListBlockData.text+' 6');

        expect(IconListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await IconListBlockPage.iconListElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        expect(await IconListBlockPage.iconStyle).toHaveAttribute('data-analytics-click-text="bullet-square"'); 
        expect(await IconListBlockPage.listItem).toHaveText(iconListBlockData.text);   
        expect(await IconListBlockPage.lastItem).not.toHaveAttribute('data-analytics-click-text');
    });

    it('[S3C901] Verify that the text field item on the Icon List Component is a mandatory field', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnIconList).scrollIntoView();
        (await QALayoutPage.btnIconList).click();
        (await IconListBlockPage.configBlock).waitForDisplayed();

        await IconListBlockPage.submitTest(iconListBlockData.title);

        expect(await IconListBlockPage.inputText).toHaveAttribute('required="required"'); 
        expect(await IconListBlockPage.inputText).toHaveAttribute('aria-required="true"');  
    });
   
    it('[S3C902] Verify that the available paragraph types in the Carousel form are correct.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnIconList).scrollIntoView();
        (await QALayoutPage.btnIconList).click();
        (await IconListBlockPage.configBlock).waitForDisplayed();

        await IconListBlockPage.navToStyling()
        
        expect(await IconListBlockPage.dropdownVariant).toBeDisplayed();
        expect(await IconListBlockPage.dropdownVariant).toHaveValue('_none');
        expect(await IconListBlockPage.dropdownVariant).toHaveValue('dark');
        expect(await IconListBlockPage.dropdownVariant).toHaveValue('light');

        expect(await IconListBlockPage.dropdownSite).toBeDisplayed();
        expect(await IconListBlockPage.dropdownSite).toHaveValue('_none');
        expect(await IconListBlockPage.dropdownSite).toHaveValue('montefiore');
        expect(await IconListBlockPage.dropdownSite).toHaveValue('einstein');

        expect(await IconListBlockPage.dropdownSize).toBeDisplayed();
        expect(await IconListBlockPage.dropdownSize).toHaveValue('_none');
        expect(await IconListBlockPage.dropdownSize).toHaveValue('small');
        expect(await IconListBlockPage.dropdownSize).toHaveValue('base');
        expect(await IconListBlockPage.dropdownSize).toHaveValue('large');

        expect(await IconListBlockPage.dropdownAlignment).toBeDisplayed();
        expect(await IconListBlockPage.dropdownAlignment).toHaveValue('_none');
        expect(await IconListBlockPage.dropdownAlignment).toHaveValue('left');
        expect(await IconListBlockPage.dropdownAlignment).toHaveValue('center');
    });

  });
