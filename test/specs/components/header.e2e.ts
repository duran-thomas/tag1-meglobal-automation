import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import HeaderBlockPage from '../../pageobjects/CMS/Components/header.page';
import { globalUtilityData } from '../../data/header.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import { hamburgerData } from '../../data/header.data';


describe('Header Component Tests', () => {

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

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Header/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    // afterEach(async function() { 
    //     await AdminContentPage.open();
    //     await AdminContentPage.getTestPage(global.suiteDescription);
    //  await (await QALayoutPage.tabLayout).click();
    //     await QALayoutPage.cleanUpJob();
    //     await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
    //     //return to starting point
    //     await AdminContentPage.open();
    //     await AdminContentPage.getTestPage(global.suiteDescription);  
    // });

    it('[S3C943] Verify that all sections of the Header are present.', async () => {
        await expect(await HeaderBlockPage.btnFindDoctor).toBeDisplayedInViewport(); 
        await expect(await HeaderBlockPage.btnMenu).toBeDisplayedInViewport();   
        await expect(await HeaderBlockPage.navFlyout).toBeDisplayedInViewport();   
        await expect(await HeaderBlockPage.navLeft).toBeDisplayedInViewport();   
        await expect(await HeaderBlockPage.navRight).toBeDisplayedInViewport();   

    });

    it('[S3C945] Verify links can be added to and removed from "Utility Left" menu', async () => {
        await HeaderBlockPage.navToUtilityLeft();
        await HeaderBlockPage.createUtilLeftLink(hamburgerData.menuTitle, hamburgerData.link);
        await HeaderBlockPage.openHomePage();
        await expect(await $(`a[data-analytics-click-text="${hamburgerData.menuTitle}"]`)).toBeDisplayed();
        await HeaderBlockPage.navToUtilityLeft();
        await HeaderBlockPage.deleteUtilLeftLink();
        await HeaderBlockPage.openHomePage();
        await expect(await $(`a[data-analytics-click-text="${hamburgerData.menuTitle}"]`)).not.toBeDisplayed();

    });

    it('[S3C632] Verify that "Hamburger" menu expands to the current active panel and indicates the active link', async () => {
        await HeaderBlockPage.navToFellowshipPage();
        await (await HeaderBlockPage.btnHamburgerMenu).waitForDisplayed();
        await (await HeaderBlockPage.btnHamburgerMenu).click();
        await browser.pause(5000);
        const elem = await HeaderBlockPage.linkFellowship;
        await expect(elem).toBeDisplayedInViewport();
        await expect(elem).toHaveElementClassContaining('mf-link--direction-backwards'); //assert it's the active link (animation style)

    });


    it('[S3C629] Verify "Global-Utility" menu links.', async () => {
        await expect(await HeaderBlockPage.btnFindDoctor).toExist();
        await expect(await $('span[data-analytics-click-text="doctor"]')).toExist(); //Improve: doesn't directly check the specific element for the icon
      

        // const parentElement = await $('a[data-analytics-click-text="Find a Doctor"]');
        // const childElement = await parentElement.$('span.mf-button__icon.mf-button__icon--leading');

        // const desiredElementExists = await childElement.$('span[data-analytics-click-text="college-graduation"]').isExisting();

        // expect(desiredElementExists).toBe(true);
        await (await HeaderBlockPage.btnFindDoctor).click();

        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/profiles');

    });


    it('[S3C948] Verify buttons can be added to and removed "Global Utility" menu', async () => {
        //create
        const environment = getEnvironmentConfig(process.env.ENV);
        // Use the environment data
        const baseUrl = environment.baseUrl;
        await HeaderBlockPage.openUtilityMenu(baseUrl);
        await HeaderBlockPage.createUtilityMenu(globalUtilityData.link, globalUtilityData.title, globalUtilityData.description, globalUtilityData.label);
        await expect(await HeaderBlockPage.statusMsg).toBeDisplayedInViewport();
        await expect(await HeaderBlockPage.statusMsg).toHaveTextContaining('saved');
        await HeaderBlockPage.openHome(baseUrl);
        await expect(await HeaderBlockPage.menuElement).toBeExisting();

        //remove
        await HeaderBlockPage.openUtilityMenu(baseUrl);
        await (await HeaderBlockPage.createdLink).scrollIntoView();

        
    //     // const wikipediaLink = await $('a[href="https://www.wikipedia.com/"]');
    //     // const row = await wikipediaLink.$('..'); // Navigate to the parent row element
    //     // const dropdownToggle = await row.$('.dropbutton-toggle');

    //     // await dropdownToggle.click();

        await (await HeaderBlockPage.dropdownToggle).click();//Improve: clicks by index, not locating target element row

        await (await HeaderBlockPage.linkDelete).click();
        await (await HeaderBlockPage.btnDelete).click();
        await expect(await HeaderBlockPage.statusMsg).toBeDisplayedInViewport();
        await expect(await HeaderBlockPage.statusMsg).toHaveTextContaining('deleted');
        await HeaderBlockPage.openHome(baseUrl);
        await expect(await HeaderBlockPage.menuElement).not.toBeExisting();

     });


    it('[S3C631] Verify "Hamburger" menu links.', async () => {
        await HeaderBlockPage.openHomePage();
        await HeaderBlockPage.goToMainMenu();
        // await expect(await HeaderBlockPage.btnAbout).toBeDisplayed();
    });



});
