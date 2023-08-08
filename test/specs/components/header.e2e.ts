import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import HeaderBlockPage from '../../pageobjects/CMS/Components/header.page';
import {users} from '../../data/users.data';
import { globalUtilityData } from '../../data/header.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe.skip('Header Component Tests', () => {
    before(async () => {
        // //Login
        await browser.url(await 'https://meda2022:meda2022@meglobalode6.prod.acquia-sites.com/');
        await browser.maximizeWindow();

        // Set the cookie for a logged in user
        await browser.setCookies([
            {
              name: 'SSESS9e2d425922cbef95519d96d95a52e59d',
              value: 'MOlCogB0apAVLQQREozKeL4bmWItCYGjOP%2CLk7bGWbXYmJ5p',
              domain: '.meglobalode6.prod.acquia-sites.com',
              path: cookieData.path,
            }
        ]);
    });

    beforeEach(async function() {
        //navigate to home
        await HeaderBlockPage.openHome();
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

    it('[S3C629] Verify "Global-Utility" menu links.', async () => {
        await expect(await HeaderBlockPage.btnFindDoctor).toExist(); 

        await expect(await $('span[data-analytics-click-text="college-graduation"]')).toExist(); //Improve: doesn't directly check the specific element for the icon

        // const parentElement = await $('a[data-analytics-click-text="Find a Doctor"]');
        // const childElement = await parentElement.$('span.mf-button__icon.mf-button__icon--leading');

        // const desiredElementExists = await childElement.$('span[data-analytics-click-text="college-graduation"]').isExisting();

        // expect(desiredElementExists).toBe(true);

        await (await HeaderBlockPage.btnFindDoctor).click();

        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/doctors');

    });

    it('[S3C948] Verify buttons can be added to and removed "Global Utility" menu', async () => {
        //create
        await HeaderBlockPage.openUtilityMenu();
        await HeaderBlockPage.createUtilityMenu(globalUtilityData.link, globalUtilityData.title, globalUtilityData.description, globalUtilityData.label);
        await expect(await HeaderBlockPage.statusMsg).toBeDisplayedInViewport();
        await expect(await HeaderBlockPage.statusMsg).toHaveTextContaining('saved');
        await HeaderBlockPage.openHome();
        await expect(await HeaderBlockPage.menuElement).toBeExisting();

        //remove
        await HeaderBlockPage.openUtilityMenu();
        await (await HeaderBlockPage.createdLink).scrollIntoView();
        
        // const wikipediaLink = await $('a[href="https://www.wikipedia.com/"]');
        // const row = await wikipediaLink.$('..'); // Navigate to the parent row element
        // const dropdownToggle = await row.$('.dropbutton-toggle');

        // await dropdownToggle.click();

        await (await HeaderBlockPage.dropdownToggle).click();//Improve: clicks by index, not locating target element row

        await (await HeaderBlockPage.linkDelete).click();
        await (await HeaderBlockPage.btnDelete).click();
        await expect(await HeaderBlockPage.statusMsg).toBeDisplayedInViewport();
        await expect(await HeaderBlockPage.statusMsg).toHaveTextContaining('deleted');
        await HeaderBlockPage.openHome();
        await expect(await HeaderBlockPage.menuElement).not.toBeExisting();

    });

    it('[S3C631] Verify "Hamburger" menu links.', async () => {
        await HeaderBlockPage.goToMainMenu();
        await expect(await HeaderBlockPage.btnAbout).toBeDisplayed();
        
        
    });



  });
