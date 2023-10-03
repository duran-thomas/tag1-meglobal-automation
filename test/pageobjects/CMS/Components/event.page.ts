import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class EventBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get adminTitle() {
        return $('#edit-settings-label');
    }

    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get btnAddEvent() {
        return $('.add-more-button-event');
    }

    public get linkAddEventList() {
        return $('.add-more-button-events-list');
    }

    //event
    public get dropdownTemplate() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-event-template"]');
    }

    public get checkboxFeatured() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-featured-value"]');
    }

    public get checkboxStroke() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-stroke-value"]');
    }

    public get inputEventID() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-event-id-0-value"]');
    }

    public get textareaNoResults() {
        return $('.ck-editor__editable');
    }

    public get inputLimit() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-limit-0-value"]');
    }

    public get dropdownDepartment() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-department"]');
    }

    public get dropdownEventType() {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-event-type"]');
    }

    // public get () {
    //     return $('');
    // }

    // public get () {
    //     return $('');
    // }

    // public get () {
    //     return $('');
    // }

    public get btnAddBlock() {
        return $('#edit-actions-submit');
    }

    public get configBlock() {
        return $('.ui-draggable-handle');
    }

    public get successMsg() {
        return $('.mf-alert__container--success');
    }

    public get eventElement() {
        return $('.mf-event');
    }

    public get stringDate() {
        return $('p.grid:nth-child(1)')
    }

    public get timeElements() {
        return $$('time.block');
    }

    public get linkMoreAboutEvent() {
        return $('a[data-analytics-click-text="More About Event"]')
    }

    public get testEventTitle() {
        return $('a.text-gray-700').getAttribute('data-analytics-click-text');
    }

    public get hybridTextElement() {
        return $('.mf-text-body-4-serif');
    }

    /**
     * Helper methods to create Event Component
     */

    public async createEvent(title: string, eventID: string) {
        await browser.pause(4000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.adminTitle).setValue(title);
        await (await this.btnAddEvent).click();
        await (await this.inputEventID).waitForExist();
        await (await this.inputEventID).scrollIntoView();
        await (await this.inputEventID).setValue(eventID);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createEventList(title: string) {
        await browser.pause(4000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.adminTitle).setValue(title);
        await (await this.dropdownToggle).click();
        await (await this.linkAddEventList).click();
        await (await this.dropdownTemplate).waitForExist();
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createHybridEvent(title: string, eventID: string) {
        await browser.pause(4000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.adminTitle).setValue(title);
        await (await this.btnAddEvent).click();
        await (await this.dropdownTemplate).waitForExist();
        await (await this.dropdownTemplate).scrollIntoView();
        await (await this.dropdownTemplate).selectByVisibleText('card');
        await (await this.checkboxFeatured).click();
        await (await this.checkboxStroke).click();
        await (await this.inputEventID).setValue(eventID);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createEmptyEvent(title: string, eventID: string, text: string) {
        await browser.pause(4000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.adminTitle).setValue(title);
        await (await this.btnAddEvent).click();
        await (await this.inputEventID).waitForExist();
        await (await this.inputEventID).scrollIntoView();
        await (await this.inputEventID).setValue(eventID);
        await (await this.textareaNoResults).setValue(text);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createEmptyEventList(title: string, text: string) {
        await browser.pause(4000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.adminTitle).setValue(title);
        await (await this.dropdownToggle).click();
        await (await this.linkAddEventList).click();
        await (await this.dropdownTemplate).waitForExist();
        await (await this.dropdownDepartment).scrollIntoView();
        await (await this.dropdownDepartment).selectByVisibleText('Montefiore Einstein Center for Heart and Vascular Care');
        await (await this.dropdownEventType).selectByVisibleText('Support Groups');
        await (await this.textareaNoResults).setValue(text);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    
}

export default new EventBlockPage();
