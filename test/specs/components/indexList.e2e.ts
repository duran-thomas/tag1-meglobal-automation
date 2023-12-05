import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import AccordionBlockPage from '../../pageobjects/CMS/Components/accordion.page';
import { accordionBlockData } from '../../data/accordion.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";


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
    /**
    * TODO: This needs to be updated to create its own Index List Component eventually and execute the test. 
    * At the moment it relies on the index list component that exists at the cancer/types route, which doesn't seem
    * to exist on ode7. 
    */
    it('[] Verify that Analytics for the Index List Component is configured', async () => {
        const baseUrl = getEnvironmentConfig(process.env.ENV).baseUrl;
        browser.url(`${baseUrl}/cancer/types`)
        //TODO: Update this to read from a pageObject and a test data file when the above updates are being made.
        const indexListComponent = await $('.mf-index-list__list');
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
            pageSlot: '3'
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
            // file written successfully
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    });

  });
