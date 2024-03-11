import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import ProgressIndicatorBlockPage from '../../pageobjects/CMS/Components/progressIndicator.page';
import { progressIndicatorBlockData } from '../../data/progressIndicator.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';


describe('Progress Indicator Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/ProgressIndicator/${testName}.png`;
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

  
    it('[S3C1115] Verify a Content Administrator can create a Progress Indicator with default settings', async () => {
        const id=`ProgressIndicator-S3C1115-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnProgressIndicator).scrollIntoView();
        await (await QALayoutPage.btnProgressIndicator).click();
        await (await ProgressIndicatorBlockPage.configBlock).waitForDisplayed();

        await ProgressIndicatorBlockPage.createDefaultProgressIndicator(progressIndicatorBlockData.adminTitle);

        await expect(ProgressIndicatorBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await $('h1')).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ProgressIndicatorBlockPage.progressIndicatorElement(id)).toBeExisting();   
        await expect(await ProgressIndicatorBlockPage.indicatorTextElement(id)).toHaveText('100%'); 
    });

    it('[S3C1116] Verify the results of Theme field settings', async () => {
        const id=`ProgressIndicator-S3C1116-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnProgressIndicator).scrollIntoView();
        await (await QALayoutPage.btnProgressIndicator).click();
        await (await ProgressIndicatorBlockPage.configBlock).waitForDisplayed();

        await ProgressIndicatorBlockPage.createMinimalProgressIndicator(progressIndicatorBlockData.adminTitle, '63');

        await expect(ProgressIndicatorBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await $('h1')).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ProgressIndicatorBlockPage.progressIndicatorElement(id)).toBeExisting();   
        await expect(await ProgressIndicatorBlockPage.indicatorTextElement(id)).not.toBeExisting(); 
        //await expect(await ProgressIndicatorBlockPage.progressIndicatorElement.getAttribute('class')).toHaveTextContaining('h-4'); //h-4 is the change in class for a thin bar 
        const indicatorElement = await ProgressIndicatorBlockPage.progressIndicatorElement(id);
        const thinBar = await indicatorElement.getAttribute('class');
        await expect(thinBar).toContain('h-4');

        //delete for next part to test case
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);

        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnProgressIndicator).scrollIntoView();
        await (await QALayoutPage.btnProgressIndicator).click();
        await (await ProgressIndicatorBlockPage.configBlock).waitForDisplayed();

        await ProgressIndicatorBlockPage.createFullProgressIndicator(progressIndicatorBlockData.adminTitle, '23');

        await expect(ProgressIndicatorBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await $('h1')).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ProgressIndicatorBlockPage.progressIndicatorElement(id)).toBeExisting();   
        await expect(await ProgressIndicatorBlockPage.indicatorTextElement(id)).toHaveText('23%'); 
        //await expect((await ProgressIndicatorBlockPage.progressIndicatorElement).getAttribute('class')).toContain('h-20'); //h-20 is the change in class for a full bar 

        const progressIndicatorElement = await ProgressIndicatorBlockPage.progressIndicatorElement(id);
        const fullBar = await progressIndicatorElement.getAttribute('class');
        await expect(fullBar).toContain('h-20');

    });

    it('[S3C1117] Verify limits of Percentage field', async () => {
        const id=`ProgressIndicator-S3C1117-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnProgressIndicator).scrollIntoView();
        await (await QALayoutPage.btnProgressIndicator).click();
        await (await ProgressIndicatorBlockPage.configBlock).waitForDisplayed();

        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);

        const element = await ProgressIndicatorBlockPage.inputPercentage;

        // Assert that the element has the specified attribute with the expected value
        await expect(element).toHaveAttribute('type', 'number');
        await expect(element).toHaveAttribute('min', '0');
        await expect(element).toHaveAttribute('max', '100');

    });



  });
