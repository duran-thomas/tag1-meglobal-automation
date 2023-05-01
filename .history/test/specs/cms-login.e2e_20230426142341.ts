import LoginPage from  '../pageobjects/CMS/Login/login.page';
import SecurePage from '../pageobjects/authenticated.page';
import {AdminContentUser} from '../data/users.data'

describe('', () => {
    it('Should Login to the Drupal CMS with valid Content Administrator credentials', async () => {
        await LoginPage.open();

        await LoginPage.login(LoginData[0].username, LoginData[0].password);
        
        // TODO: Add successful login assertions
    });
});


