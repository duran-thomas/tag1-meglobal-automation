import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import AccordionBlockPage from '../../pageobjects/CMS/Components/accordion.page';
import { accordionBlockData } from '../../data/accordion.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";


describe('Accordion Component Tests', () => {

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
        //await AdminContentPage.closeCookieBanner();
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
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);
        //await browser.url(environment.baseUrl+'user/logout');
        await browser.setCookies(environment.admin);
        await AdminContentPage.open();
        await AdminContentPage.deleteTestPage(global.suiteDescription);
        await expect($('.mf-alert__container--highlight')).toBeDisplayed();
    });

  
    it('[S3C906] Verify that a site Content Administrator can create an Accordion Component', async () => {
        const id=`Accordion-S3C906-${Date.now()}`;
        const title = accordionBlockData.title;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnAccordion).scrollIntoView();
        await (await QALayoutPage.btnAccordion).click();
        await (await AccordionBlockPage.configBlock).waitForDisplayed();

        await AccordionBlockPage.createAccordion(accordionBlockData.mainTitle, accordionBlockData.title, accordionBlockData.content);

        await expect(AccordionBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await AccordionBlockPage.accordionElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(AccordionBlockPage.accordionElement(id)).toBeDisplayedInViewport();

    });

    it('[S3C907] Verify that contents of the Accordion Component can be toggled (hide and show)', async () => {
        const id=`Accordion-S3C907-${Date.now()}`;
        const title = accordionBlockData.title;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnAccordion).scrollIntoView();
        await (await QALayoutPage.btnAccordion).click();
        await (await AccordionBlockPage.configBlock).waitForDisplayed();

        await AccordionBlockPage.createAccordion(accordionBlockData.mainTitle, accordionBlockData.title, accordionBlockData.content);

        await expect(AccordionBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();

        //Verify that the accordion content can be shown
        await (await AccordionBlockPage.accordionBtn).click();
        await expect($(`#${id} .mf-rich-text`)).toBeDisplayedInViewport(); 

        //Verify that the accordion content can be hidden
        await (await AccordionBlockPage.accordionBtn).click();
        await expect($(`#${id} .mf-rich-text`)).not.toBeDisplayedInViewport(); 

        //Re-open accordion for screenshot
        await (await AccordionBlockPage.accordionBtn).click();
        await browser.pause(1500);

    });

    it('[S3C1350] Verify that Analytics for the Accordion Component is configured', async () => {
        const id=`Accordion-S3C1350-${Date.now()}`;
        const title = accordionBlockData.title;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnAccordion).scrollIntoView();
        await (await QALayoutPage.btnAccordion).click();
        await (await AccordionBlockPage.configBlock).waitForDisplayed();

        await AccordionBlockPage.createAccordion(accordionBlockData.mainTitle, accordionBlockData.title, accordionBlockData.content);

        await expect(AccordionBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await AccordionBlockPage.accordionElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(AccordionBlockPage.accordionElement(id)).toBeDisplayedInViewport();

        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g127fd856972_0_321
         * */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'accordion',
            clickText: accordionBlockData.title,
            pageSlot: '1'
        }

        // Get the current url of the page
        //const currentUrl = await browser.getUrl();

        // Interact with the button to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await AccordionBlockPage.accordionBtn).click();

        // Switch back to the tab where the analytics is being generated
        //await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalyticsData.clickText.trim(),
            componentType: actualAnalyticsData.componentType,
            event: actualAnalyticsData.event,
            pageSlot: actualAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/accordion.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    });

  });
