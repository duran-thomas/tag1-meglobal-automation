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

        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getQALandingPage();
        expect(await LandingPage.tabLayout).toBeDisplayed();
    });
  
    it.skip('Verify that a site Content Administrator can create a Quotes Component with the border being shown, without audio', async () => {
      await LoginPage.open();
      await LoginPage.login(users.validAdmin.username, users.validAdmin.password);

      expect(await LoginPage.headerText).toBeDisplayed();
    });
  
    
  });
