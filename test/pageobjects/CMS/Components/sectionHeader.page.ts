import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SectionHeaderBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputTitle() {
        return $('#edit-settings-label');
    }

    public get inputHeadline() {
        return $$('.ck-content')[0];
    }

    public get inputContent() {
        return $$('.ck-content')[1];
    }

    public get btnAddButtons() {
        return $('.add-more-button-buttons');
    }

    public get inputButtonText() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-actions-0-subform-field-buttons-0-title"]');
    }

    public get inputButtonURL() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-actions-0-subform-field-buttons-0-uri"]');
    }

    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get btnAddLinks() {
        return $('.add-more-button-links');
    }

    public get inputLinkText() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-actions-1-subform-field-links-0-title"]');
    }

    public get inputLinkURL() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-actions-1-subform-field-links-0-uri"]');
    }

    public get dropdownStyling() {
        return $('#edit-settings-block-form-field-content-widget-0-subform-group-styling');
    }

    public get checkboxMinimal() {
        return $("#edit-settings-block-form-field-content-0-subform-field-minimal-value");
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

    public get sectionHeaderElement() {
        return $('.mf-section-header');
    }

    /**
     * Helper methods to create Section Header Component
     */


    public async createSectionHeader(title: string, headline: string, content: string, btnText: string, btnUrl: string, linkText: string, linkUrl: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content)
        await browser.pause(3000); //explicit wait seems necessary here
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.btnAddButtons).click();
        await (await this.inputButtonText).scrollIntoView();
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputButtonURL).setValue(btnUrl);
        await browser.pause(3000); //explicit wait seems necessary here
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.btnAddLinks).click();
        await (await this.inputLinkText).scrollIntoView();
        await (await this.inputLinkText).setValue(linkText);
        await (await this.inputLinkURL).setValue(linkUrl);
        await browser.pause(3000); //explicit wait seems necessary here
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async navToStyling() {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await browser.pause(3000);
        await (await this.dropdownStyling).scrollIntoView();
        await (await this.dropdownStyling).click();
        await (await this.checkboxMinimal).scrollIntoView()
        await browser.pause(3000);
    }

}

export default new SectionHeaderBlockPage();
