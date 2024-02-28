import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import FactsBlockPage from '../../pageobjects/CMS/Components/facts.page';
import { factsBlockData } from '../../data/facts.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';


describe('Facts Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/Facts/${testName}.png`;
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

     
    it('[S3C844] Verify that a site Content Administrator can create a Facts Component with a horizontal layout', async () => {
        const id=`Facts-S3C844-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFacts).scrollIntoView();
        (await QALayoutPage.btnFacts).click();
        (await FactsBlockPage.configBlock).waitForDisplayed();

        await FactsBlockPage.createFactsWithHorizontalLayout(factsBlockData.mainTitle, factsBlockData.title1, factsBlockData.description1, factsBlockData.title2, factsBlockData.description2, factsBlockData.title3, factsBlockData.description3);

        await expect(FactsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FactsBlockPage.horizontalElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FactsBlockPage.horizontalElement(id)).toExist();   
        
    });

    it('[S3C845] Verify that a site Content Administrator can create a Facts Component with a vertical layout', async () => {
        const id=`Facts-S3C845-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFacts).scrollIntoView();
        (await QALayoutPage.btnFacts).click();
        (await FactsBlockPage.configBlock).waitForDisplayed();

        await FactsBlockPage.createFactsWithVerticalLayout(factsBlockData.mainTitle, factsBlockData.title1, factsBlockData.description1, factsBlockData.title2, factsBlockData.description2, factsBlockData.title3, factsBlockData.description3);

        await expect(FactsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await expect(FactsBlockPage.factsElement(id)).toExist(); 
        await (await FactsBlockPage.factsElement(id)).scrollIntoView();
        await browser.pause(4000);
    });

    it('[S3C846] Verify that a site Content Administrator can create a Facts Component with a grid layout', async () => {
        const id=`Facts-S3C846-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFacts).scrollIntoView();
        (await QALayoutPage.btnFacts).click();
        (await FactsBlockPage.configBlock).waitForDisplayed();

        await FactsBlockPage.createFactsWithGridLayout(factsBlockData.mainTitle, factsBlockData.title1, factsBlockData.description1, factsBlockData.title2, factsBlockData.description2, factsBlockData.title3, factsBlockData.description3);

        await expect(FactsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await expect(FactsBlockPage.factsElement(id)).toExist(); 
        await (await FactsBlockPage.factsElement(id)).scrollIntoView();
        await browser.pause(4000);
    });

    it('[S3C847] Verify that a site Content Administrator can create a Facts Component with a slider layout', async () => {
        const id=`Facts-S3C847-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFacts).scrollIntoView();
        (await QALayoutPage.btnFacts).click();
        (await FactsBlockPage.configBlock).waitForDisplayed();

        await FactsBlockPage.createFactsWithSliderLayout(factsBlockData.mainTitle, factsBlockData.title1, factsBlockData.description1, factsBlockData.title2, factsBlockData.description2, factsBlockData.title3, factsBlockData.description3, factsBlockData.title4, factsBlockData.description4, factsBlockData.title5, factsBlockData.description5);

        await expect(FactsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await expect(FactsBlockPage.btnCarousel(id)).toExist(); 
        await (await FactsBlockPage.factsElement(id)).scrollIntoView();
    });

    // it('[S3C848] Verify that all design fields are present with the correct available options.', async () => {
    //  await (await QALayoutPage.tabLayout).click();
    //     await QALayoutPage.createNewSection();
    //     await QALayoutPage.navigateToBlockList();
    //     (await QALayoutPage.btnFacts).scrollIntoView();
    //     (await QALayoutPage.btnFacts).click();
    //     (await FactsBlockPage.configBlock).waitForDisplayed();

    //     await FactsBlockPage.navToStyling()
    //     await expect(FactsBlockPage.dropdownBackground).toBeDisplayed();
    //     await expect(FactsBlockPage.dropdownBackground).toHaveValue('white');
    //     await expect(FactsBlockPage.dropdownBackground).toHaveValue('soft-blue');
    //     await expect(FactsBlockPage.dropdownBackground).toHaveValue('mist-gray');

    //     await expect(FactsBlockPage.dropdownTitleVariant).toBeDisplayed();
    //     await expect(FactsBlockPage.dropdownTitleVariant).toHaveValue('sans');
    //     await expect(FactsBlockPage.dropdownTitleVariant).toHaveValue('serif');

    //     await expect(FactsBlockPage.dropdownLayout).toBeDisplayed();
    //     await expect(FactsBlockPage.dropdownLayout).toHaveValue('vertical-list');
    //     await expect(FactsBlockPage.dropdownLayout).toHaveValue('horizontal-list');
    //     await expect(FactsBlockPage.dropdownLayout).toHaveValue('grid');
    //     await expect(FactsBlockPage.dropdownLayout).toHaveValue('slider');

    //     await expect(FactsBlockPage.dropdownHorizontalAlignment).toBeDisplayed();
    //     await expect(FactsBlockPage.dropdownHorizontalAlignment).toHaveValue('left');
    //     await expect(FactsBlockPage.dropdownHorizontalAlignment).toHaveValue('center');
    //     await expect(FactsBlockPage.dropdownHorizontalAlignment).toHaveValue('right');

    //     await expect(FactsBlockPage.dropdownVerticalAlignment).toBeDisplayed();
    //     await expect(FactsBlockPage.dropdownVerticalAlignment).toHaveValue('top');
    //     await expect(FactsBlockPage.dropdownVerticalAlignment).toHaveValue('center');
    //     await expect(FactsBlockPage.dropdownVerticalAlignment).toHaveValue('bottom');

    //     const checkbox = await FactsBlockPage.checkboxAddBorder;
    //     await expect(checkbox).toBeDisplayed();
    //     await expect(checkbox.isSelected()).toBe(false);
        
    // });

    it('[S3C849] Verify that the Facts Component displays the correct title', async () => {
        const id=`Facts-S3C849-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFacts).scrollIntoView();
        (await QALayoutPage.btnFacts).click();
        (await FactsBlockPage.configBlock).waitForDisplayed();

        await FactsBlockPage.createAFact(factsBlockData.mainTitle, factsBlockData.title1, factsBlockData.description1)
        await expect(FactsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await expect(await FactsBlockPage.titleElement(id)).toHaveText(factsBlockData.title1);
        await (await FactsBlockPage.factsElement(id)).scrollIntoView();
    });

  });
