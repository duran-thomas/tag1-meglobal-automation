import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminPage from '../../pageobjects/CMS/Login/adminContent.page';
import QuotesPage from '../../pageobjects/CMS/Components/quotes.page'
import {users} from '../../data/users.data'


describe('Quotes Page', () => {
    before(async () => {
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
