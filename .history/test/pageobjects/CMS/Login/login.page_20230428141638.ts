import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputUsername () {
        return $('#edit-name');
    }

    public get inputPassword () {
        return $('#edit-pass');
    }

    public get btnSubmit () {
        return $('#edit-submit');
    }

    public get errorMessage () {
        return $('.mf-alert__container--error');
    }

    public get headerText() {
        return $('h1 span=homepage');
    }


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * Wait for the login page to fully load by waiting for the email input element to be displayed.
     */
    public async waitForPageToLoad(): Promise<void> {
        await this.headerText.waitForDisplayed();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('user/login');
    }
}

export default new LoginPage();
