import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import MapBlockPage from '../../pageobjects/CMS/Components/map.page';
import { mapBlockData } from '../../data/map.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';

describe('Map Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/Map/${testName}.png`;
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

     
    it('[S3C872] Verify that a site Content Administrator can create a Map Component', async () => {
        const id=`Map-S3C872-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnMap).scrollIntoView();
        await (await QALayoutPage.btnMap).click();
        await (await MapBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        const imageFilePath2 = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await MapBlockPage.createMap(mapBlockData.title, mapBlockData.highlightTitle, mapBlockData.latitude, mapBlockData.longitude, imageFilePath, mapBlockData.altText, imageFilePath2, mapBlockData.iconAltText);

        await expect(MapBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();

        await (await MapBlockPage.mapElement(id)).scrollIntoView();
        await expect(MapBlockPage.mapElement(id)).toBeDisplayed(); 

        //dismiss google alert for clean screenshot
        (await $('.dismissButton')).click(); 
    });


    it('[S3C873] Verify that all design fields are present with the correct available options.', async () => {
        const id=`Map-S3C873-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnMap).scrollIntoView();
        (await QALayoutPage.btnMap).click();
        (await MapBlockPage.configBlock).waitForDisplayed();

        await MapBlockPage.navToStyling();

        const hideLocationCheckbox = await MapBlockPage.checkboxHideLocationCards;
        await hideLocationCheckbox.scrollIntoView();
        await expect(hideLocationCheckbox).toBeDisplayed();
        await expect(await hideLocationCheckbox.isSelected()).toBe(false);
    });

    it('[S3C1349] Verify that Analytics for the Map: Locations: Overlay Component is configured', async () => {
        const id=`Map-S3C1349-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnMap).scrollIntoView();
        await (await QALayoutPage.btnMap).click();
        await (await MapBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        const imageFilePath2 = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await MapBlockPage.createMapWithLocation(mapBlockData.title, mapBlockData.location, mapBlockData.highlightTitle, mapBlockData.latitude, mapBlockData.longitude, imageFilePath, mapBlockData.altText, imageFilePath2, mapBlockData.iconAltText);
        await expect(MapBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();

        await (await MapBlockPage.mapElement(id)).scrollIntoView();
        await expect(MapBlockPage.mapElement(id)).toBeDisplayed(); 

        //(await $('.dismissButton')).click();
        await (await MapBlockPage.btnFirstLocation).click();
        await browser.pause(2000);
        await (await MapBlockPage.btnOverlayMapIcon).click();
        await browser.pause(1000)
        await (await MapBlockPage.overlayAddressText).click();
        await browser.pause(1000)
        const currentUrl = await browser.getUrl();

        const expectedAnalyticsData = 
            [{
                clickText: 'text',
                componentType: 'map',
                event: 'e_componentClick',
                itemTitle: 'Montefiore Einstein Hospital, Moses Campus',
                linkType: 'button',
                pageSlot: '1'
            },
            {
                clickText: 'map-trifold',
                componentType: 'map > card location',
                event: 'e_componentClick',
                itemTitle: 'Montefiore Einstein Hospital, Moses Campus',
                linkType: 'button',
                pageSlot: '1'
            },
            {
                clickText: '111 East 210th Street Bronx, NY 10467-2401',
                componentType: 'map > card location',
                event: 'e_componentClick',
                itemTitle: 'Montefiore Einstein Hospital, Moses Campus',
                linkType: 'link',
                pageSlot: '1'
            },
            {
                clickText: 'phone',
                componentType: 'map > card location',
                event: 'e_componentClick',
                itemTitle: 'Montefiore Einstein Hospital, Moses Campus',
                linkType: 'button',
                pageSlot: '1',
                phoneNumber: '18768678768'
            },
            {
                clickText: 'phone',
                componentType: 'map > card location',
                event: 'e_componentClick',
                itemTitle: 'Montefiore Einstein Hospital, Moses Campus',
                linkType: 'link',
                pageSlot: '1',
                phoneNumber: '18768678768'
            }]

        // await browser.execute(() => {
        //     const phoneIconsElements = document.querySelectorAll('a[data-analytics-link-type="button"]')
        //     const phoneTextElements = document.querySelectorAll('a[data-analytics-click-text="phone"]')

        //     const phoneIcon = phoneIconsElements[3]
        //     const phoneText = phoneTextElements[5]

        //     if (phoneIcon.getAttribute('target') !== '_blank') {
        //         phoneIcon.setAttribute('target', '_blank');
        //     }
        //     if (phoneText.getAttribute('target') !== '_blank') {
        //         phoneText.setAttribute('target', '_blank');
        //     }
        // })
        // const icons = $$('a[data-analytics-link-type="button"]')
        // const text = $$('a[data-analytics-click-text="phone"]')

        // icons[3].click();
        // await browser.switchWindow(currentUrl);
        // text[5].click();
        // await browser.switchWindow(currentUrl);
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick");
        let parsedAnalyticsData = []
        for(let x in actualAnalyticsData){
            if ('phoneNumber' in actualAnalyticsData[x]) {
                parsedAnalyticsData.push({
                    clickText: actualAnalyticsData[x].clickText,
                    componentType: actualAnalyticsData[x].componentType,
                    event: actualAnalyticsData[x].event,
                    // Remove HTML tags, whitespace, and newlines from the Headline
                    itemTitle: actualAnalyticsData[x].itemTitle,
                    linkType: actualAnalyticsData[x].linkType,
                    phoneNumber: actualAnalyticsData[x].phoneNumber,
                    pageSlot: actualAnalyticsData[x].pageSlot,  
                });
            }else {
                parsedAnalyticsData.push({
                    clickText: actualAnalyticsData[x].clickText,
                    componentType: actualAnalyticsData[x].componentType,
                    event: actualAnalyticsData[x].event,
                    // Remove html tags, whitespace and newlines from the Headline
                    itemTitle: actualAnalyticsData[x].itemTitle,
                    linkType: actualAnalyticsData[x].linkType,
                    pageSlot: actualAnalyticsData[x].pageSlot
                })
            }
        }
        const screenshotPath = `./screenshots/Map/Verify that Analytics for the Map: Locations: Overlay Component is configured.png`;
        await browser.saveScreenshot(screenshotPath);
        for(let x in parsedAnalyticsData){
            await expect(parsedAnalyticsData[x]).toEqual(expectedAnalyticsData[x]);
        }
    });

    it('[S3C1348] Verify that Analytics for the Map: Locations: Rail Component is configured', async () => {
        const id=`Map-S3C1348-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnMap).scrollIntoView();
        await (await QALayoutPage.btnMap).click();
        await (await MapBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        const imageFilePath2 = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await MapBlockPage.createMapWithLocation(mapBlockData.title, mapBlockData.location, mapBlockData.highlightTitle, mapBlockData.latitude, mapBlockData.longitude, imageFilePath, mapBlockData.altText, imageFilePath2, mapBlockData.iconAltText);
        await expect(MapBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();

        await (await MapBlockPage.mapElement(id)).scrollIntoView();
        await expect(MapBlockPage.mapElement(id)).toBeDisplayed(); 

        (await $('.dismissButton')).click();
        await (await MapBlockPage.btnFirstLocation).click();
        await browser.pause(2000);
        // await (await MapBlockPage.btnMapIcon).click();
        // await browser.pause(1000)
        const currentUrl = await browser.getUrl();
        await browser.execute(() => {
            const phoneIconsElements = document.querySelectorAll('a[data-analytics-link-type="button"]')

            const phoneIcon = phoneIconsElements[0]

            if (phoneIcon.getAttribute('target') !== '_blank') {
                phoneIcon.setAttribute('target', '_blank');
            }
        })
        const icons = $$('a[data-analytics-link-type="button"]')
        icons[0].click();
        await browser.switchWindow(currentUrl);
        
        const expectedAnalyticsData = [
            {
                clickText: 'text',
                componentType: 'map',
                event: 'e_componentClick',
                itemTitle: 'Montefiore Einstein Hospital, Moses Campus',
                linkType: 'button',
                pageSlot: '1'
            },
            {
                clickText: 'map-trifold',
                componentType: 'map > card location',
                event: 'e_componentClick',
                itemTitle: 'Montefiore Einstein Hospital, Moses Campus',
                linkType: 'button',
                pageSlot: '1'
            },
            {
                clickText: '111 East 210th Street Bronx, NY 10467-2401',
                componentType: 'map > card location',
                event: 'e_componentClick',
                itemTitle: 'Montefiore Einstein Hospital, Moses Campus',
                linkType: 'link',
                pageSlot: '1'
            },
            // {
            //     clickText: 'phone',
            //     componentType: 'map > card location',
            //     event: 'e_componentClick',
            //     itemTitle: 'Montefiore Einstein Hospital, Moses Campus',
            //     linkType: 'button',
            //     pageSlot: '1',
            //     phoneNumber: '18768678768'
            // },
            // {
            //     clickText: 'phone',
            //     componentType: 'map > card location',
            //     event: 'e_componentClick',
            //     itemTitle: 'Montefiore Einstein Hospital, Moses Campus',
            //     linkType: 'link',
            //     pageSlot: '1',
            //     phoneNumber: '18768678768'
            // }
        ]

        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick");
        let parsedAnalyticsData = []
        for(let x in actualAnalyticsData){
            if ('phoneNumber' in actualAnalyticsData[x]) {
                parsedAnalyticsData.push({
                    clickText: actualAnalyticsData[x].clickText,
                    componentType: actualAnalyticsData[x].componentType,
                    event: actualAnalyticsData[x].event,
                    itemTitle: actualAnalyticsData[x].itemTitle,
                    linkType: actualAnalyticsData[x].linkType,
                    phoneNumber: actualAnalyticsData[x].phoneNumber,
                    pageSlot: actualAnalyticsData[x].pageSlot,  
                });
            }else {
                parsedAnalyticsData.push({
                    clickText: actualAnalyticsData[x].clickText,
                    componentType: actualAnalyticsData[x].componentType,
                    event: actualAnalyticsData[x].event,
                    itemTitle: actualAnalyticsData[x].itemTitle,
                    linkType: actualAnalyticsData[x].linkType,
                    pageSlot: actualAnalyticsData[x].pageSlot
                })
            }
        }
        const screenshotPath = `./screenshots/Map/Verify that Analytics for the Map: Locations: Rail Component is configured.png`;
        await browser.saveScreenshot(screenshotPath);
        //await expect(parsedAnalyticsData[0]).toEqual(expectedAnalyticsData[0])
        for(let x in parsedAnalyticsData){
            await expect(parsedAnalyticsData[x]).toEqual(expectedAnalyticsData[x]);
        }
    });
});
