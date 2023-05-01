import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page'
import QuotesBlockPage from '../../pageobjects/CMS/Components/quotes.page'
import LandingPage from '../../pageobjects/CMS/Components/QALayoutPage.page'
import {users} from '../../data/users.data'
import QALayoutPagePage from '../../pageobjects/CMS/Components/QALayoutPage.page';


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
  
    it('Verify that a site Content Administrator can create a Quotes Component with the border being shown, without audio', async () => {
        (await QALayoutPagePage.tabLayout).click();
        await QALayoutPagePage.createNewSection();
        await QALayoutPagePage.navigateToBlockList();
        (await QALayoutPagePage.btnQuote).click();


      
    });
  
    it('Verify that a site Content Administrator can create a Quotes Component without the border being shown', async () => {
      
    });

    it('Verify that a site Content Administrator can create a Quotes Component with Audio and Transcript', async () => {
      
    });

    it('Verify that a site Content Administrator can create a Quotes Component with Audio and without Transcript', async () => {
      
    });

    it('Verify that all design fields are present with the correct available options.', async () => {
      
    });

    
  });
