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
        await expect(QALayoutPage.tabLayout).toBeDisplayed();
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
        await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
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
        
        await expect(IconListBlockPage.iconStyle).toHaveAttribute('data-analytics-click-text="bullet-square"'); 
        await expect(IconListBlockPage.listItem).toHaveText(iconListBlockData.text);   
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
        
        await expect(IconListBlockPage.iconStyle).toHaveAttribute('data-analytics-click-text="bullet-square"'); 
        await expect(IconListBlockPage.listItem).toHaveText(iconListBlockData.text);   
        await expect(IconListBlockPage.lastItem).not.toHaveAttribute('data-analytics-click-text');
    });

    it('[S3C901] Verify that the text field item on the Icon List Component is a mandatory field', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnIconList).scrollIntoView();
        (await QALayoutPage.btnIconList).click();
        (await IconListBlockPage.configBlock).waitForDisplayed();

        await IconListBlockPage.submitTest(iconListBlockData.title);

        await expect(IconListBlockPage.inputText).toHaveAttribute('required="required"'); 
        await expect(IconListBlockPage.inputText).toHaveAttribute('aria-required="true"');  
    });
   
    it('[S3C902] Verify that the available paragraph types in the Carousel form are correct.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnIconList).scrollIntoView();
        (await QALayoutPage.btnIconList).click();
        (await IconListBlockPage.configBlock).waitForDisplayed();

        await IconListBlockPage.navToStyling()
        
        await expect(IconListBlockPage.dropdownVariant).toBeDisplayed();
        await expect(IconListBlockPage.dropdownVariant).toHaveValue('_none');
        await expect(IconListBlockPage.dropdownVariant).toHaveValue('dark');
        await expect(IconListBlockPage.dropdownVariant).toHaveValue('light');

        await expect(IconListBlockPage.dropdownSite).toBeDisplayed();
        await expect(IconListBlockPage.dropdownSite).toHaveValue('_none');
        await expect(IconListBlockPage.dropdownSite).toHaveValue('montefiore');
        await expect(IconListBlockPage.dropdownSite).toHaveValue('einstein');

        await expect(IconListBlockPage.dropdownSize).toBeDisplayed();
        await expect(IconListBlockPage.dropdownSize).toHaveValue('_none');
        await expect(IconListBlockPage.dropdownSize).toHaveValue('small');
        await expect(IconListBlockPage.dropdownSize).toHaveValue('base');
        await expect(IconListBlockPage.dropdownSize).toHaveValue('large');

        await expect(IconListBlockPage.dropdownAlignment).toBeDisplayed();
        await expect(IconListBlockPage.dropdownAlignment).toHaveValue('_none');
        await expect(IconListBlockPage.dropdownAlignment).toHaveValue('left');
        await expect(IconListBlockPage.dropdownAlignment).toHaveValue('center');
    });

  });
