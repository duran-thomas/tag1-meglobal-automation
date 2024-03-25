import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import TooltipBlockPage from '../../pageobjects/CMS/Components/tooltip.page';
import { tooltipBlockData } from '../../data/tooltip.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';



describe('Tooltip Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/Tooltip/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
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

     
    it('[S3C890] Verify that a site Content Administrator can create a Tooltip Component by highlighting text on the website', async () => {
        const id=`Tooltip-S3C890-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnRichText).scrollIntoView();
        (await QALayoutPage.btnRichText).click();
        (await TooltipBlockPage.configBlock).waitForDisplayed();

        await TooltipBlockPage.createHighlightTooltip(tooltipBlockData.title, tooltipBlockData.tooltip, tooltipBlockData.text, tooltipBlockData.placement, tooltipBlockData.theme);

        await expect(TooltipBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TooltipBlockPage.tooltipElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(TooltipBlockPage.tooltipElement(id)).toHaveText(tooltipBlockData.text); 
        
        await (await TooltipBlockPage.tooltipElement(id)).moveTo();
        await expect($('span[aria-describedby="tippy-1"]')).toBeExisting(); 
    });

    it('[S3C891] Verify that a site Content Administrator can create a Tooltip Component by adding new text on the website', async () => {
        const id=`Tooltip-S3C891-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnRichText).scrollIntoView();
        (await QALayoutPage.btnRichText).click();
        (await TooltipBlockPage.configBlock).waitForDisplayed();

        await TooltipBlockPage.createTextTooltip(tooltipBlockData.title, tooltipBlockData.tooltip, tooltipBlockData.text, tooltipBlockData.placement, tooltipBlockData.theme);

        await expect(TooltipBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TooltipBlockPage.tooltipElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(TooltipBlockPage.tooltipElement(id)).toHaveText(tooltipBlockData.text); 
        
        await (await TooltipBlockPage.tooltipElement(id)).moveTo();
        await expect($('span[aria-describedby="tippy-1"]')).toBeExisting();
    });

    it('[S3C892] Verify that when a user hovers over a Tooltip the text is displayed correctly', async () => {
        const id=`Tooltip-S3C892-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnRichText).scrollIntoView();
        (await QALayoutPage.btnRichText).click();
        (await TooltipBlockPage.configBlock).waitForDisplayed();

        await TooltipBlockPage.createHighlightTooltip(tooltipBlockData.title, tooltipBlockData.tooltip, tooltipBlockData.text, tooltipBlockData.placement, tooltipBlockData.theme);

        await expect(TooltipBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TooltipBlockPage.tooltipElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(TooltipBlockPage.tooltipElement(id)).toHaveText(tooltipBlockData.text); 
        
        await (await TooltipBlockPage.tooltipElement(id)).moveTo();
        await expect($('span[aria-describedby="tippy-1"]')).toBeExisting(); 
    });

    it('[S3C893] Verify no maximum length set on tooltip text', async () => {
        const id=`Tooltip-S3C893-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnRichText).scrollIntoView();
        (await QALayoutPage.btnRichText).click();
        (await TooltipBlockPage.configBlock).waitForDisplayed();

        await TooltipBlockPage.createHighlightTooltip(tooltipBlockData.title, tooltipBlockData.longTooltip, tooltipBlockData.text, tooltipBlockData.placement, tooltipBlockData.theme);

        await expect(TooltipBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        
        await expect(TooltipBlockPage.tooltipElement(id)).toHaveText(tooltipBlockData.text); 
        
        await (await TooltipBlockPage.tooltipElement(id)).moveTo();
        await expect($('span[aria-describedby="tippy-1"]')).toBeExisting(); 
        const tipValue = (await TooltipBlockPage.tooltipElement(id)).getAttribute(`x-tooltip.raw.theme.top.placement.top`);
        await expect(await tipValue).toEqual(tooltipBlockData.longTooltip);
    });

    it.skip('[S3C894] Verify that tooltip is a required field', async () => {
        const id=`Tooltip-S3C894-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnRichText).scrollIntoView();
        (await QALayoutPage.btnRichText).click();
        (await TooltipBlockPage.configBlock).waitForDisplayed();

        await TooltipBlockPage.navToTooltip();

        const elem = await TooltipBlockPage.inputAddTooltip;
        await expect(await elem.getAttribute('aria-required')).toEqual('true');
    });

  });
