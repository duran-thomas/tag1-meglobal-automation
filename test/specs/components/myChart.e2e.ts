import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import MyChartBlockPage from '../../pageobjects/CMS/Components/myChart.page';
import { myChartBlockData } from '../../data/myChart.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';


describe('MyChart Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/MyChart/${testName}.png`;
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

       
  
    it('[S3C858] Verify that a site Content Administrator can create a MyChart Component', async () => {
        const headline = myChartBlockData.headline;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnCardMyChart).scrollIntoView();
        (await QALayoutPage.btnCardMyChart).click();
        (await MyChartBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await MyChartBlockPage.createMyChartComponent(myChartBlockData.title, myChartBlockData.headline, myChartBlockData.eyebrow, myChartBlockData.list, myChartBlockData.content, myChartBlockData.btnText, myChartBlockData.url,imageFilePath, myChartBlockData.altText);

        await expect(MyChartBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await MyChartBlockPage.myChartElement).scrollIntoView();
        
        await expect($(`div[data-analytics-item-title="${headline}"]`)).toExist; 
        await expect(MyChartBlockPage.myChartElement).toExist();   
    });


    // it('[S3C859] Verify that all design fields are present with the correct available options.', async () => {
    //  await (await QALayoutPage.tabLayout).click();
    //     await QALayoutPage.createNewSection();
    //     await QALayoutPage.navigateToBlockList();
    //     (await QALayoutPage.btnCardMyChart).scrollIntoView();
    //     (await QALayoutPage.btnCardMyChart).click();
    //     (await MyChartBlockPage.configBlock).waitForDisplayed();

    //     await MyChartBlockPage.navToStyling()

    //     const minimalCheckbox = await MyChartBlockPage.checkboxMinimal;
    //     await minimalCheckbox.scrollIntoView();
    //     await expect(minimalCheckbox).toBeDisplayed();
    //     await expect(minimalCheckbox.isSelected()).toBe(false);

    //     await expect(MyChartBlockPage.dropdownMobileAspectRatio).toBeDisplayed();
    //     await expect(MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('none');
    //     await expect(MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('fluid');
    //     await expect(MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('1:1');
    //     await expect(MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('5:4');
    //     await expect(MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('4:3');
    //     await expect(MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('3:4');
    //     await expect(MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('3:2');
    //     await expect(MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('16:9');
    //     await expect(MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('2:1');
    //     await expect(MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('21:9');
    //     await expect(MyChartBlockPage.dropdownMobileAspectRatio).toHaveValue('25:6');
        
    //     await expect(MyChartBlockPage.dropdownDesktopAspectRatio).toBeDisplayed();
    //     await expect(MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('none');
    //     await expect(MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('fluid');
    //     await expect(MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('1:1');
    //     await expect(MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('5:4');
    //     await expect(MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('4:3');
    //     await expect(MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:4');
    //     await expect(MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('3:2');
    //     await expect(MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('16:9');
    //     await expect(MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('2:1');
    //     await expect(MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('21:9');
    //     await expect(MyChartBlockPage.dropdownDesktopAspectRatio).toHaveValue('25:6');

    //     await expect(MyChartBlockPage.dropdownContentPosition).toBeDisplayed();
    //     await expect(MyChartBlockPage.dropdownContentPosition).toHaveValue('_none');
    //     await expect(MyChartBlockPage.dropdownContentPosition).toHaveValue('left');
    //     await expect(MyChartBlockPage.dropdownContentPosition).toHaveValue('right');

    //     await expect(MyChartBlockPage.dropdownAlignment).toBeDisplayed();
    //     await expect(MyChartBlockPage.dropdownAlignment).toHaveValue('_none');
    //     await expect(MyChartBlockPage.dropdownAlignment).toHaveValue('left');
    //     await expect(MyChartBlockPage.dropdownAlignment).toHaveValue('center');

    // });

  });
