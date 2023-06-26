import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TabsBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputTitle() {
        return $('#edit-settings-label');
    }

    public get inputLabel() {
        return $('#edit-settings-block-form-field-label-0-value');
    }

    public get inputName() {
        return $('#edit-settings-block-form-field-content-0-subform-field-title-0-value');
    }

    public get inputContent() {
        return $('.ck-content');
    }

    public get btnAddTabs() {
        return $('div[data-drupal-selector="edit-settings-block-form-field-content-add-more"]');
    }

    //second tab area
    
    public get inputName1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-title-0-value"]');
    }

    public get inputContent1() {
        return $$('.ck-content')[1];
    }

    public get inputName2() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-2-subform-field-title-0-value"]');
    }

    public get inputContent2() {
        return $$('.ck-content')[2];
    }

    public get inputName3() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-3-subform-field-title-0-value"]');
    }

    public get inputContent3() {
        return $$('.ck-content')[3];
    }

    public get btnAddBlock() {
        return $('#edit-actions-submit');
    }

    public get successMsg() {
        return $('.mf-alert__container--success');
    }

    public get tabElement() {
        return $('.mf-tabs');
    }

    public get tabPanel() {
        return $$('#tab-panel-0');
    }

    public get configBlock() {
        return $('.ui-draggable-handle');
    }

    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get linkRichText() {
        return $('.add-more-button-rich-text')
    }

    /**
     * Helper methods to create tabs Component
     */

    public async createTab(title: string, label: string, name: string, content: string) {
        await browser.pause(3000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed({ timeout: 2000 });
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.inputLabel).scrollIntoView();
        await (await this.inputLabel).setValue(label);
        await (await this.inputName).scrollIntoView();
        await (await this.inputName).setValue(name);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkRichText).click();
        await (await this.inputContent).waitForDisplayed({timeout:4000});
        await (await this.inputContent).setValue(content);
        await (await this.btnAddBlock).scrollIntoView({ block: 'center' });
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed({ timeout:4000 });
        await (await this.btnSaveLayout).scrollIntoView({ block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(2000);
    }

    public async createMultiTab(title: string, label: string, name: string, content: string, name1: string, content1: string, name2: string, content2: string, name3: string, content3: string) {
        await browser.pause(3000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed({ timeout: 2000 });
        await browser.switchToFrame(iframe);
        
        await (await this.inputTitle).setValue(title);
        await (await this.inputLabel).scrollIntoView();
        await (await this.inputLabel).setValue(label);

        await (await this.inputName).scrollIntoView();
        await (await this.inputName).setValue(name);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkRichText).click();
        await (await this.inputContent).waitForDisplayed({timeout:5000});
        await (await this.inputContent).setValue(content);
        await (await this.btnAddTabs).click();
        await (await this.inputName1).waitForDisplayed({timeout:4000});
        await (await this.inputName1).setValue(name1);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkRichText).click();
        await browser.pause(2000); //wait for element to exist to count in index
        await (await this.inputContent1).waitForExist({timeout:5000});
        await (await this.inputContent1).setValue(content1);
        await (await this.btnAddTabs).click();
        await (await this.inputName2).waitForDisplayed({timeout:4000});
        await (await this.inputName2).setValue(name2);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkRichText).click();
        await browser.pause(2000); //wait for element to exist to count in index
        await (await this.inputContent2).waitForExist({timeout:5000});
        await (await this.inputContent2).setValue(content2);
        await (await this.btnAddTabs).click();
        await (await this.inputName3).waitForDisplayed({timeout:4000});
        await (await this.inputName3).setValue(name3);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkRichText).click();
        await browser.pause(2000); //wait for element to exist to count in index
        await (await this.inputContent3).waitForExist({timeout:5000});
        await (await this.inputContent3).setValue(content3);

        await (await this.btnAddBlock).scrollIntoView({ block: 'center' });
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed({ timeout:4000 });
        await (await this.btnSaveLayout).scrollIntoView({ block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(2000);
    }


}

export default new TabsBlockPage();
