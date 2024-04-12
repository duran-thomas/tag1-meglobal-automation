import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import SidebarBlockPage from '../../pageobjects/CMS/Components/sidebar.page';
import { sidebarBlockData } from '../../data/sidebar.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";



describe('Sidebar Component Tests', () => {
    
    before(async ()=>{
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);

        // Use the environment data
        const bypassURL = environment.bypassURL;
        const cookies = environment.cookies;
        const admin = environment.admin;

        //Bypass login
        await browser.url(await bypassURL);
        await browser.maximizeWindow();

        // Set user cookies
        await browser.setCookies(await admin);

    });

    before(async function() {
        global.suiteDescription = this.currentTest?.parent?.title;
        // //navigate to admin content page
        // await AdminContentPage.open();
        // // Navigate to QA Landing page to execute tests
        // await AdminContentPage.getTestPage(global.suiteDescription); 
        // await expect(QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Sidebar/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });


    //delete page
    after(async function () {
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);
        //await browser.url(environment.baseUrl+'user/logout');
        await browser.setCookies(environment.admin);

        // await AdminContentPage.open();
        // await AdminContentPage.deleteTestPage(global.suiteDescription);
        // await expect($('.mf-alert__container--highlight')).toBeDisplayed();

        
        // //1025 delete created node
        // await SidebarBlockPage.deleteNode();
        // await expect (SidebarBlockPage.successMsg).toBeDisplayed();
        // await expect (SidebarBlockPage.successMsg).toHaveText('The Layout Page QA Test - Sidebar page has been deleted.');


        //968 return menu link to original text
        await SidebarBlockPage.editMenuLink(sidebarBlockData.originalText);
        await expect(SidebarBlockPage.messageContent).toHaveTextContaining('The menu link has been saved.');
        //968 delete node
        await SidebarBlockPage.openDummyTestGroupNodes();
        await (await SidebarBlockPage.linkDummyQANode).waitForClickable();
        await (await SidebarBlockPage.linkDummyQANode).click();
        await (await SidebarBlockPage.deleteBtn).waitForDisplayed();
        await (await SidebarBlockPage.deleteBtn).click();
        await (await SidebarBlockPage.btnSave).waitForDisplayed();
        await (await SidebarBlockPage.btnSave).click();
        await expect(SidebarBlockPage.successMsg).toBeDisplayed();

    });


    it('[S3C1025] Verify that a site content-admin can create a sidebar component', async () => {
        await SidebarBlockPage.setupSidebar(sidebarBlockData.title);
        await expect(SidebarBlockPage.successMsg).toBeDisplayed();

        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createSidebarSection();

        await browser.refresh();
        await (await QALayoutPage.linkAddBlock).waitForExist({timeout:5000});
        await (await QALayoutPage.leftAddBlock).scrollIntoView();
        await (await QALayoutPage.leftAddBlock).click();
        await (await QALayoutPage.btnSidebarNav).scrollIntoView({ behavior: 'auto', block: 'center' })
        await (await QALayoutPage.btnSidebarNav).click();
        await (await SidebarBlockPage.configBlock).waitForDisplayed();

        await SidebarBlockPage.createSidebar();

        await QALayoutPage.goToPageView();
        await expect(SidebarBlockPage.sidebarElement).toExist; 
        await (await SidebarBlockPage.sidebarElement).scrollIntoView({ behavior: 'auto', block: 'center' });
    });

    //Unable to get capture analytics regardless of method used
    // it('[S3C1326] Verify that Analytics is correctly configured for Sidebar Component', async () => {
    //     await browser.url('https://meda2022:meda2022@content.montefioreeinstein.org/internal/component-testing/sidebar-default');
    //     const link = await $$('a[href="/internal/component-testing/sidebar-default/components-testing-sub-page-sidebar-navigation"]')[1];
    //     const sidebar = await $('div[data-analytics-navigation-type="sidebar"]');
    //     await sidebar.scrollIntoView();
    //     /**
    //    * Create the expected analytics 
    //    * object based on the spec below: 
    //    */

    //     const expectedAnalyticsData = {
    //         event: 'e_componentClick',
    //         navigationType:'sidebar',
    //         linkType: 'link',
    //         clickText: 'Sidebar: Default > Components testing sub-page for the Sidebar navigation',
    //     }

    //     let variable='placeholder value';
    
    //     // Get the data layer for the window and get the data for the click event for the component
    //     const dataLayer = await browser.execute(function(argument:any, element:any){
    //         /**
    //          * Add the event listener to store the window.dataLayer object into the argument variable before the window unloads
    //          */
    //         window.addEventListener('beforeunload',function(){
    //             argument = window.dataLayer;
    //         })
    //         // Interact with the Image link to generate the analytics. (Clicking the image link brings the user to a new page)
    //         element.click();
    //         return Array.from(window.dataLayer);
    //     }, variable, (await $$(`a[href="/internal/component-testing/sidebar-default/components-testing-sub-page-sidebar-navigation"]`)[1]))
        
        
        
    //     const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];


    //     // Build the actual analytics data object
    //     const parsedActualAnalyticsData = {
    //         //Remove whitespace from the Headline
    //         clickText: actualAnalyticsData.clickText.trim(),
    //         navigationType: actualAnalyticsData.navigationType,
    //         event: actualAnalyticsData.event,
    //         linkType: actualAnalyticsData.linkType,
    //     }

    //     fs.writeFile('analyticsTestEvidence/sidebar.json', JSON.stringify(dataLayer), err => {
    //         if (err) {
    //             console.error(err);
    //         }
    //         // file written successfully
    //     });

    //     await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    // });

    it('[S3C1026] Verify sidebar section configurations', async () => {
        await (await QALayoutPage.tabLayout).click();
        await browser.refresh();

        await (await QALayoutPage.linkAddSection).scrollIntoView();
        await (await QALayoutPage.linkAddSection).click();
        await (await QALayoutPage.sidebarSection).click();
        await (await QALayoutPage.sectionModal).waitForDisplayed();
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);

        await expect(SidebarBlockPage.inputFirstColumnClasses).toHaveValue('col-span-full lg:col-span-6');
        await expect(SidebarBlockPage.inputSecondColumnClasses).toHaveValue('col-span-full lg:col-start-8 lg:col-span-17');

    });

    it('[S3C968] Verify that Group Content Menu links are editable', async () => {
        await SidebarBlockPage.editMenuLink(sidebarBlockData.menuLinkTextEdit);
        await expect(SidebarBlockPage.messageContent).toHaveTextContaining('The menu link has been saved.');

        await SidebarBlockPage.createEditedNodeLayoutPage(sidebarBlockData.nodeText);

        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createSidebarSection();

        await browser.refresh();
        await (await QALayoutPage.linkAddBlock).waitForExist({timeout:5000});
        await (await QALayoutPage.leftAddBlock).scrollIntoView();
        await (await QALayoutPage.leftAddBlock).click();
        await (await QALayoutPage.btnSidebarNav).scrollIntoView({ behavior: 'auto', block: 'center' })
        await (await QALayoutPage.btnSidebarNav).click();
        await (await SidebarBlockPage.configBlock).waitForDisplayed();

        await SidebarBlockPage.createSidebar();

        await QALayoutPage.goToPageView();
        await expect(SidebarBlockPage.sidebarElement).toExist; 
        await (await SidebarBlockPage.sidebarElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        await expect(SidebarBlockPage.editedElement).toExist; 
        // Revert menu back to its original state or the following test will fail
        await SidebarBlockPage.editMenuLink(sidebarBlockData.originalText);
    });

    /**Not automating '[S3C966] Verify that links can be added to and removed from a Group Content Menu', 
    as this is done as a precondition to the preceding tests. indirectly passing this case. LOE not worth it
    */

    it('[S3C1028] Verify that each menu list item should be an active link to their respective resources', async () => {
        await SidebarBlockPage.openDummyTestGroupMenus();
        await (await SidebarBlockPage.btnMenuEdit).waitForDisplayed();
        await (await SidebarBlockPage.btnMenuEdit).click(); 
        await (await SidebarBlockPage.linkTestMenu).waitForDisplayed();
        await (await SidebarBlockPage.linkTestMenu).click();
        await browser.pause(3000);
        //const currentUrl = await browser.getUrl();       
        await expect(await browser.getUrl()).toBe('https://www.google.com/');

    });

    it('[S3C1029] Verify the display of Sidebar navigation fields exclusively for the creation of landing pages within Group nodes', async () => {
        await SidebarBlockPage.openDummyTestGroupNodes();
        await (await SidebarBlockPage.btnAddNewContent).click();
        await (await SidebarBlockPage.linkGroupNodeLayoutPage).click();

        await expect(SidebarBlockPage.sidebarNavFields).toBeExisting();

    });

    it('[S3C1030] Verify that sidebar navigation fields are not shown on single-node landing pages', async () => {
        await AdminContentPage.open();
        await (await AdminContentPage.btnAddContent).click();
        await (await AdminContentPage.linkLandingPage).click();
        await expect(SidebarBlockPage.sidebarNavFields).not.toBeExisting();

    });

    //Unable to complete '[S3C1378] Verify that the current page link is highlighted' on ode7. Resources not available.


});
