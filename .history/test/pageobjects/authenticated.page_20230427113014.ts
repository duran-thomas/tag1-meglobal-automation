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
     * e.g. to create a QA landing page if needed
     */
    public async createQALandingPage () {
        await this.inputTitle.setValue('QA Landing Page');
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
