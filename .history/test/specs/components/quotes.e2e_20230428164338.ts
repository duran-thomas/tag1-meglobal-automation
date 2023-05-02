import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page'
import QuotesBlockPage from '../../pageobjects/CMS/Components/quotes.page'
import LandingPage from '../../pageobjects/CMS/Components/landingQAPage.page'
import {users} from '../../data/users.data'


describe('Quotes Component Tests', () => {
    before(async () => {
        //Login
        browser.url(`https://meda2022:meda2022@meglobalstg.prod.acquia-sites.com/`);
        await LoginPage.waitForPageToLoad();
        await LoginPage.open();
        await LoginPage.login(users.validAdmin.username, users.validAdmin.password);
        expect(await browser.getUrl()).toEqual('https://meglobalstg.prod.acquia-sites.com/home');

        //navigate to admin content page
        await AdminContentPage.open();

        // Check if a QA Landing Page exists, if not one needs to be created before tests can be executed
        

    });
  
    it('should allow a Content Administrator user to login with valid credentials', async () => {
      await LoginPage.open();
      await LoginPage.login(users.validAdmin.username, users.validAdmin.password);

      expect(await LoginPage.headerText).toBeDisplayed();
    });
  
    it('should display an error message for invalid credentials', async () => {
      await LoginPage.open();
      await LoginPage.login(users.invalidAdmin.username, users.invalidAdmin.password);
      expect(await LoginPage.errorMessage).toBeDisplayed();
    });
  });
