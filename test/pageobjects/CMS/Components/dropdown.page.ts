import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DropdownBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputTitle() {
        return $('#edit-settings-label');
    }

    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get linkAddDropdownList() {
        return $('.add-more-button-dropdown-list');
    }

    public get inputTriggerText() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-trigger-text-0-value"]')
    }

    public get inputURL() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-linked-list-item-0-uri"]');
    }

    public get inputLinkText() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-linked-list-item-0-title"]');
    }

    public get dropdownLinkAttributes() {
        return $('details[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-linked-list-item-0-link-attributes"]')
    }

    public get dropdownTarget() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-linked-list-item-0-link-attributes-target"]');
    }


    public get inputTriggerText1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-trigger-text-0-value"]')
    }

    public get inputURL1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-linked-list-item-0-uri"]');
    }

    public get inputLinkText1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-linked-list-item-0-title"]');
    }

    public get dropdownLinkAttributes1() {
        return $('details[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-linked-list-item-0-link-attributes"]')
    }

    public get dropdownTarget1() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-linked-list-item-0-link-attributes-target"]');
    }


    public get dropdownStyling() {
        return $('details[data-drupal-selector="edit-settings-block-form-field-content-widget-0-subform-group-styling"]');
    }

    public get dropdownSize() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-size"]');
    }

    public get inputMaxHeight() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-max-height-0-value"]');
    }

    public get dropdownMobileListPosition() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-mobile-list-position"]');
    }

    public get dropdownDesktopListPosition() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-desktop-list-position"]');
    }

    public get inputVerticalOffset() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-list-vertical-offset-0-value"]');
    }

    public get inputHorizontalOffset() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-list-horizontal-offset-0-value"]');
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

    public dropdownElement(id:string) {
        return $(`#${id} .mf-button--tertiary`);
    }

    public get dropdownElements() {
        return $$('.mf-button--tertiary');
    }

    public duckDuckItem(id:string) {
        return $(`#${id} .mf-dropdown__link[href="https://duckduckgo.com/"]`);
    }

    public dropdownElement1(id:string) {
        return $(`#${id} button[data-analytics-click-text="Dropdown Trigger 1"]`)
    }

    public wikiItem(id:string) {
        return $(`#${id} .mf-dropdown__link[href="https://wikipedia.org/"]`);
    }


    /**
     * Helper methods to create Carousel Component
     */

    public async createDropdownItem(title: string, triggerText: string, url: string, linkText: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await browser.pause(2000); //explicit waits seem to be necessary here
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddDropdownList).click();
        await (await this.inputTriggerText).setValue(triggerText);
        await (await this.inputURL).setValue(url);
        await (await this.inputLinkText).scrollIntoView();
        await (await this.inputLinkText).setValue(linkText);
        await browser.pause(1000); //explicit waits seem to be necessary here
        await (await this.dropdownLinkAttributes).click();
        await (await this.dropdownTarget).selectByIndex(1);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createDropdownMultiItem(title: string, triggerText: string, url: string, linkText: string, triggerText1: string, url1: string, linkText1: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await browser.pause(2000); //explicit waits seem to be necessary here
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddDropdownList).click();
        await (await this.inputTriggerText).setValue(triggerText);
        await (await this.inputURL).setValue(url);
        await (await this.inputLinkText).scrollIntoView();
        await (await this.inputLinkText).setValue(linkText);
        await browser.pause(1000); //explicit waits seem to be necessary here
        await (await this.dropdownLinkAttributes).click();
        await (await this.dropdownTarget).selectByIndex(1);
        //add second menu item
        await (await this.dropdownToggle).scrollIntoView();
        await browser.pause(3000); //explicit waits seem to be necessary here
        await (await this.dropdownToggle).click();
        await (await this.linkAddDropdownList).click();
        await (await this.inputTriggerText1).setValue(triggerText1);
        await (await this.inputURL1).setValue(url1);
        await (await this.inputLinkText1).scrollIntoView();
        await (await this.inputLinkText1).setValue(linkText1);
        await browser.pause(1000); //explicit waits seem to be necessary here
        await (await this.dropdownLinkAttributes1).click();
        await (await this.dropdownTarget1).selectByIndex(2);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async navToStyling() {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddDropdownList).click();
        await browser.pause(2000);
        await (await this.dropdownStyling).scrollIntoView();
        await (await this.dropdownStyling).click();
        await browser.pause(3000);
    }
}

export default new DropdownBlockPage();
