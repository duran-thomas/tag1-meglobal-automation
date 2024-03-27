import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AccordionBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputMainTitle() {
        return $('#edit-settings-label');
    }

    public get inputTitle() {
        return $('#edit-settings-block-form-field-content-0-subform-field-rich-accordion-item-0-title');
    }

    public get inputContent() {
        return $('div[role="textbox"]');
    }

    public get btnAddBlock() {
        return $('#edit-actions-submit');
    }

    public get configBlock() {
        return $('.ui-draggable-handle');
    }

    public get successMsg() {
        return $('.mf-alert__container--success');
    }

    public get accordionBtn() {
        return $('#accordion-title');
    }

    public accordionElement(id: string) {
        return $(`#${id} div[data-analytics-component-type="accordion"]`);
    }

    public get inputID() {
        return $('#edit-settings-block-form-field-id-0-value');
    }


    /**
     * Helper methods to create accordion Component
     */

    public async createAccordion(mainTitle: string, title: string, content: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputMainTitle).setValue(mainTitle);
        await (await this.inputTitle).scrollIntoView();
        await (await this.inputTitle).setValue(title);
        await (await this.inputContent).setValue(content);
        await browser.pause(1500);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    //This method is to facillitate a test from another component
    public async createAccordionWithID(mainTitle: string, title: string, content: string, jumpID: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputMainTitle).setValue(mainTitle);
        await (await this.inputTitle).scrollIntoView();
        await (await this.inputTitle).setValue(title);
        await (await this.inputContent).setValue(content);
        await browser.pause(1500);
        await (await this.inputID).scrollIntoView();
        await (await this.inputID).setValue(jumpID);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

}

export default new AccordionBlockPage();
