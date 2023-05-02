import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LandingQAPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get layoutTab () {
        return $('[href="/node/6/layout"]');
    }

    public get inputPassword () {
        return $('#edit-pass');
    }



    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
    }


}

export default new LandingQAPage();
