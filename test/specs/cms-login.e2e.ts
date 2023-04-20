import LoginPage from  '../pageobjects/CMS/Login/login.page';
import SecurePage from '../pageobjects/authenticated.page';

describe('', () => {
    it('Should Login to the Drupal CMS with valid Content Administrator credentials', async () => {
        await LoginPage.open();

        await LoginPage.login('test-content-administrator', 'meda2022');
        
        // TODO: Add successful login assertions
    });
});


