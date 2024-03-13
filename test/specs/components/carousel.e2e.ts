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

     
    it('[S3C824] Verify that a site Content Administrator can create a Carousel Component', async () => {
        const id=`Carousel-S3C824-${Date.now()}`;
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CarouselBlockPage.createCarousel(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        
        await expect($(`${id} div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect(CarouselBlockPage.carouselImage(id)).toBeDisplayed();   
    });

    it('[S3C825] Verify that a site Content Administrator can create a Carousel Component with pagination disabled', async () => {
        const id=`Carousel-S3C825-${Date.now()}`;
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        const imageFilePath1 = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await CarouselBlockPage.createCarouselNoPagination(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText, imageFilePath1);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        await expect($(`#${id} div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect($(`#${id} div[x-ref="swiperButtonPrev"]`)).toHaveElementClassContaining('mf-button--disabled');  
    });

    it('[S3C826] Verify that a site Content Administrator can create a Carousel Component with controls disabled', async () => {
        const id=`Carousel-S3C826-${Date.now()}`;
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CarouselBlockPage.createCarouselNoControls(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        
        await expect($(`#${id} div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect(CarouselBlockPage.controlElement).not.toBeExisting();  
    });

    it.skip('[S3C827] Verify that a site Content Administrator can create a Carousel Component with multiple slides', async () => {
        const id=`Carousel-S3C827-${Date.now()}`;
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

        await expect ($(`div[aria-label="3 / 3"]`)).toBeExisting;
        
    });

    it('[S3C829] If controls are enabled, verify that a user can navigate the carousel using the chevron arrows', async () => {
        const id=`Carousel-S3C829-${Date.now()}`;
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
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
        
        await expect($(`#${id} div[data-analytics-item-title="${headline}"]`)).toBeExisting; 
        await expect(CarouselBlockPage.controlElement).toExist(); 
        
        //verify that a user can navigate the carousel using the chevron arrows
        await (await $(`#${id} .mf-card-content`)).scrollIntoView({ behavior: 'auto', block: 'start' });
        await browser.pause(3000);
        await (await CarouselBlockPage.controlElement[1]).click();
        await expect(await $(`#${id} a[data-analytics-click-text="Carousel Button 1"]`)).toBeDisplayedInViewport();
        
    });

    //Recheck this test
    it('[S3C828] If pagination is enabled, verify that a user can navigate the carousel using the pagination icons', async () => {
        const id=`Carousel-S3C828-${Date.now()}`;
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
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

        await expect($(`#${id} div[data-analytics-item-title="${headline}"]`)).toBeExisting; 
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

    it('[S3C1125] Verify that Analytics for the Card Feature And Image Carousel Component is configured', async () => {
        const id=`Carousel-S3C1125-${Date.now()}`;
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCarousel).scrollIntoView();
        await (await QALayoutPage.btnCarousel).click();
        await (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        
        await CarouselBlockPage.createCarouselWithFeatureCardAndLocation(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText, carouselBlockData.link, carouselBlockData.url);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView({ behavior: 'auto', block: 'start' });

        await expect($(`#${id} div[data-analytics-item-title="${headline}"]`)).toBeExisting; 
        await expect(CarouselBlockPage.controlElement).toExist(); 

        const expectedCardAnalyticsData = {
            clickText: 'Carousel Button',
            componentType:'carousel > card feature',
            event: 'e_componentClick',
            itemTitle: carouselBlockData.headline,
            linkType: 'button',
            pageSlot: '1'
        };
        const expectedLocationTextAnalyticsData = {
            clickText: '3415 Bainbridge Avenue Bronx, NY 10467-2401',
            componentType:'carousel > card location',
            event: 'e_componentClick',
            itemTitle: "Children's Hospital at Montefiore",
            linkType: 'link',
            pageSlot: '1'
        };
        const expectedLocationIconAnalyticsData = {
            clickText: 'map-trifold',
            componentType:'carousel > card location',
            event: 'e_componentClick',
            itemTitle: "Children's Hospital at Montefiore",
            linkType: 'button',
            pageSlot: '1'
        };

        const currentUrl = await browser.getUrl();

        // Click Carousel button to switch to second card
        await $(`#${id} a[data-analytics-click-text="Carousel Button"]`).click()

        await browser.switchWindow(currentUrl);

        await (await CarouselBlockPage.controlElement[1]).click();
        await browser.pause(1000);
        await ((await CarouselBlockPage.carouselLocationAddressLink(id)).click());
        await browser.pause(2000);
        await ((await CarouselBlockPage.carouselLocationAddressIcon(id)).click());
        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick");
        let parsedAnalyticsData = []

        for(let x in actualAnalyticsData){
            parsedAnalyticsData.push({
                clickText: actualAnalyticsData[x].clickText,
                componentType: actualAnalyticsData[x].componentType,
                event: actualAnalyticsData[x].event,
                // Remove html tags, whitespace and newlines from the Headline
                itemTitle: actualAnalyticsData[x].itemTitle.replace(/(<([^>]+)>)/ig, '').trim(),
                linkType: actualAnalyticsData[x].linkType,
                pageSlot: actualAnalyticsData[x].pageSlot
            })
        }

        fs.writeFile('analyticsTestEvidence/carouselCardFeatureAndImage.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/Carousel/Verify that Analytics for the Card Feature And Image Carousel Component is configured.png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedAnalyticsData[0]).toEqual(expectedCardAnalyticsData);
        await expect(parsedAnalyticsData[1]).toEqual(expectedLocationTextAnalyticsData);
        await expect(parsedAnalyticsData[2]).toEqual(expectedLocationIconAnalyticsData);
    })

    it('Verify that Analytics for the Billboard and MyChart Carousel Component is configured', async () => {
        const id=`Carousel-Billboard-and-MyChart-${Date.now()}`;
        const headline = carouselBlockData.headline
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        
        await CarouselBlockPage.createCarouselWithBillboardAndMyChart(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.intro, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText, carouselBlockData.link);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();

        await expect($(`#${id} div[data-analytics-item-title="${headline}"]`)).toBeExisting; 
        await expect(CarouselBlockPage.controlElement).toExist(); 

        const expectedBillboardAnalyticsData = {
            clickText: carouselBlockData.btnText,
            componentType: 'carousel > billboard',
            event: 'e_componentClick',
            itemTitle: carouselBlockData.headline,
            linkType: 'button',
            pageSlot: '1',
        }

        const expectedMyChartBtnAnalyticsData = {
            clickText: 'MyChart Carousel Button',
            componentType: 'carousel > card mychart',
            event: 'e_componentClick',
            itemTitle: "MyChart Carousel Headline",
            linkType: 'button',
            pageSlot: '1',
        }

        const expectedMyChartLinkAnalyticsData = {
            clickText: 'MyChart Carousel Link Title',
            componentType: 'carousel > card mychart',
            event: 'e_componentClick',
            itemTitle: "MyChart Carousel Headline",
            linkType: 'link',
            pageSlot: '1',
        }

        const currentUrl = await browser.getUrl();
        // Click Carousel button to switch to second card
        await $(`#${id} a[data-analytics-click-text="Carousel Button"]`).click()
        await browser.switchWindow(currentUrl);

        await (await CarouselBlockPage.controlElement[1]).click();
        await browser.pause(1000);

        await $(`#${id} a[data-analytics-click-text="MyChart Carousel Button"]`).click()
        await browser.switchWindow(currentUrl);
        await $(`#${id} a[data-analytics-click-text="MyChart Carousel Link Title"]`).click()
        await browser.switchWindow(currentUrl);

        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick");
        let parsedAnalyticsData = []

        for(let x in actualAnalyticsData){
            parsedAnalyticsData.push({
                clickText: actualAnalyticsData[x].clickText,
                componentType: actualAnalyticsData[x].componentType,
                event: actualAnalyticsData[x].event,
                // Remove html tags, whitespace and newlines from the Headline
                itemTitle: actualAnalyticsData[x].itemTitle.replace(/(<([^>]+)>)/ig, '').trim(),
                linkType: actualAnalyticsData[x].linkType,
                pageSlot: actualAnalyticsData[x].pageSlot
            })
        }

        fs.writeFile('analyticsTestEvidence/carouselBillboardAndMyChart.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/Carousel/Verify that Analytics for the Billboard and MyChart Carousel Component is configured.png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedAnalyticsData[0]).toEqual(expectedBillboardAnalyticsData);
        await expect(parsedAnalyticsData[1]).toEqual(expectedMyChartBtnAnalyticsData);
        await expect(parsedAnalyticsData[2]).toEqual(expectedMyChartLinkAnalyticsData);

    })

    it('Verify that Analytics for the Quote Carousel Component is configured', async () => {
        const id=`Carousel-Quote-${Date.now()}`;
        const headline = carouselBlockData.headline
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCarousel).scrollIntoView();
        (await QALayoutPage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const audioFilePath = await browser.uploadFile('scriptFiles/sampleAudio.mp3');

        await CarouselBlockPage.createCarouselQuote(carouselBlockData.title, carouselBlockData.quote, carouselBlockData.quoteAuthor, carouselBlockData.quoteAuthorTitle, audioFilePath);

        await QALayoutPage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();

        const expectedQuotePlayBtnAnalyticsData = {
            clickSlot: '1',
            event: 'e_mediaEngagement',
            mediaAction: 'play',
            mediaLength: '00:27',
            mediaTitle: audioFilePath.substring(audioFilePath.lastIndexOf('/') + 1),
            mediaType: 'audio',
            pageSlot: '1',
        }

        const expectedQuotePauseBtnAnalyticsData = {
            clickSlot: '1',
            event: 'e_mediaEngagement',
            mediaAction: 'pause',
            mediaLength: '00:27',
            mediaTitle: audioFilePath.substring(audioFilePath.lastIndexOf('/') + 1),
            mediaType: 'audio',
            pageSlot: '1',
        }

        await $(`#${id} blockquote  button`).click()
        await browser.pause(1000)
        await $(`#${id} blockquote  button`).click()

        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_mediaEngagement");

        let parsedAnalyticsData = []

        for(let x in actualAnalyticsData){
            parsedAnalyticsData.push({
                clickSlot: actualAnalyticsData[x].clickSlot,
                event: actualAnalyticsData[x].event,
                mediaAction: actualAnalyticsData[x].mediaAction,
                mediaLength: actualAnalyticsData[x].mediaLength,
                mediaTitle: actualAnalyticsData[x].mediaTitle.replace(/^(sampleAudio)_\d+(\.mp3).*$/, '$1$2'),
                mediaType: actualAnalyticsData[x].mediaType,
                pageSlot: actualAnalyticsData[x].pageSlot
            })
        }

        fs.writeFile('analyticsTestEvidence/carouselQuote.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/Carousel/Verify that Analytics for the Quote Carousel Component is configured.png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedAnalyticsData[0]).toEqual(expectedQuotePlayBtnAnalyticsData);
        await expect(parsedAnalyticsData[1]).toEqual(expectedQuotePauseBtnAnalyticsData);

    })
  });
