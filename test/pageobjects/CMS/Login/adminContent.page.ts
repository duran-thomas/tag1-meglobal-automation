import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AdminContentPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnAddContent () {
        return $('a.button');
    }

    public get linkLandingPage () {
        return $('.admin-item__link[href="/node/add/landing_page"]');
    }

    public get inputTitle () {
        return $('#edit-title-0-value');
    }

    public get btnSave () {
        return $('#edit-submit');
    }

    public get successMessage () {
        return $('.mf-alert__container--success');
    } //assert text to contain "Landing Page has been created."

    public get tableElement () {
        return $('table');
    }

    public get qaPage () {
        return $('=QA Landing Page');
    }

    public get btnLayout () {
        return $('=Layout');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to create a QA landing page if needed
     */
    public async createQALandingPage () {
        (await this.btnAddContent).click();
        (await this.linkLandingPage).click();
        (await this.inputTitle).setValue('QA Landing Page');
        (await this.btnSave).scrollIntoView();
        await browser.pause(3500);
        (await this.btnSave).click();
    }

    /**
     * a method to check if the text "QA Landing Page" is present in the table element,
     * to assume if page exists or not
     * and create one if it's not there
     */
    public async getQALandingPage() {
        const tableElement = await this.tableElement;
        const tableRows = await tableElement.$$('tr');
      
        for (const row of tableRows) {
          const rowText = await row.getText();
      
          if (rowText.includes('QA Landing Page')) {
            const linkElement = await row.$('li.edit');
            await linkElement.click();
            return true;
          }
        }
      
        await this.createQALandingPage();
      }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('admin/content');
    }

}

export default new AdminContentPage();
