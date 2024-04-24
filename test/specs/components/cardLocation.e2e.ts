import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CardLocationBlockPage from '../../pageobjects/CMS/Components/cardLocation.page';
import { cardLocationBlockData, cardLocationComponentData } from '../../data/cardLocation.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";


describe('Card Location Component Tests', () => {

    before(async ()=>{
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);

        // Use the environment data
        const bypassURL = environment.bypassURL;
        const cookies = environment.admin;

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
    });

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/CardLocation/${testName}.png`;
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

    after(async function () {
        const tests = this.test.parent.tests;
        const allPassed = tests.every((test) => test.state === 'passed');

        if (allPassed) {
            try {
            //navigate to admin content page
            await AdminContentPage.open();
            // Cleanup or teardown operations after all test cases have run
            await (await CardLocationBlockPage.deleteAll());
            await expect(await CardLocationBlockPage.statusMsg).toBeDisplayed();
            await expect(await CardLocationBlockPage.statusMsg).toHaveTextContaining('Deleted');


        } catch (error) {
            // Handle any errors that occur during the after hook
            console.error('Error occurred in the after hook:', error);
            }
        }      
    });

    it('[S3C936] Verify that a site Content Administrator can create Location nodes for use in the Card-Location Component', async () => {
        //create location 1
        await AdminContentPage.open();
        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CardLocationBlockPage.createLocation1(cardLocationBlockData.location1.title, cardLocationBlockData.location1.address, cardLocationBlockData.location1.mapURL, cardLocationBlockData.location1.latitude, cardLocationBlockData.location1.longitute, cardLocationBlockData.location1.phoneNumber, cardLocationBlockData.location1.openHours, cardLocationBlockData.location1.servicesTitle, cardLocationBlockData.location1.services[0], cardLocationBlockData.location1.services[1], cardLocationBlockData.location1.services[2], cardLocationBlockData.location1.services[3], cardLocationBlockData.location1.services[4],
        cardLocationBlockData.location1.services[5], cardLocationBlockData.location1.services[6],
        cardLocationBlockData.location1.services[7], cardLocationBlockData.location1.descriptionTitle, cardLocationBlockData.location1.description, imageFilePath, cardLocationBlockData.altText, cardLocationBlockData.location1.id);

        await expect(CardLocationBlockPage.successMsg).toBeDisplayed();

        //create location 2
        await AdminContentPage.open();
        const imageFilePath2 = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await CardLocationBlockPage.createLocation2(cardLocationBlockData.location2.title, cardLocationBlockData.location2.address, cardLocationBlockData.location2.mapURL, cardLocationBlockData.location2.latitude, cardLocationBlockData.location2.longitute, cardLocationBlockData.location2.phoneNumber, cardLocationBlockData.location2.openHours, cardLocationBlockData.location2.servicesTitle, cardLocationBlockData.location2.services[0], cardLocationBlockData.location2.services[1], cardLocationBlockData.location2.services[2], cardLocationBlockData.location2.descriptionTitle, cardLocationBlockData.location2.description, imageFilePath2, cardLocationBlockData.altText);

        await expect(CardLocationBlockPage.successMsg).toBeDisplayed();

        //create location 3
        await AdminContentPage.open();
        const imageFilePath3 = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        await CardLocationBlockPage.createLocation3(cardLocationBlockData.location3.title, cardLocationBlockData.location3.address, cardLocationBlockData.location3.mapURL, cardLocationBlockData.location3.latitude, cardLocationBlockData.location3.longitute, cardLocationBlockData.location3.phoneNumber, cardLocationBlockData.location3.openHours, cardLocationBlockData.location3.servicesTitle, cardLocationBlockData.location3.services[0], cardLocationBlockData.location3.services[1], cardLocationBlockData.location3.services[2], cardLocationBlockData.location3.services[3], cardLocationBlockData.location3.services[4],
        cardLocationBlockData.location3.services[5], cardLocationBlockData.location3.descriptionTitle, cardLocationBlockData.location3.description, imageFilePath3, cardLocationBlockData.altText, cardLocationBlockData.location3.id);

        await expect(CardLocationBlockPage.successMsg).toBeDisplayed();

        //clone location 2
        await AdminContentPage.open();
        await CardLocationBlockPage.cloneLocation();
        await expect(CardLocationBlockPage.successMsg).toBeDisplayed();

        //rename clone
        await AdminContentPage.open();
        await CardLocationBlockPage.renameClone(cardLocationBlockData.location2.title, cardLocationBlockData.location1.id);
        await expect(CardLocationBlockPage.statusMsg).toBeDisplayed();

        //assert all locations are present
        await AdminContentPage.open();
        await ((await $(`=${cardLocationBlockData.location1.title}`)).scrollIntoView({ behavior: 'auto', block: 'center' }));
        await expect($(`=${cardLocationBlockData.location1.title}`)).toBeExisting();
        await expect($(`=${cardLocationBlockData.location2.title}`)).toBeExisting();
        await expect($(`=${cardLocationBlockData.location2.title} - VERT`)).toBeExisting();
        await expect($(`=${cardLocationBlockData.location3.title}`)).toBeExisting();

    });

    it('[S3C908] Verify that a site Content Administrator can create Card Location Components in a Card Location Block', async () => {
        const id=`CardLocation-S3C908-${Date.now()}`;
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription); 
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardLocation).scrollIntoView();
        await (await QALayoutPage.btnCardLocation).click();
        await (await CardLocationBlockPage.configBlock).waitForDisplayed();
        
        await CardLocationBlockPage.createLocationComponentBlock1(cardLocationComponentData.title+' 1', cardLocationComponentData.location1);
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardLocation).scrollIntoView();
        await (await QALayoutPage.btnCardLocation).click();
        await (await CardLocationBlockPage.configBlock).waitForDisplayed();

        await CardLocationBlockPage.createLocationComponentBlock2(cardLocationComponentData.title+' 2', cardLocationComponentData.location2);

        await expect(CardLocationBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardLocationBlockPage.cardLocationElements(id)[1]).scrollIntoView({ behavior: 'auto', block: 'center' });
        const elem = await CardLocationBlockPage.cardLocationElements(id).length;
        await expect(elem).toEqual(2);   
    });

    it('[S3C1353] Verify that Analytics for the Card Location Component is configured', async () => {


        const id=`CardLocation-S3C1353-${Date.now()}`;
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription); 
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardLocation).scrollIntoView();
        await (await QALayoutPage.btnCardLocation).click();
        await (await CardLocationBlockPage.configBlock).waitForDisplayed();
        
        await CardLocationBlockPage.createLocationComponentBlock1(cardLocationComponentData.title+' 1', cardLocationComponentData.location1);
        // const title = process.env.ENV === 'dev' ? "Children's Hospital at Montefiore" : "Montefiore Einstein Hospital, Moses Campus"
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType: 'card location',
            itemTitle: 'Montefiore Einstein Hospital, Moses Campus',
            linkType: 'button',
            clickText: 'map-trifold',
            pageSlot: '1'
        }

        // Interact with the button to generate the analytics. (Clicking the button navigates us to a new tab)
        await ($(`#${id} a[data-analytics-click-text="map-trifold"]`)).click();

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer', []);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalyticsData.clickText.trim(),
            componentType: actualAnalyticsData.componentType,
            event: actualAnalyticsData.event,
            // Remove html tags, whitespace and newlines from the Headline
            itemTitle: actualAnalyticsData.itemTitle.replace(/(<([^>]+)>)/ig, '').trim(),
            linkType: actualAnalyticsData.linkType,
            pageSlot: actualAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/cardLocation.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);

    });



    it('[S3C909] Verify that a site Content Administrator can create Card Location Components in the Carousel Block', async () => {
        const id=`CardLocation-S3C909-${Date.now()}`;
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription); 
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCarousel).scrollIntoView();
        await (await QALayoutPage.btnCarousel).click();
        await (await CardLocationBlockPage.configBlock).waitForDisplayed();

        await CardLocationBlockPage.createCarouselCardLocation();
        await QALayoutPage.goToPageView();
        await (await CardLocationBlockPage.carouselElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await CardLocationBlockPage.carouselElement(id)).toBeExisting();
        await expect($(`#${id} span[aria-label="Go to slide 1"]`)).toBeExisting();
        await expect($(`#${id} span[aria-label="Go to slide 2"]`)).toBeExisting();
        await expect($(`#${id} span[aria-label="Go to slide 3"]`)).toBeExisting();
    });

});