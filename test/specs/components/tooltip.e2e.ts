import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import TooltipBlockPage from '../../pageobjects/CMS/Components/tooltip.page';
import {users} from '../../data/users.data';
import { tooltipBlockData } from '../../data/tooltip.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Tooltip Component Tests', () => {
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
        const screenshotPath = `./screenshots/Tooltip/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        await AdminContentPage.getQALandingPage();
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getQALandingPage();  
    });
  
    it('[S3C890] Verify that a site Content Administrator can create a Tooltip Component by highlighting text on the website', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnRichText).scrollIntoView();
        (await QALayoutPage.btnRichText).click();
        (await TooltipBlockPage.configBlock).waitForDisplayed();

        await TooltipBlockPage.createHighlightTooltip(tooltipBlockData.title, tooltipBlockData.tooltip, tooltipBlockData.text, tooltipBlockData.placement, tooltipBlockData.theme);

        await expect(TooltipBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TooltipBlockPage.tooltipElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(TooltipBlockPage.tooltipElement).toHaveText(tooltipBlockData.text); 
        
        await (await TooltipBlockPage.tooltipElement).moveTo();
        await expect($('span[aria-describedby="tippy-1"]')).toBeExisting(); 
    });

    it('[S3C891] Verify that a site Content Administrator can create a Tooltip Component by adding new text on the website', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnRichText).scrollIntoView();
        (await QALayoutPage.btnRichText).click();
        (await TooltipBlockPage.configBlock).waitForDisplayed();

        await TooltipBlockPage.createTextTooltip(tooltipBlockData.title, tooltipBlockData.tooltip, tooltipBlockData.text, tooltipBlockData.placement, tooltipBlockData.theme);

        await expect(TooltipBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TooltipBlockPage.tooltipElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(TooltipBlockPage.tooltipElement).toHaveText(tooltipBlockData.text); 
        
        await (await TooltipBlockPage.tooltipElement).moveTo();
        await expect($('span[aria-describedby="tippy-1"]')).toBeExisting();
    });

    it('[S3C892] Verify that when a user hovers over a Tooltip the text is displayed correctly', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnRichText).scrollIntoView();
        (await QALayoutPage.btnRichText).click();
        (await TooltipBlockPage.configBlock).waitForDisplayed();

        await TooltipBlockPage.createHighlightTooltip(tooltipBlockData.title, tooltipBlockData.tooltip, tooltipBlockData.text, tooltipBlockData.placement, tooltipBlockData.theme);

        await expect(TooltipBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TooltipBlockPage.tooltipElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(TooltipBlockPage.tooltipElement).toHaveText(tooltipBlockData.text); 
        
        await (await TooltipBlockPage.tooltipElement).moveTo();
        await expect($('span[aria-describedby="tippy-1"]')).toBeExisting(); 
    });

    it('[S3C893] Verify no maximum length set on tooltip text', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnRichText).scrollIntoView();
        (await QALayoutPage.btnRichText).click();
        (await TooltipBlockPage.configBlock).waitForDisplayed();

        await TooltipBlockPage.createHighlightTooltip(tooltipBlockData.title, tooltipBlockData.longTooltip, tooltipBlockData.text, tooltipBlockData.placement, tooltipBlockData.theme);

        await expect(TooltipBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        
        await expect(TooltipBlockPage.tooltipElement).toHaveText(tooltipBlockData.text); 
        
        await (await TooltipBlockPage.tooltipElement).moveTo();
        await expect($('span[aria-describedby="tippy-1"]')).toBeExisting(); 
        const tipValue = (await TooltipBlockPage.tooltipElement).getAttribute(`x-tooltip.raw.theme.top.placement.top`);
        await expect(await tipValue).toEqual(tooltipBlockData.longTooltip);
    });

    it('[S3C894] Verify that tooltip is a required field', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnRichText).scrollIntoView();
        (await QALayoutPage.btnRichText).click();
        (await TooltipBlockPage.configBlock).waitForDisplayed();

        await TooltipBlockPage.navToTooltip();

        const elem = await TooltipBlockPage.inputAddTooltip;
        await expect(await elem.getAttribute('aria-required')).toEqual('true');
    });

  });
