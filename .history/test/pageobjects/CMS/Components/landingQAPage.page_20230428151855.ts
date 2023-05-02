import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LandingQAPage extends Page {
    /**
     * define selectors using getter methods
     */

    //base page
    public get tabLayout () {
        return $('[href="/node/6/layout"]');
    }

    public get linkAddSection () {
        return $('div[class="layout-builder__add-section"]');
    }

    //right window section menu
    public get sectionTypeOneColumn () {
        return $('a[href$="/meda_layouts__section"]');
    }

    public get sectionTypeTwoColumn () {
        return $('a[href$="/meda_layouts__section_two_column"]');
    }

    //section modal
    public get inputLabel () {
        return $('#edit-layout-settings-label');
    }

    public get modalBtnAddSection () {
        return $('#edit-actions-submit');
    }
    /** The other fields in the modal will be added as they become necessary */

    //base page with section added making add block become available
    public get linkAddBlock () {
        return $('div[class="layout-builder__add-block"]');
    }

    //right window block menu
    public get btnCreateCustomBlock () {
        return $('a[class="use-ajax inline-block-create-button"]');
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
