import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import {users} from '../../data/users.data'


describe('Login Page', () => {
    before(async () => {
      // Bypass login modal before running tests
      browser.url(`https://meda2022:meda2022@meglobalstg.prod.acquia-sites.com/`);
      await LoginPage.waitForPageToLoad();
    });
  
    afterEach(async function() {
      // Take a screenshot after each test/assertion
      const date = new Date().toLocaleDateString('en-US', { timeZone: 'UTC' });
      const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
      const screenshotPath = `./screenshots/${testName}_${date}.png`;
      await browser.saveScreenshot(screenshotPath);
    });
    

    it('should display an error message for invalid credentials', async () => {
      await LoginPage.open();
      await LoginPage.login(users.invalidAdmin.username, users.invalidAdmin.password);
      expect(await LoginPage.errorMessage).toBeDisplayed();
    });
  
    it('should allow a Content Administrator user to login with valid credentials', async () => {
      await LoginPage.open();
      await LoginPage.login(users.validAdmin.username, users.validAdmin.password);
      expect(await LoginPage.errorMessage).not.toBeDisplayed();
      expect(await browser.getUrl()).toEqual('https://meglobalstg.prod.acquia-sites.com/home');
    });
  
    
  });
