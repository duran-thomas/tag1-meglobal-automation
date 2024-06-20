import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import FooterBlockPage from '../../pageobjects/CMS/Components/footer.page';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import { footerBlockData } from '../../data/footer.data';

describe('Footer Component Tests', () => {

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

    // before(async function() {
    //     global.suiteDescription = this.currentTest?.parent?.title;
    //     //navigate to admin content page
    //     await AdminContentPage.open();
    //     //await AdminContentPage.closeCookieBanner();
    //     // Navigate to QA Landing page to execute tests
    //     await AdminContentPage.getTestPage(global.suiteDescription);  
    //     await expect(QALayoutPage.tabLayout).toBeDisplayed();
    // })

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Footer/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete page
    // after(async function () {
    //     // Get the environment configuration
    //     const environment = getEnvironmentConfig(process.env.ENV);
    //     //await browser.url(environment.baseUrl+'user/logout');
    //     await browser.setCookies(environment.admin);
    //     await AdminContentPage.open();
    //     await AdminContentPage.deleteTestPage(global.suiteDescription);
    //     await expect($('.mf-alert__container--highlight')).toBeDisplayed();
    // });

  
    it('[S3C649] Verify that the Footer component exists on a page of the site', async () => {
        await FooterBlockPage.openHome();
        await (await FooterBlockPage.footerElement).scrollIntoView();
        await expect(FooterBlockPage.footerElement).toBeExisting();
        await expect(FooterBlockPage.footerBottom).toBeExisting();
        await expect(FooterBlockPage.footerRightBlock).toBeExisting();
        await expect(FooterBlockPage.footerMainLinks).toBeExisting();
        await expect(FooterBlockPage.footerTopLinks).toBeExisting();

    });

    it('[S3C685] Verify the display of the Contact Us section for Montefiore and Einstein', async () => {
        await FooterBlockPage.openHome();
        await (await FooterBlockPage.footerElement).scrollIntoView();

        const rightBlock = await FooterBlockPage.footerRightBlock;
        const logo = await rightBlock.$(await FooterBlockPage.meLogo.selector);
        const phoneIcons = await FooterBlockPage.phoneIcons;
        const locationIcons = await FooterBlockPage.locationIcons;
        const xIcons = await FooterBlockPage.xIcon;
        const fbIcons = await FooterBlockPage.fbIcon;
        const linkedInIcons = await FooterBlockPage.linkedInIcon;
        const igIcons = await FooterBlockPage.igIcon;
        const youTubeIcons = await FooterBlockPage.youTubeIcon;

        await expect(logo).toBeExisting();
        await expect(phoneIcons.length).toBe(2);
        await expect(locationIcons.length).toBe(2);
        await expect(xIcons.length).toBe(2);
        await expect(fbIcons.length).toBe(2);
        await expect(linkedInIcons.length).toBe(2);
        await expect(igIcons.length).toBe(2);
        await expect(youTubeIcons.length).toBe(2);
    });

    it.only('[S3C688] Verify social media icons are present with valid links', async () => {
        await FooterBlockPage.openHome();
        await (await FooterBlockPage.footerElement).scrollIntoView();

        const xIcons = await FooterBlockPage.xIcon;
        const fbIcons = await FooterBlockPage.fbIcon;
        const linkedInIcons = await FooterBlockPage.linkedInIcon;
        const igIcons = await FooterBlockPage.igIcon;
        const youTubeIcons = await FooterBlockPage.youTubeIcon;

        // Loop through each xIcon, click it, and assert the URL
        for (let i = 0; i < xIcons.length; i++) {
            await xIcons[i].click();
            const currentUrl = await browser.getUrl();
            await expect(currentUrl).toContain('https://x.com/');
            await FooterBlockPage.openHome();
            await (await FooterBlockPage.footerElement).scrollIntoView();
        }

    });





  });
