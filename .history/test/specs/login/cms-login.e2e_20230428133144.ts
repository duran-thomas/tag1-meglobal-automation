import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import {users} from '../../data/users.data'


describe('Login Page', () => {
    before(async () => {
      // Bypass login modal before running tests
      browser.url(`https://meda2022:meda2022@meglobalstg.prod.acquia-sites.com/`);
    });
  
    afterEach(async function() {
      // Take a screenshot after each test/assertion
      const timestamp = Date.now();
      const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
      const screenshotPath = `./screenshots/${testName}_${timestamp}.png`;
      await browser.saveScreenshot(screenshotPath);
    });
  
    it('should allow a Content Administrator user to login with valid credentials', async () => {
      await LoginPage.open();
      await LoginPage.login(users.validAdmin.username, users.validAdmin.password);

      //expect(await LoginPage.headerText).toBeDisplayed(); this is giving a false positive for some reason
      expect(await browser.getUrl()).toHaveText('http://meglobalstg.prod.acquia-sites.com/home');
    });
  
    it('should display an error message for invalid credentials', async () => {
      await LoginPage.open();
      await LoginPage.login(users.invalidAdmin.username, users.invalidAdmin.password);
      expect(await LoginPage.errorMessage).toBeDisplayed();
    });
  });
