import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import IconListBlockPage from '../../pageobjects/CMS/Components/iconList.page';
import { iconListBlockData } from '../../data/iconList.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';



describe('Icon List Component Tests', () => {
    
    before(async ()=>{
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);

        // Use the environment data
        const bypassURL = environment.bypassURL;
        const cookies = environment.cookies;

        //Bypass login
        await browser.url(await bypassURL);
        await browser.maximizeWindow();

        // Set user cookies
        await browser.setCookies(await cookies);

    });

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
        const screenshotPath = `./screenshots/IconList/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
     await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        //await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);  
    });

    //delete page
    after(async function () {
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);
        //await browser.url(environment.baseUrl+'user/logout');
        await browser.setCookies(environment.admin);
        await AdminContentPage.open();
        await AdminContentPage.deleteTestPage(global.suiteDescription);
        await expect($('.mf-alert__container--highlight')).toBeDisplayed();
    });

     
    it('[S3C899] Verify that a site Content Administrator can create an Icon List Component with a single Item', async () => {
        const id=`IconList-S3C899-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnIconList).scrollIntoView();
        (await QALayoutPage.btnIconList).click();
        (await IconListBlockPage.configBlock).waitForDisplayed();

        await IconListBlockPage.createIconList(iconListBlockData.title, iconListBlockData.text);

        await expect(IconListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await IconListBlockPage.iconListElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect($(`#${id} span[data-analytics-click-text="bullet-square"]`)).toBeExisting(); 
        await expect(IconListBlockPage.listItem(id)).toHaveText(iconListBlockData.text);   
    });

    it('[S3C900] Verify that a site Content Administrator can create an Icon List Component with multiple Items', async () => {
        const id=`IconList-S3C900-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnIconList).scrollIntoView();
        (await QALayoutPage.btnIconList).click();
        (await IconListBlockPage.configBlock).waitForDisplayed();

        await IconListBlockPage.createMultiIconList(iconListBlockData.title, iconListBlockData.text+' 1', iconListBlockData.text+' 2', iconListBlockData.text+' 3', iconListBlockData.text+' 4', iconListBlockData.text+' 5', iconListBlockData.text+' 6');

        await expect(IconListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await IconListBlockPage.iconListElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect($(`#${id} span[data-analytics-click-text="bullet-square"]`)).toBeExisting() 
        await expect(IconListBlockPage.listItem(id)).toHaveText(iconListBlockData.text+' 1');
        await expect(IconListBlockPage.lastItem).not.toHaveAttribute('data-analytics-click-text');
    });

    it('[S3C901] Verify that the text field item on the Icon List Component is a mandatory field', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnIconList).scrollIntoView();
        (await QALayoutPage.btnIconList).click();
        (await IconListBlockPage.configBlock).waitForDisplayed();

        await IconListBlockPage.submitTest(iconListBlockData.title);
        const elem = await IconListBlockPage.inputText;
        await expect(await elem.getAttribute('aria-required')).toEqual('true');

    });
   
    // it('[S3C902] Verify that the available paragraph types in the Carousel form are correct.', async () => {
    //  await (await QALayoutPage.tabLayout).click();
    //     await QALayoutPage.createNewSection();
    //     await QALayoutPage.navigateToBlockList();
    //     (await QALayoutPage.btnIconList).scrollIntoView();
    //     (await QALayoutPage.btnIconList).click();
    //     (await IconListBlockPage.configBlock).waitForDisplayed();

    //     await IconListBlockPage.navToStyling()
        
    //     await expect(IconListBlockPage.dropdownVariant).toBeDisplayed();
    //     await expect(IconListBlockPage.dropdownVariant).toHaveValue('_none');
    //     await expect(IconListBlockPage.dropdownVariant).toHaveValue('dark');
    //     await expect(IconListBlockPage.dropdownVariant).toHaveValue('light');

    //     await expect(IconListBlockPage.dropdownSite).toBeDisplayed();
    //     await expect(IconListBlockPage.dropdownSite).toHaveValue('_none');
    //     await expect(IconListBlockPage.dropdownSite).toHaveValue('montefiore');
    //     await expect(IconListBlockPage.dropdownSite).toHaveValue('einstein');

    //     await expect(IconListBlockPage.dropdownSize).toBeDisplayed();
    //     await expect(IconListBlockPage.dropdownSize).toHaveValue('_none');
    //     await expect(IconListBlockPage.dropdownSize).toHaveValue('small');
    //     await expect(IconListBlockPage.dropdownSize).toHaveValue('base');
    //     await expect(IconListBlockPage.dropdownSize).toHaveValue('large');

    //     await expect(IconListBlockPage.dropdownAlignment).toBeDisplayed();
    //     await expect(IconListBlockPage.dropdownAlignment).toHaveValue('_none');
    //     await expect(IconListBlockPage.dropdownAlignment).toHaveValue('left');
    //     await expect(IconListBlockPage.dropdownAlignment).toHaveValue('center');
    // });

  });
