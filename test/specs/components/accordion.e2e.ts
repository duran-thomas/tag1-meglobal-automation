import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import AccordionBlockPage from '../../pageobjects/CMS/Components/accordion.page';
import {users} from '../../data/users.data';
import { accordionBlockData } from '../../data/accordion.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Accordion Component Tests', () => {
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
        const screenshotPath = `./screenshots/Accordion/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete page
    after(async function () {
        await AdminContentPage.open();
        await AdminContentPage.deleteTestPage(global.suiteDescription);
        await expect($('.mf-alert__container--highlight')).toBeDisplayed();
    });

  
    it('[S3C906] Verify that a site Content Administrator can create an Accordion Component, Show|Hide included)', async () => {
        const title = accordionBlockData.title;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnAccordion).scrollIntoView();
        (await QALayoutPage.btnAccordion).click();
        (await AccordionBlockPage.configBlock).waitForDisplayed();

        await AccordionBlockPage.createAccordion(accordionBlockData.mainTitle, accordionBlockData.title, accordionBlockData.content);

        await expect(AccordionBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await AccordionBlockPage.accordionElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(AccordionBlockPage.accordionElement).toBeDisplayedInViewport();

    });

    it('[S3C907] Verify that contents of the Accordion Component can be toggled (hide and show)', async () => {
        const title = accordionBlockData.title;

        //Verify that the accordion content can be shown
        await (await AccordionBlockPage.accordionBtn).click();
        await expect($('.mf-rich-text')).toBeDisplayedInViewport(); 

        //Verify that the accordion content can be hidden
        await (await AccordionBlockPage.accordionBtn).click();
        await expect($('.mf-rich-text')).not.toBeDisplayedInViewport(); 

        //Re-open accordion for screenshot
        await (await AccordionBlockPage.accordionBtn).click();
        await browser.pause(1500);

    });

  });
