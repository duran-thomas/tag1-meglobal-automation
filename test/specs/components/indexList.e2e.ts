import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";
import { indexListBlockData } from '../../data/indexList.data';
import indexListPage from '../../pageobjects/CMS/Components/indexList.page';


describe('Index List Component Tests', () => {

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
        // await AdminContentPage.getTestPage(global.suiteDescription);  
        // await expect(QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/IndexList/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        const testPage = await $(`=${indexListBlockData.pageTitle}`);
        await testPage.scrollIntoView({ behavior: 'auto', block: 'center' });
        await testPage.click();
        // await AdminContentPage.getTestPage(global.suiteDescription);
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        // await AdminContentPage.getTestPage(global.suiteDescription);  
    });

    //delete page
    after(async function () {
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);
        //await browser.url(environment.baseUrl+'user/logout');
        await browser.setCookies(environment.admin);
        await AdminContentPage.open();
        await AdminContentPage.deleteTestPage(indexListBlockData.pageTitle);
        await expect($('.mf-alert__container--highlight')).toBeDisplayed();
    });
    /**
    * TODO: This needs to be updated to create its own Index List Component eventually and execute the test. 
    * At the moment it relies on the index list component that exists at the cancer/types route, which doesn't seem
    * to exist on ode7. 
    */

    it('[S3C1342] Verify that Analytics for the Index List Component is configured', async () => {
        const id=`IndexList-S3C1342-${Date.now()}`;
        const environment = getEnvironmentConfig(process.env.ENV);
        const baseURL = environment.baseUrl;
        await browser.url(await `${baseURL}/group/41/nodes`);
        await browser.pause(1000);

        await (await indexListPage.btnAddNewContent).click();
        await (await indexListPage.linkGroupNodeLayoutPage).click();
        await (await indexListPage.inputPageTitle).setValue(indexListBlockData.pageTitle);
        await (await indexListPage.btnSaveLayout).scrollIntoView();
        await (await indexListPage.btnSaveLayout).click();
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnIndexListClinicalCategories).scrollIntoView();
        (await QALayoutPage.btnIndexListClinicalCategories).click();
        (await indexListPage.configBlock).waitForDisplayed();
        await indexListPage.createIndexListClinicalCategories(indexListBlockData.title)

        await QALayoutPage.goToPageView();

        const indexListComponent = await $(`#${id} .mf-index-list__list`);
        const indexListComponentItem = await $('span[data-analytics-click-text="Acute Lymphoblastic Leukemia (ALL)"]');
        const expectedClickText = "Acute Lymphoblastic Leukemia (ALL)";
        await (indexListComponent).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(indexListComponent).toBeDisplayedInViewport();
        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g127fd856972_0_321
         * */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'index-list',
            clickText: expectedClickText,
            pageSlot: '1'
        }

        let variable;
        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.execute(function(argument:any, element:any){
            /**
             * Add the event listener to store the window.dataLayer object into the argument variable before the window unloads
             */
            window.addEventListener('beforeunload',function(){
                argument = window.dataLayer;
            })
            // Interact with the Image link to generate the analytics. (Clicking the image link brings the user to a new page)
            element.click();
            return argument;
        },variable, indexListComponentItem)

        // Get the data layer for the window and get the data for the click event for the component
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];
        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalyticsData.clickText.trim(),
            componentType: actualAnalyticsData.componentType,
            event: actualAnalyticsData.event,
            pageSlot: actualAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/indexList.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);
  });

  it('[S3C1128] Verify that a Content Administrator can create a Index List - Clinical Categories Component', async () => {
    const id=`IndexList-S3C1128-${Date.now()}`;
    const environment = getEnvironmentConfig(process.env.ENV);
    const baseURL = environment.baseUrl;
    await browser.url(await `${baseURL}/group/41/nodes`);
    await browser.pause(1000);
    await (await indexListPage.btnAddNewContent).click();
    await (await indexListPage.linkGroupNodeLayoutPage).click();
    await (await indexListPage.inputPageTitle).setValue(indexListBlockData.pageTitle);
    await (await indexListPage.btnSaveLayout).scrollIntoView();
    await (await indexListPage.btnSaveLayout).click();
    await (await QALayoutPage.tabLayout).click();
    await QALayoutPage.createNewSection(id);
    await QALayoutPage.navigateToBlockList();
    (await QALayoutPage.btnIndexListClinicalCategories).scrollIntoView();
    (await QALayoutPage.btnIndexListClinicalCategories).click();
    (await indexListPage.configBlock).waitForDisplayed();
    await indexListPage.createIndexListClinicalCategories(indexListBlockData.title)

    await QALayoutPage.goToPageView();

    const indexListComponent = await $(`#${id} .mf-index-list__list`);
    await (indexListComponent).scrollIntoView({ behavior: 'auto', block: 'center' });
    
    await expect(indexListComponent).toBeDisplayedInViewport();
})
})
