import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CarouselBlockPage from '../../pageobjects/CMS/Components/carousel.page';
import { carouselBlockData } from '../../data/carousel.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";



describe('Carousel Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/Carousel/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
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

     
    it('[S3C824] Verify that a site Content Administrator can create a Carousel Component', async () => {
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CarouselBlockPage.createCarousel(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        
        await expect($(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect(CarouselBlockPage.carouselImage).toBeDisplayed();   
    });

    it('[S3C825] Verify that a site Content Administrator can create a Carousel Component with pagination disabled', async () => {
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CarouselBlockPage.createCarouselNoPagination(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        
        await expect($(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect($('div[x-ref="swiperButtonPrev"]')).toHaveElementClassContaining('mf-button--disabled');  
    });

    it('[S3C826] Verify that a site Content Administrator can create a Carousel Component with controls disabled', async () => {
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CarouselBlockPage.createCarouselNoControls(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        
        await expect($(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect(CarouselBlockPage.controlElement).not.toBeExisting();  
    });

    it.skip('[S3C827] Verify that a site Content Administrator can create a Carousel Component with multiple slides', async () => {
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        const imageFilePath1 = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        const imageFilePath2 = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        
        await CarouselBlockPage.createCarouselMultiSlide(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText, imageFilePath1, imageFilePath2);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        
        await expect($(`div[data-analytics-item-title="${headline}"]`)).toBeExisting; 
        await expect(CarouselBlockPage.controlElement).toExist(); 

        await expect ($('div[aria-label="3 / 3"]')).toBeExisting;
        
    });

    it('[S3C829] If controls are enabled, verify that a user can navigate the carousel using the chevron arrows', async () => {
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        const imageFilePath1 = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        
        await CarouselBlockPage.createCarouselDoubleSlide(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText, imageFilePath1);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        
        await expect($(`div[data-analytics-item-title="${headline}"]`)).toBeExisting; 
        await expect(CarouselBlockPage.controlElement).toExist(); 
        
        //verify that a user can navigate the carousel using the chevron arrows
        await (await $('.mf-card-content')).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await CarouselBlockPage.controlElement[1]).click();
        await expect(await $('a[data-analytics-click-text="Carousel Button 1"]')).toBeDisplayedInViewport();
        
    });

    it('[S3C828] If pagination is enabled, verify that a user can navigate the carousel using the pagination icons', async () => {
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        const imageFilePath1 = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        const imageFilePath2 = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        
        await CarouselBlockPage.createCarouselDoubleSlide(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText, imageFilePath1);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();

        await expect($(`div[data-analytics-item-title="${headline}"]`)).toBeExisting; 
        await expect(CarouselBlockPage.controlElement).toExist(); 
      
        //verify that a user can navigate the carousel using the pagination icons
        (await CarouselBlockPage.swiperElement).click();
        await expect(CarouselBlockPage.swiperElement).toHaveAttribute('aria-current', 'true');        
    });


    it('[S3C830] Verify that the available paragraph types in the Carousel form are correct.', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const areAllElementsDisplayed = await CarouselBlockPage.areAllElementsDisplayed();

        await CarouselBlockPage.openParaTypes();
        
        await expect(areAllElementsDisplayed).toBe(true);            
    });

    it('[S3C1125] Verify that Analytics for the Carousel Component is configured', async () => {
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        
        await CarouselBlockPage.createCarouselWithExternalButtonLink(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();

        await expect($(`div[data-analytics-item-title="${headline}"]`)).toBeExisting; 
        await expect(CarouselBlockPage.controlElement).toExist(); 

        const expectedAnalyticsData = {
            clickText: 'Carousel Button',
            componentType:'carousel > card feature',
            event: 'e_componentClick',
            itemTitle: carouselBlockData.headline,
            linkType: 'button',
            pageSlot: '1'
        };

        const currentUrl = await browser.getUrl();

        // Click Carousel button to trigger events
        await $('a[data-analytics-click-text="Carousel Button"]').click()

        await browser.switchWindow(currentUrl)
        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);

        const actualAnalayticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalayticsData.clickText,
            componentType: actualAnalayticsData.componentType,
            event: actualAnalayticsData.event,
            // Remove html tags, whitespace and newlines from the Headline
            itemTitle: actualAnalayticsData.itemTitle.replace(/(<([^>]+)>)/ig, '').trim(),
            linkType: actualAnalayticsData.linkType,
            pageSlot: actualAnalayticsData.pageSlot,
        };

        fs.writeFile('analyticsTestEvidence/carousel.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/Carousel/Verify that Analytics for the Carousel Component is configured.png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);
    })


  });
