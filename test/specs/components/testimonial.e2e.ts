import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import TestimonialBlockPage from '../../pageobjects/CMS/Components/testimonial.page';
import {users} from '../../data/users.data';
import * as data from '../../data/testimonial.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Testimonial Component Tests', () => {
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
        const screenshotPath = `./screenshots/Testimonial/${testName}.png`;
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

  
    it('[S3C914] Verify that a site Content Administrator can create a Testimonial Component', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnTestimonial).scrollIntoView();
        (await QALayoutPage.btnTestimonial).click();
        (await TestimonialBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/testimonial1.png');
        await TestimonialBlockPage.createTestimonial(data.testimonialBlockData.title, data.testimonialBlockData.quote, data.testimonialBlockData.name, imageFilePath, data.testimonialBlockData.altText);

        await expect(TestimonialBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();

        await expect(await TestimonialBlockPage.testimonialElement).toBeExisting();   

        await (await TestimonialBlockPage.testimonialElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await TestimonialBlockPage.quotes[0]).toHaveText(data.testimonialBlockData.quote); 
    });

    it('[S3C915] Verify that a site Content Administrator can create a Testimonial Component with the Image Background field set to True', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnTestimonial).scrollIntoView();
        (await QALayoutPage.btnTestimonial).click();
        (await TestimonialBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/testimonial2.png');
        await TestimonialBlockPage.createBackgroundTestimonial(data.testimonialBgBlockData.title, data.testimonialBgBlockData.quote, data.testimonialBgBlockData.name, imageFilePath, data.testimonialBgBlockData.altText);

        await expect(TestimonialBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();

        await expect(await TestimonialBlockPage.testimonialElement).toBeExisting();   

        await (await TestimonialBlockPage.quotes[0]).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await TestimonialBlockPage.quotes).toHaveText(data.testimonialBgBlockData.quote); 
    });

    it('[S3C932] Verify that a site Content Administrator can create multiple Testimonial Components', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnTestimonial).scrollIntoView();
        (await QALayoutPage.btnTestimonial).click();
        (await TestimonialBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/testimulti1.jpeg');
        const imageFilePath2 = await browser.uploadFile('scriptFiles/testimulti2.jpeg');
        const imageFilePath3 = await browser.uploadFile('scriptFiles/testimulti3.jpeg');
        const imageFilePath4 = await browser.uploadFile('scriptFiles/testimulti4.jpeg');
        const imageFilePath5 = await browser.uploadFile('scriptFiles/testimulti5.jpeg');

        await TestimonialBlockPage.createMultiTestimonialBlock1(data.testimonialMultiBlockData.t1.title, data.testimonialMultiBlockData.t1.quote, data.testimonialMultiBlockData.t1.name, imageFilePath, data.testimonialMultiBlockData.t1.altText, data.testimonialMultiBlockData.t2.quote, data.testimonialMultiBlockData.t2.name, imageFilePath2, data.testimonialMultiBlockData.t2.altText, data.testimonialMultiBlockData.t3.quote, data.testimonialMultiBlockData.t3.name, imageFilePath3, data.testimonialMultiBlockData.t3.altText, data.testimonialMultiBlockData.t4.quote, data.testimonialMultiBlockData.t4.name, imageFilePath4, data.testimonialMultiBlockData.t4.altText, data.testimonialMultiBlockData.t5.quote, data.testimonialMultiBlockData.t5.name, imageFilePath5, data.testimonialMultiBlockData.t5.altText);

        await expect(TestimonialBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();

        await (await TestimonialBlockPage.quotes[1]).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await TestimonialBlockPage.testimonialElement).toBeExisting();   

        await expect(await TestimonialBlockPage.quotes.length).toEqual(5);
        await expect(await TestimonialBlockPage.allTestimonials.length).toEqual(5);
        await expect(await TestimonialBlockPage.quotes[0]).toHaveText(data.testimonialMultiBlockData.t1.quote); 
        await expect(await TestimonialBlockPage.quotes[1]).toHaveText(data.testimonialMultiBlockData.t2.quote); 
        await expect(await TestimonialBlockPage.quotes[2]).toHaveText(data.testimonialMultiBlockData.t3.quote); 
        await expect(await TestimonialBlockPage.quotes[3]).toHaveText(data.testimonialMultiBlockData.t4.quote); 
        await expect(await TestimonialBlockPage.quotes[4]).toHaveText(data.testimonialMultiBlockData.t5.quote); 

    });

  });
