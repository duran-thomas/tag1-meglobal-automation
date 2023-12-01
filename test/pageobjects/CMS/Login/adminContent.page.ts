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
        await (await this.btnAddContent).click();
        await (await this.linkLandingPage).click();
        await (await this.inputTitle).setValue('QA Landing Page');
        await (await this.btnSave).scrollIntoView();
        await browser.pause(2000);
        await (await this.btnSave).click();
        await browser.pause(3000);
    }

    public async createTestPage (componentTest) {
        await (await this.btnAddContent).click();
        await (await this.linkLandingPage).click();
        await (await this.inputTitle).setValue(componentTest);
        await (await this.btnSave).scrollIntoView();
        await browser.pause(2000);
        await (await this.btnSave).click();
        await browser.pause(3000);
    }

    public async deleteTestPage (componentTest) {
        await (await $(`=${componentTest}`)).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await $(`=${componentTest}`)).click();
        await (await $('=Delete')).click();
        await (await this.btnSave).waitForDisplayed({timeout:8000});
        await (await this.btnSave).click();
        await browser.pause(2000);
    }

    /**
     * a method to check if the text "QA Landing Page" is present in the table element,
     * to assume if page exists or not
     * and create one if it's not there
     */
    public async getQALandingPage() {
        try {
            const qaPage = await this.qaPage;
            if (await qaPage.isExisting()) {
              await qaPage.scrollIntoView({ behavior: 'auto', block: 'center' });
              await qaPage.click();
            } else {
              await this.createQALandingPage();
            }
        } catch (error) {
            // Try to show the error
            console.error('Error occurred while performing getQALandingPage:', error);
        }
      }

    public async getTestPage(componentTest) {
        try {
            const testPage = await $(`=${componentTest}`);
            if (await testPage.isExisting()) {
              await testPage.scrollIntoView({ behavior: 'auto', block: 'center' });
              await testPage.click();
            } else {
              await this.createTestPage(componentTest);
            }
        } catch (error) {
            // Try to show the error
            console.error('Error occurred while performing getTestPage:', error);
        }
      }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('admin/content');
    }

    public openPopularSearches() {
        return super.open('admin/structure/menu/manage/popular-searches')
    }
}

export default new AdminContentPage();
