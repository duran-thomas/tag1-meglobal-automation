import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class IconListBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputTitle() {
        return $('#edit-settings-label');
    }

    public get dropdownIcon() {
        return $('#edit-settings-block-form-field-content-0-subform-field-icon-list');
    }

    public get inputText() {
        return $('#edit-settings-block-form-field-content-0-subform-field-icon-list-item-0-text');
    }

    public get dropdownItemIcon() {
        return $('#edit-settings-block-form-field-content-0-subform-field-icon-list-item-0-icon');
    }

    public get btnAddAnother() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-icon-list-item-add-more"]');
    }


    //multi fields
    public get inputText1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-icon-list-item-1-text"]');
    }

    public get dropdownItemIcon1() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-icon-list-item-1-icon"]');
    }

    public get inputText2() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-icon-list-item-2-text"]');
    }

    public get dropdownItemIcon2() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-icon-list-item-2-icon"]');
    }

    public get inputText3() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-icon-list-item-3-text"]');
    }

    public get dropdownItemIcon3() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-icon-list-item-3-icon"]');
    }

    public get inputText4() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-icon-list-item-4-text"]');
    }

    public get dropdownItemIcon4() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-icon-list-item-4-icon"]');
    }

    public get inputText5() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-icon-list-item-5-text"]');
    }

    public get dropdownItemIcon5() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-icon-list-item-5-icon"]');
    }
    //multi end


    public get dropdownStyling() {
        return $('#edit-settings-block-form-field-content-widget-0-subform-group-styling');
    }

    public get dropdownVariant() {
        return $('#edit-settings-block-form-field-content-0-subform-field-variant');
    }

    public get dropdownSite() {
        return $('#edit-settings-block-form-field-content-0-subform-field-site');
    }

    public get dropdownSize() {
        return $('#edit-settings-block-form-field-content-0-subform-field-size');
    }

    public get dropdownAlignment() {
        return $('#edit-settings-block-form-field-content-0-subform-field-alignment');
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

    public iconListElement(id: string) {
        return $(`#${id} .mf-icon-list`);
    }

    public get iconStyle() {
        return $('.mf-icon-list__icon > span');
    }

    public listItem(id: string) {
        return $(`#${id} .mf-icon-list__item`);
    }

    public get lastItem() {
        return $(`div .layout-content li:nth-child(6)`);
    }


    /**
     * Helper methods to create Icon List Component
     */

    public async createIconList(title: string, text: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.inputText).scrollIntoView();
        await (await this.inputText).setValue(text);
        await (await this.dropdownItemIcon).selectByIndex(1);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createMultiIconList(title: string, text: string, text1: string, text2: string, text3: string, text4: string, text5: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.dropdownIcon).selectByIndex(0);
        await browser.pause(2000);
        await (await this.inputText).scrollIntoView();
        await (await this.inputText).setValue(text);
        await (await this.dropdownItemIcon).selectByIndex(1);
        await browser.pause(2000);
        await (await this.btnAddAnother).click();
        await (await this.inputText1).waitForDisplayed();
        await (await this.inputText1).setValue(text1);
        await (await this.dropdownItemIcon1).selectByIndex(2);
        await browser.pause(2000);
        await (await this.btnAddAnother).click();
        await (await this.inputText2).waitForDisplayed();
        await (await this.inputText2).setValue(text2);
        await (await this.dropdownItemIcon2).selectByIndex(3);
        await browser.pause(2000);
        await (await this.btnAddAnother).click();
        await (await this.inputText3).waitForDisplayed();
        await (await this.inputText3).setValue(text3);
        await (await this.dropdownItemIcon3).selectByIndex(4);
        await browser.pause(2000);
        await (await this.btnAddAnother).click();
        await (await this.inputText4).waitForDisplayed();
        await (await this.inputText4).setValue(text4);
        await (await this.dropdownItemIcon4).selectByIndex(5);
        await browser.pause(2000);
        await (await this.btnAddAnother).click();
        await (await this.inputText5).waitForDisplayed();
        await (await this.inputText5).setValue(text5);
        await (await this.dropdownItemIcon5).selectByIndex(0);
        await browser.pause(2000);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async submitTest(title: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.pause(3000);
    }


    public async navToStyling() {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.dropdownStyling).scrollIntoView();
        await (await this.dropdownStyling).click();
        await browser.pause(3000);

    }
}

export default new IconListBlockPage();
