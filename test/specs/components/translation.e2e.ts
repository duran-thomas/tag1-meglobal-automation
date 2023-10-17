import TranslationBlockPage from '../../pageobjects/CMS/Components/translation.page';
import { getEnvironmentConfig } from '../../../envSelector';



describe('Translation Component Tests', () => {

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

        await browser.url(await environment.baseUrl+'home');
    });

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Translation/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

     
    it('[S3C704] Verify that the Header has the Language Switcher option', async () => {
        const expectedIconText = 'globe-alternative';

        // Locate the button element
        const button = TranslationBlockPage.btnLanguage;

        // Locate the icon element within the button
        const iconElement = await button.$(`span[data-analytics-click-text="${expectedIconText}"]`);

        // Assert that the icon element is present
        await expect(iconElement).toBeDisplayed();
        //Assert language is set to English
        await expect(button).toHaveAttribute('data-analytics-click-text', 'English');
    });

    it('[S3C705] Verify that the Language Switcher only has the correct language options.', async () => {
        await (await TranslationBlockPage.btnLanguage).click();

        // Assert both languages are present 
        await expect(await TranslationBlockPage.listItems[0]).toHaveText('English');
        await expect(await TranslationBlockPage.listItems[1]).toHaveText('Español');
    });

    it('[S3C707] Verify that selecting one of the Language Switcher options translates the page accordingly', async () => {
        await (await TranslationBlockPage.listItems[1]).click();

        const expectedLanguage = 'es'; 
        const expectedURL = 'es/home'; 
        const langAttribute = await TranslationBlockPage.htmlElem.getAttribute('lang');
        const currentURL = await browser.getUrl();
        
        // Assert language is present in url as well as in html lang attribute, logo should link to /es
        await expect(langAttribute).toEqual(expectedLanguage);
        await expect(currentURL).toContain(expectedURL);
        await expect(TranslationBlockPage.logoElem).toHaveAttribute('href', '/es');
    });

    it('[S3C706] Verify that the active Language is correctly displayed in the Language Switcher.', async () => {
        await (await TranslationBlockPage.btnLanguage).click();

        //Assert that the active class is on the Spanish element since the page should currently be on that translation
        const element = await $('=Español'); 
        const expectedClassSubstring = 'mf-dropdown__link--active'; 

        // Get the class attribute of the element
        const classAttribute = await element.getAttribute('class');

        // Use a regular expression to check if it contains the expected substring
        const containsExpectedClass = new RegExp(expectedClassSubstring).test(classAttribute);

        // Assert that the class attribute contains the expected substring
        expect(containsExpectedClass).toBe(true);
    });

    it('[S3C953] Verify Language Switch from English to Spanish and vice versa ', async () => {
        //NB: Spanish Translation is tested above in 707, this only verifies translating back to English
        await (await TranslationBlockPage.listItems[0]).click();

        const expectedLanguage = 'en'; 
        const expectedURL = '/home'; 
        const langAttribute = await TranslationBlockPage.htmlElem.getAttribute('lang');
        const currentURL = await browser.getUrl();
        
        // Assert language is present in url as well as in html lang attribute, logo should link to /es
        await expect(langAttribute).toEqual(expectedLanguage);
        await expect(currentURL).toContain(expectedURL);
        await expect(TranslationBlockPage.logoElem).toHaveAttribute('href', '/');
    });

    it('[S3C1153] Verify that cross-site Language switching works as expected', async () => {
        await (await TranslationBlockPage.btnLanguage).click();
        await (await TranslationBlockPage.listItems[1]).click();

        await expect(TranslationBlockPage.linkCollege).toHaveHrefContaining('/es');
    });
    
  });
