import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import CarouselBlockPage from '../../pageobjects/CMS/Components/carousel.page';
import LandingPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import {users} from '../../data/users.data';
import { carouselBlockData } from '../../data/carousel.data';
import QALayoutPagePage from '../../pageobjects/CMS/Components/QALayoutPage.page';


describe('Carousel Component Tests', () => {
    before(async () => {
        // //Login
        await browser.url(`https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/`);
        await browser.maximizeWindow();

        // Set the cookie for the logged in user
        await browser.setCookies([
            {
              name: 'SSESSdf0d9aa5f85649894e921d4b01e00b05',
              value: 'LXmAuXucXgcyLudUgKqslFZimRDD6j64xFY-svh5ZnH%2Ck7DX',
              domain: 'meglobalode7.prod.acquia-sites.com',
              path: '/',
            },
            {
              name: 'hyro.token',
              value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMWJhNDhiNi1kMDQyLTQ2ZmItYThjZS04N2NhZmEzNWE5YTQiLCJpc3MiOiJhaXJidWQuaW8ifQ.7u9l8If-42_tesTWDpLJ0mu6SAMu6RPCptnZfTN-EW4',
              domain: 'meglobalode7.prod.acquia-sites.com',
              path: '/'
            }
        ]);

    });

    beforeEach(async function() {
        //navigate to admin content page
        await AdminContentPage.open();
        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getQALandingPage();  //TODO: This function may need some checking out. When its run with all tests at once. I don't think it behaves as expected.
        expect(await LandingPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { //TODO: This needs some checking out. The screenshots that it create seem to be taken a bit too early in the execution?
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Carousel/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
    it('Verify that a site Content Administrator can create a Carousel Component', async () => {
        const headline = carouselBlockData.headline;
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnCarousel).scrollIntoView();
        (await QALayoutPagePage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CarouselBlockPage.createCarousel(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPagePage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        
        expect(await $(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        expect(await CarouselBlockPage.carouselImage).toBeDisplayed();   
    });

    it('Verify that a site Content Administrator can create a Carousel Component with pagination disabled', async () => {
        const headline = carouselBlockData.headline;
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnCarousel).scrollIntoView();
        (await QALayoutPagePage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CarouselBlockPage.createCarouselNoPagination(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPagePage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        
        expect(await $(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        expect(await CarouselBlockPage.paginationElement).not.toExist();   
    });

    it('Verify that a site Content Administrator can create a Carousel Component with controls disabled', async () => {
        const headline = carouselBlockData.headline;
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnCarousel).scrollIntoView();
        (await QALayoutPagePage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await CarouselBlockPage.createCarouselNoControls(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPagePage.goToPageView();
        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        
        expect(await $(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        expect(await CarouselBlockPage.controlElement).not.toExist();   
    });

    it.only('Verify that a site Content Administrator can create a Carousel Component with multiple slides', async () => {
        const headline = carouselBlockData.headline;
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnCarousel).scrollIntoView();
        (await QALayoutPagePage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        const imageFilePath1 = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        const imageFilePath2 = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        
        await CarouselBlockPage.createCarouselMultiSlide(carouselBlockData.title, carouselBlockData.headline, carouselBlockData.eyebrow, carouselBlockData.list, carouselBlockData.content, carouselBlockData.btnText, carouselBlockData.url,imageFilePath, carouselBlockData.altText, imageFilePath1, imageFilePath2);

        expect(CarouselBlockPage.successMsg).toBeDisplayed();

        await QALayoutPagePage.goToPageView();
        
        expect(await $(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        expect(await CarouselBlockPage.controlElement).not.toExist(); 
        
        //verify that a user can navigate the carousel using the chevron arrows
        (await CarouselBlockPage.controlElement).click();
        expect(await $('=Carousel Headline 1')).toBeDisplayedInViewport();

        //verify that a user can navigate the carousel using the pagination icons
        (await CarouselBlockPage.swiperElement).click();
        expect(await CarouselBlockPage.swiperElement).toHaveAttribute('aria-current', 'true');

        await (await CarouselBlockPage.carouselElement).scrollIntoView();
        await browser.pause(3000);
        
    });


    it('Verify that the available paragraph types in the Carousel form are correct.', async () => {
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnCarousel).scrollIntoView();
        (await QALayoutPagePage.btnCarousel).click();
        (await CarouselBlockPage.configBlock).waitForDisplayed();

        await CarouselBlockPage.navToStyling()
        
        expect(await CarouselBlockPage.dropdownLayout).toBeDisplayed();
        expect(await CarouselBlockPage.dropdownLayout).toHaveValue('_none');
        expect(await CarouselBlockPage.dropdownLayout).toHaveValue('center');
        expect(await CarouselBlockPage.dropdownLayout).toHaveValue('overlay');
        expect(await CarouselBlockPage.dropdownLayout).toHaveValue('full');

        const offsetCheckbox = await CarouselBlockPage.checkboxInitialOffset;
        await offsetCheckbox.scrollIntoView();
        expect(await offsetCheckbox).toBeDisplayed();
        expect(await offsetCheckbox.isSelected()).toBe(false);

        expect(await CarouselBlockPage.dropdownIncludePagination).toBeDisplayed();
        expect(await CarouselBlockPage.dropdownIncludePagination).toHaveValue('_none');
        expect(await CarouselBlockPage.dropdownIncludePagination).toHaveValue('always');
        expect(await CarouselBlockPage.dropdownIncludePagination).toHaveValue('never');
        expect(await CarouselBlockPage.dropdownIncludePagination).toHaveValue('mobile-only');
        expect(await CarouselBlockPage.dropdownIncludePagination).toHaveValue('desktop-only');

        await CarouselBlockPage.dropdownPaginationType.scrollIntoView();
        expect(await CarouselBlockPage.dropdownPaginationType).toBeDisplayed();
        expect(await CarouselBlockPage.dropdownPaginationType).toHaveValue('_none');
        expect(await CarouselBlockPage.dropdownPaginationType).toHaveValue('bullets');
        expect(await CarouselBlockPage.dropdownPaginationType).toHaveValue('stories');

        expect(await CarouselBlockPage.dropdownIncludeControls).toBeDisplayed();
        expect(await CarouselBlockPage.dropdownIncludeControls).toHaveValue('_none');
        expect(await CarouselBlockPage.dropdownIncludeControls).toHaveValue('always');
        expect(await CarouselBlockPage.dropdownIncludeControls).toHaveValue('never');
        expect(await CarouselBlockPage.dropdownIncludeControls).toHaveValue('desktop-only');

        await CarouselBlockPage.dropdownIncludeControls.scrollIntoView();
        expect(await CarouselBlockPage.dropdownIncludeControls).toBeDisplayed();
        expect(await CarouselBlockPage.dropdownIncludeControls).toHaveValue('_none');
        expect(await CarouselBlockPage.dropdownIncludeControls).toHaveValue('center');
        expect(await CarouselBlockPage.dropdownIncludeControls).toHaveValue('bottom');

        await CarouselBlockPage.dropdownControlsPosition.scrollIntoView();
        expect(await CarouselBlockPage.dropdownControlsPosition).toBeDisplayed();
        expect(await CarouselBlockPage.dropdownControlsPosition).toHaveValue('_none');
        expect(await CarouselBlockPage.dropdownControlsPosition).toHaveValue('center');
        expect(await CarouselBlockPage.dropdownControlsPosition).toHaveValue('bottom');

        await CarouselBlockPage.dropdownControlsIcon.scrollIntoView();
        expect(await CarouselBlockPage.dropdownControlsPosition).toBeDisplayed();
        expect(await CarouselBlockPage.dropdownControlsPosition).toHaveValue('_none');
        expect(await CarouselBlockPage.dropdownControlsPosition).toHaveValue('chevron');
        expect(await CarouselBlockPage.dropdownControlsPosition).toHaveValue('arrow');

        const animationCheckbox = await CarouselBlockPage.checkboxAnimationIntro;
        expect(await animationCheckbox).toBeDisplayed();
        expect(await animationCheckbox.isSelected()).toBe(false);

        expect(await CarouselBlockPage.inputCarouselConfig).toBeDisplayed();

    });

  });
