import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import {users} from '../../data/users.data'


describe.skip('Login Page', () => {
    before(async () => {
      // Bypass login modal before running tests
      browser.url(`https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/`);
      await LoginPage.waitForPageToLoad();
      await browser.setCookies([
        {
          name: 'SSESSaa21775f23303ec27f377cce4bdc4f02',
          value: '38rjKWuZw0cJBnsWaQDCcRBXqbLr-25xv8oSZJXhr2R0cNXD',
          domain: 'meglobalstg.prod.acquia-sites.com',
          path: '/',
        },
        {
          name: 'hyro.token',
          value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhOTlmZGQ3Mi02MWNjLTQxMjMtYTg1MS04MDkzZTJmMjg1NDIiLCJpc3MiOiJhaXJidWQuaW8ifQ.nGvkH0mIWlP8TCJhtkgZ9rqL9G_M9JHh-balo5uyGrg',
          domain: 'meglobalstg.prod.acquia-sites.com',
          path: '/'
        }
    ]);
      //await browser.url('https://meglobalstg.prod.acquia-sites.com/admin/content');
    });
  
    afterEach(async function() {
      // Take a screenshot after each test/assertion
      const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
      const screenshotPath = `./screenshots/Login/${testName}.png`;
      await browser.saveScreenshot(screenshotPath);
    });
    

    // it.skip('should display an error message for invalid credentials', async () => {
    //   await LoginPage.open();
    //   await LoginPage.login(users.invalidAdmin.username, users.invalidAdmin.password);
    //   expect(await LoginPage.errorMessage).toBeDisplayed();
    // });
  
    // it.skip('should allow a Content Administrator user to login with valid credentials', async () => {
    //   await LoginPage.open();
    //   await LoginPage.login(users.validAdmin.username, users.validAdmin.password);
    //   expect(await LoginPage.errorMessage).not.toBeDisplayed();
    //   expect(await browser.getUrl()).toEqual('https://meglobaldev.prod.acquia-sites.com/home');
    // });
  
    
  });
