import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AccordionBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout () {
        return $('#edit-submit');
    }

    public get inputMainTitle () {
        return $('#edit-settings-label');
    }

    public get inputTitle () {
        return $('#edit-settings-block-form-field-content-0-subform-field-accordion-item-0-title');
    }

    public get inputContent () {
        return $('.ck-content');
    }

    public get btnAddBlock () {
        return $('#edit-actions-submit');
    }

    public get configBlock () {
        return $('.ui-draggable-handle');
    }

    public get successMsg () {
        return $('.mf-alert__container--success');
    }
        
    public get accordionBtn () {
        return $('#accordion-title');
    }

    public get accordionElement () {
        return $('div[data-analytics-component-type="accordion"]');
    }

    public get inputID () {
        return $('#edit-settings-block-form-field-id-0-value');
    }


    /**
     * Helper methods to create accordion Component
     */

    public async createAccordion(mainTitle: string, title: string, content: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputMainTitle).setValue(mainTitle);
        (await this.inputTitle).scrollIntoView();
        (await this.inputTitle).setValue(title);
        (await this.inputContent).setValue(content);
        await browser.pause(1500);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    //This method is to facillitate a test from another component
    public async createAccordionWithID(mainTitle: string, title: string, content: string, jumpID: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputMainTitle).setValue(mainTitle);
        (await this.inputTitle).scrollIntoView();
        (await this.inputTitle).setValue(title);
        (await this.inputContent).setValue(content);
        await browser.pause(1500);
        (await this.inputID).scrollIntoView();
        (await this.inputID).setValue(jumpID);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

}

export default new AccordionBlockPage();
