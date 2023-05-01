import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AdminContentPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnAddContent () {
        return $('[href="/node/add"]');
    }

    public get linkLandingPage () {
        return $('[href="/node/add/landing_page"]');
    }

    public get inputTitle () {
        return $('#edit-title-0-value');
    }

    public get btnSubmit () {
        return $('#edit-submit');
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
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('admin/content');
    }

}

export default new AdminContentPage();
