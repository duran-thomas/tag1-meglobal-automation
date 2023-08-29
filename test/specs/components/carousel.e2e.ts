import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CarouselBlockPage from '../../pageobjects/CMS/Components/carousel.page';
import {users} from '../../data/users.data';
import { carouselBlockData } from '../../data/carousel.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Carousel Component Tests', () => {
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

    it('[S3C827] Verify that a site Content Administrator can create a Carousel Component with multiple slides', async () => {
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
        
        await expect($(`div[data-analytics-item-title="${headline}"]`)).toBeExisting; 
        await expect(CarouselBlockPage.controlElement).toExist(); 
        
        //verify that a user can navigate the carousel using the chevron arrows
        await (await $('.mf-card-content')).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await CarouselBlockPage.controlElement[1]).click();
        await expect(await $('a[data-analytics-click-text="Carousel Button 1"]')).toBeDisplayedInViewport();

        //verify that a user can navigate the carousel using the pagination icons
        (await CarouselBlockPage.swiperElement).click();
        await expect(CarouselBlockPage.swiperElement).toHaveAttribute('aria-current', 'true');

        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        await browser.pause(3000);
        
    });

    it.only('[S3C1125] Verify that Analytics works as expected for a Carousel Component ', async () => {
        const headline = carouselBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnCarousel).scrollIntoView();
        await (await QALayoutPage.btnCarousel).click();
        await (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        const imageFilePath1 = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        const imageFilePath2 = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        const audioRemoteFilePath = await browser.uploadFile('scriptFiles/sampleAudio.mp3');

        await CarouselBlockPage.createCarouselMultiSlideAllComponents(carouselBlockData.title, carouselBlockData.headline, 
            carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, 
            carouselBlockData.url,imageFilePath, carouselBlockData.altText, imageFilePath1, imageFilePath2, audioRemoteFilePath, 
            carouselBlockData.transcript)

        await browser.debug();

    });

    // it('[S3C830] Verify that the available paragraph types in the Carousel form are correct.', async () => {
    //  await (await QALayoutPage.tabLayout).click();
    //     await QALayoutPage.createNewSection();
    //     await QALayoutPage.navigateToBlockList();
    //     (await QALayoutPage.btnCarousel).scrollIntoView();
    //     (await QALayoutPage.btnCarousel).click();
    //     (await CarouselBlockPage.configBlock).waitForDisplayed();

    //     await CarouselBlockPage.navToStyling()
        
    //     await expect(CarouselBlockPage.dropdownLayout).toBeDisplayed();
    //     await expect(CarouselBlockPage.dropdownLayout).toHaveValue('_none');
    //     await expect(CarouselBlockPage.dropdownLayout).toHaveValue('center');
    //     await expect(CarouselBlockPage.dropdownLayout).toHaveValue('overlay');
    //     await expect(CarouselBlockPage.dropdownLayout).toHaveValue('full');

    //     const offsetCheckbox = await CarouselBlockPage.checkboxInitialOffset;
    //     await offsetCheckbox.scrollIntoView();
    //     await expect(offsetCheckbox).toBeDisplayed();
    //     await expect(offsetCheckbox.isSelected()).toBe(false);

    //     await expect(CarouselBlockPage.dropdownIncludePagination).toBeDisplayed();
    //     await expect(CarouselBlockPage.dropdownIncludePagination).toHaveValue('_none');
    //     await expect(CarouselBlockPage.dropdownIncludePagination).toHaveValue('always');
    //     await expect(CarouselBlockPage.dropdownIncludePagination).toHaveValue('never');
    //     await expect(CarouselBlockPage.dropdownIncludePagination).toHaveValue('mobile-only');
    //     await expect(CarouselBlockPage.dropdownIncludePagination).toHaveValue('desktop-only');

    //     await CarouselBlockPage.dropdownPaginationType.scrollIntoView();
    //     await expect(CarouselBlockPage.dropdownPaginationType).toBeDisplayed();
    //     await expect(CarouselBlockPage.dropdownPaginationType).toHaveValue('_none');
    //     await expect(CarouselBlockPage.dropdownPaginationType).toHaveValue('bullets');
    //     await expect(CarouselBlockPage.dropdownPaginationType).toHaveValue('stories');

    //     await expect(CarouselBlockPage.dropdownIncludeControls).toBeDisplayed();
    //     await expect(CarouselBlockPage.dropdownIncludeControls).toHaveValue('_none');
    //     await expect(CarouselBlockPage.dropdownIncludeControls).toHaveValue('always');
    //     await expect(CarouselBlockPage.dropdownIncludeControls).toHaveValue('never');
    //     await expect(CarouselBlockPage.dropdownIncludeControls).toHaveValue('desktop-only');

    //     await CarouselBlockPage.dropdownIncludeControls.scrollIntoView();
    //     await expect(CarouselBlockPage.dropdownIncludeControls).toBeDisplayed();
    //     await expect(CarouselBlockPage.dropdownIncludeControls).toHaveValue('_none');
    //     await expect(CarouselBlockPage.dropdownIncludeControls).toHaveValue('center');
    //     await expect(CarouselBlockPage.dropdownIncludeControls).toHaveValue('bottom');

    //     await CarouselBlockPage.dropdownControlsPosition.scrollIntoView();
    //     await expect(CarouselBlockPage.dropdownControlsPosition).toBeDisplayed();
    //     await expect(CarouselBlockPage.dropdownControlsPosition).toHaveValue('_none');
    //     await expect(CarouselBlockPage.dropdownControlsPosition).toHaveValue('center');
    //     await expect(CarouselBlockPage.dropdownControlsPosition).toHaveValue('bottom');

    //     await CarouselBlockPage.dropdownControlsIcon.scrollIntoView();
    //     await expect(CarouselBlockPage.dropdownControlsIcon).toBeDisplayed();
    //     await expect(CarouselBlockPage.dropdownControlsIcon).toHaveValue('_none');
    //     await expect(CarouselBlockPage.dropdownControlsIcon).toHaveValue('chevron');
    //     await expect(CarouselBlockPage.dropdownControlsIcon).toHaveValue('arrow');

    //     const animationCheckbox = await CarouselBlockPage.checkboxAnimationIntro;
    //     await expect(animationCheckbox).toBeDisplayed();
    //     await expect(animationCheckbox.isSelected()).toBe(false);

    //     await expect(CarouselBlockPage.inputCarouselConfig).toBeDisplayed();

    // });

  });
