import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FreeformBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputAdminTitle() {
        return $('#edit-settings-label');
    }

    public get inputHeadline() {
        return $('#edit-settings-block-form-field-headline-0-headline');
    }

    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get linkAddTypeahead() {
        return $('.add-more-button-typeahead');
    }

    //Typeahead block
    public get inputTypeLabel() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-label-0-value-"]');
    }

    public get inputTypePlaceholder() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-placeholder-0-value-"]');
    }

    public get dropdownTypeEndpoint() {
        return $('select[id^="edit-settings-block-form-field-content-0-subform-field-typeahead-config-0-endpoint-"]');
    }

    public get dropdownTypeaheadType() {
        return $('select[id^="edit-settings-block-form-field-content-0-subform-field-typeahead-config-0-config-type-"]');
    }

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

    public get freeformHeadline() {
        return $('h3=Diagnostic keyword search page');
    }

    public get resultList() {
        return $$('li.mf-typeahead__dropdown__item');
    }

    public get typeaheadSearch() {
        return $('input[id^="meda-typeahead-"]');
    }
    public get inputSearch() {
        return $('input[placeholder="Keyword(s)"]');
    }

    public get btnSearch(){
        return $('div button.mf-top-bar__button--search')
    }

    public get btnNavSearch(){
        return $('div button.mf-top-bar__button--search')
    }

    public get inputNavSearch(){
        return $('#text-input-typeahead')
    }

    /**
     * Helper methods to create freeform typeahead Component
     */

    public async createFreeformTypeahead(adminTitle: string, headline: string, label: string, placeholder: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddTypeahead).click();
        await (await this.inputTypeLabel).waitForDisplayed({timeout:8000});
        await (await this.inputTypeLabel).setValue(label);
        await (await this.inputTypePlaceholder).setValue(placeholder);
        await (await this.dropdownTypeEndpoint).selectByVisibleText('Clinical categories');
        await (await this.dropdownTypeaheadType).waitForDisplayed({timeout:6000});
        await (await this.dropdownTypeaheadType).selectByVisibleText('Layout page');
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    // public async typeSearch(text: string) {
    //     (await this.typeaheadSearch).setValue(text);

    // }

    
}

export default new FreeformBlockPage();
