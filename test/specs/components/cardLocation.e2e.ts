import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CardLocationBlockPage from '../../pageobjects/CMS/Components/cardLocation.page';
import {users} from '../../data/users.data';
import { cardLocationBlockData, cardLocationComponentData } from '../../data/cardLocation.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Card Location Component Tests', () => {
    before(async () => {
        // Bypass AlertPrompt
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
    });

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/CardLocation/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
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
        await CardLocationBlockPage.renameClone(cardLocationBlockData.location2.title);
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
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardLocation).scrollIntoView();
        await (await QALayoutPage.btnCardLocation).click();
        await (await CardLocationBlockPage.configBlock).waitForDisplayed();
        
        await CardLocationBlockPage.createLocationComponentBlock1(cardLocationComponentData.title+' 1', cardLocationComponentData.location1);

        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCardLocation).scrollIntoView();
        await (await QALayoutPage.btnCardLocation).click();
        await (await CardLocationBlockPage.configBlock).waitForDisplayed();

        await CardLocationBlockPage.createLocationComponentBlock2(cardLocationComponentData.title+' 2', cardLocationComponentData.location2);

        //await expect(CardLocationBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CardLocationBlockPage.cardLocationElements[1]).scrollIntoView({ behavior: 'auto', block: 'center' });
        const elem = await CardLocationBlockPage.cardLocationElements.length;
        await expect(elem).toEqual(2);   
    });

    it('[S3C909] Verify that a site Content Administrator can create Card Location Components in the Carousel Block', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCarousel).scrollIntoView();
        await (await QALayoutPage.btnCarousel).click();
        await (await CardLocationBlockPage.configBlock).waitForDisplayed();

        await CardLocationBlockPage.createCarouselCardLocation();

        await QALayoutPage.goToPageView();
        await (await CardLocationBlockPage.carouselElement).scrollIntoView({ behavior: 'auto', block: 'center' });


        await expect(await CardLocationBlockPage.carouselElement).toBeExisting();
        await expect($('span[aria-label="Go to slide 1"]')).toBeExisting();
        await expect($('span[aria-label="Go to slide 2"]')).toBeExisting();
        await expect($('span[aria-label="Go to slide 3"]')).toBeExisting();
        
    });

  });