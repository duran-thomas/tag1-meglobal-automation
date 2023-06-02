import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import MyChartBlockPage from '../../pageobjects/CMS/Components/myChart.page';
import {users} from '../../data/users.data';
import { myChartBlockData } from '../../data/myChart.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';
import { beforeEach } from 'mocha';


describe('MyChart Component Tests', () => {
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

    beforeEach(async () => {
         //navigate to admin content page
         await AdminContentPage.open();
         // Navigate to QA Landing page to execute tests
         await AdminContentPage.getQALandingPage();
    });


    afterEach(async function() { //TODO: This needs some checking out. The screenshots that it create seem to be taken a bit too early in the execution?
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/MyChart/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);

        //clear out any existing blocks
        await QALayoutPage.cleanUpJob();
        //Return to layout view
        await QALayoutPage.goToQALayout();
    });

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
    it('[S3C858] Verify that a site Content Administrator can create a MyChart Component', async () => {
       
        const headline = myChartBlockData.headline;
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardMyChart).scrollIntoView();
        (await QALayoutPage.btnCardMyChart).click();
        (await MyChartBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await MyChartBlockPage.createMyChartComponent(myChartBlockData.title, myChartBlockData.headline, myChartBlockData.eyebrow, myChartBlockData.list, myChartBlockData.content, myChartBlockData.btnText, myChartBlockData.url,imageFilePath, myChartBlockData.altText);

        expect(MyChartBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await MyChartBlockPage.myChartElement).scrollIntoView();
        
        expect(await $(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        expect(await MyChartBlockPage.myChartElement).toExist();   
        browser.pause(2500);
    });


    it('[S3C859] Verify that all design fields are present with the correct available options.', async () => {
        
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardMyChart).scrollIntoView();
        (await QALayoutPage.btnCardMyChart).click();
        (await MyChartBlockPage.configBlock).waitForDisplayed();

        await MyChartBlockPage.navToStyling()

        const minimalCheckbox = await MyChartBlockPage.checkboxMinimal;
        await minimalCheckbox.scrollIntoView();
        expect(await minimalCheckbox).toBeDisplayed();
        expect(await minimalCheckbox.isSelected()).toBe(false);

        expect(await MyChartBlockPage.dropdownMobileAspectRatio).toBeDisplayed();
        expect(await MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('none');
        expect(await MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('fluid');
        expect(await MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('1:1');
        expect(await MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('5:4');
        expect(await MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('4:3');
        expect(await MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('3:4');
        expect(await MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('3:2');
        expect(await MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('16:9');
        expect(await MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('2:1');
        expect(await MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('21:9');
        expect(await MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('25:6');
        
        expect(await MyChartBlockPage.dropdownDesktopAspectRatio).toBeDisplayed();
        expect(await MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('none');
        expect(await MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('fluid');
        expect(await MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('1:1');
        expect(await MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('5:4');
        expect(await MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('4:3');
        expect(await MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:4');
        expect(await MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:2');
        expect(await MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('16:9');
        expect(await MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('2:1');
        expect(await MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('21:9');
        expect(await MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('25:6');

        expect(await MyChartBlockPage.dropdownContentPosition).toBeDisplayed();
        expect(await MyChartBlockPage.dropdownContentPosition).toHaveValue('_none');
        expect(await MyChartBlockPage.dropdownContentPosition).toHaveValue('left');
        expect(await MyChartBlockPage.dropdownContentPosition).toHaveValue('right');

        expect(await MyChartBlockPage.dropdownAlignment).toBeDisplayed();
        expect(await MyChartBlockPage.dropdownAlignment).toHaveValue('_none');
        expect(await MyChartBlockPage.dropdownAlignment).toHaveValue('left');
        expect(await MyChartBlockPage.dropdownAlignment).toHaveValue('center');

    });

  });
