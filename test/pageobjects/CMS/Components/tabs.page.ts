import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TabsBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout () {
        return $('#edit-submit');
    }

    public get inputTitle () {
        return $('#edit-settings-label');
    }

    public get inputLabel () {
        return $('#edit-settings-block-form-field-content-0-subform-field-label-0-value');
    }

    public get inputName () {
        return $('#edit-settings-block-form-field-content-0-subform-field-tabs-0-tab-group-name');
    }

    public get inputContent () {
        return $('.ck-content');
    }

    public get btnAddTabs () {
        return $('#edit-settings-block-form-field-content-add-more');
    }

    //second tab area
    public get inputLabel1 () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-label-0-value"]');
    }

    public get inputName1 () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-tabs-0-tab-group-name"]');
    }

    public get inputContent1 () {
        return $$('.ck-content')[1];
    }

    public get btnAddBlock () {
        return $('#edit-actions-submit');
    }

    public get successMsg () {
        return $('.mf-alert__container--success');
    }

    public get tabElement () { 
        return $('.mf-tabs');
    }

    public get tabPanel () {
        return $$('#tab-panel-0');
    }

    public get configBlock () {
        return $('.ui-draggable-handle');
    }

    /**
     * Helper methods to create tabs Component
     */

    public async createTab(title: string, label: string, name: string, content: string) {
        await browser.pause(3000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed({timeout:2000});
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        (await this.inputLabel).scrollIntoView();
        (await this.inputLabel).setValue(label);
        (await this.inputName).scrollIntoView();
        (await this.inputName).setValue(name);
        (await this.inputContent).setValue(content);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed({timeout:2500});
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(2000);
    }

    public async createMultiTab(title: string, label: string, name: string, content: string, label1: string, name1: string, content1: string) {
        await browser.pause(3000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed({timeout:2000});
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.inputLabel).scrollIntoView();
        await (await this.inputLabel).setValue(label);
        await (await this.inputName).scrollIntoView();
        await (await this.inputName).setValue(name);
        await (await this.inputContent).setValue(content);
        await (await this.btnAddTabs).scrollIntoView();
        await (await this.btnAddTabs).click();
        await (await this.inputLabel1).waitForDisplayed({timeout:3000});
        await (await this.inputLabel1).setValue(label1);
        await (await (this.inputName1)).scrollIntoView();
        await (await this.inputName1).setValue(name1);
        await (await this.inputContent1).setValue(content1);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed({timeout:2500});
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(2000);
    }

   
}

export default new TabsBlockPage();
