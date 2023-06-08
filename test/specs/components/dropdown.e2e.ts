import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import DropdownBlockPage from '../../pageobjects/CMS/Components/dropdown.page';
import {users} from '../../data/users.data';
import { dropdownBlockData } from '../../data/dropdown.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Dropdown Component Tests', () => {
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
        const screenshotPath = `./screenshots/Dropdown/${testName}.png`;
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

    it('[S3C855] Verify that a site Content Administrator can create a Dropdown Component with 1 menu item', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await DropdownBlockPage.configBlock).waitForDisplayed();

        await DropdownBlockPage.createDropdownItem(dropdownBlockData.title, dropdownBlockData.triggerText, dropdownBlockData.url, dropdownBlockData.linkText);

        expect(DropdownBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await DropdownBlockPage.dropdownElement).scrollIntoView();
        
        expect(await DropdownBlockPage.dropdownElement).toExist; 

        await (await DropdownBlockPage.dropdownElement).click();
        expect(await DropdownBlockPage.duckDuckItem).toBeDisplayedInViewport(); 
    });

    it('[S3C856] Verify that a site Content Administrator can create a Dropdown Component with more than 1 menu item', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await DropdownBlockPage.configBlock).waitForDisplayed();

        await DropdownBlockPage.createDropdownMultiItem(dropdownBlockData.title, dropdownBlockData.triggerText, dropdownBlockData.url, dropdownBlockData.linkText, dropdownBlockData.triggerText1, dropdownBlockData.url1, dropdownBlockData.linkText1);

        await expect(DropdownBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await DropdownBlockPage.dropdownElement).scrollIntoView();

        const elem = await DropdownBlockPage.dropdownElements.length;
        
        expect(await elem).toEqual(2); 

        await (await DropdownBlockPage.dropdownElement1).click();
        expect(await DropdownBlockPage.wikiItem).toBeDisplayedInViewport(); 
    });
    

    it('[S3C857] Verify that all design fields are present with the correct available options.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await DropdownBlockPage.configBlock).waitForDisplayed();

        await DropdownBlockPage.navToStyling()
        
        expect(await DropdownBlockPage.dropdownSize).toBeDisplayed();
        expect(await DropdownBlockPage.dropdownSize).toHaveValue('auto');
        expect(await DropdownBlockPage.dropdownSize).toHaveValue('small');
        expect(await DropdownBlockPage.dropdownSize).toHaveValue('base');
        expect(await DropdownBlockPage.dropdownSize).toHaveValue('large');
        expect(await DropdownBlockPage.dropdownSize).toHaveValue('full-width');

        expect(DropdownBlockPage.inputMaxHeight).toBeDisplayed();
        expect(DropdownBlockPage.inputMaxHeight).toHaveValue('370');

        expect(await DropdownBlockPage.dropdownMobileListPosition).toBeDisplayed();
        expect(await DropdownBlockPage.dropdownMobileListPosition).toHaveValue('left');
        expect(await DropdownBlockPage.dropdownMobileListPosition).toHaveValue('right');
        expect(await DropdownBlockPage.dropdownMobileListPosition).toHaveValue('center');

        expect(await DropdownBlockPage.dropdownDesktopListPosition).toBeDisplayed();
        expect(await DropdownBlockPage.dropdownDesktopListPosition).toHaveValue('left');
        expect(await DropdownBlockPage.dropdownDesktopListPosition).toHaveValue('right');
        expect(await DropdownBlockPage.dropdownDesktopListPosition).toHaveValue('center');

        expect(await DropdownBlockPage.inputVerticalOffset).toBeDisplayed();
        expect(await DropdownBlockPage.inputVerticalOffset).toHaveValue('8');
        
        expect(await DropdownBlockPage.inputHorizontalOffset).toBeDisplayed();
        expect(await DropdownBlockPage.inputHorizontalOffset).toHaveValue('0');

    });

  });
