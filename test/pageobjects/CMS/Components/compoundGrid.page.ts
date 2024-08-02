import Page from "../Login/page";

class CompoundGridPage extends Page {
    public get compoundGridLayout() {
        return $$(".block-inline-blockcompound-grid")[0];
    }

    public get firstCompoundGridImage() {
        return $$(
            ".block-inline-blockcompound-grid .mf-compound-grid__main-item"
        )[0];
    }

    public get configBlock() {
        return $(".ui-draggable-handle");
    }

    public get btnSaveLayout() {
        return $("#edit-submit");
    }

    public get btnAddBlock() {
        return $("#edit-actions-submit");
    }

    public get inputAdminTitle() {
        return $('input[data-drupal-selector="edit-settings-label"]');
    }

    public get textBoxHeadline() {
        return $$('div[role="textbox"]')[0];
    }

    public get textBoxEyebrow() {
        return $$('div[role="textbox"]')[1];
    }

    public get textBoxContent() {
        return $$('div[role="textbox"]')[2];
    }

    public get entityIframe() {
        return $("#entity_browser_iframe_image_and_video");
    }

    public get btnBrowse() {
        return $("input[type='file']");
    }

    public get inputAltText() {
        return $(
            'input[id^="edit-inline-entity-form-field-media-image-0-alt-"]'
        );
    }

    public get btnSaveImage() {
        return $("#edit-submit");
    }

    public get dropdownMedia() {
        return $$("#edit-field-media-entity")[0];
    }

    public get dropdownMedia1() {
        return $('details[data-drupal-selector^="edit-field-media-entity-"]');
    }

    public get dropdownMedia2() {
        return $('details[data-drupal-selector^="edit-field-media-entity-"]');
    }

    public get btnSaveParagraph() {
        return $(
            'input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-card-content-form-0-actions-ief-add-save"]'
        );
    }

    public get btnSaveParagraph1() {
        return $(
            'input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-card-content-form-1-actions-ief-add-save"'
        );
    }
    public get btnSaveParagraph2() {
        return $(
            'input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-card-content-form-2-actions-ief-add-save"'
        );
    }

    public get btnCreateParagraph() {
        return $(
            'input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-card-content-actions-ief-add"]'
        );
    }

    // public async createFirstParagraph(headline: string, eyebrow: string, content: string, remoteFilePath: string, altText: string,){
    public async createFirstParagraph(
        headline: string,
        eyebrow: string,
        content: string,
        remoteFilePath: string,
        altText: string
    ) {
        //Paragraph 1
        await (await this.textBoxHeadline).scrollIntoView();
        await (await this.textBoxHeadline).setValue(headline);
        await (await this.textBoxEyebrow).scrollIntoView();
        await (await this.textBoxEyebrow).setValue(eyebrow);
        await (await this.textBoxContent).scrollIntoView();
        await (await this.textBoxContent).setValue(content);
        await browser.pause(1000);
        await (await this.dropdownMedia).scrollIntoView();
        await (await this.dropdownMedia).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(10000); //explicit waits seem to be necessary here
        await (await this.inputAltText).scrollIntoView();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await (await this.btnSaveParagraph).click();
        await browser.pause(2000);
        //Paragraph 2
        await (await this.btnCreateParagraph).click();
        await browser.pause(2000);
        await (await this.textBoxHeadline).scrollIntoView();
        await (await this.textBoxHeadline).setValue(`${headline} 1`);
        await (await this.textBoxEyebrow).scrollIntoView();
        await (await this.textBoxEyebrow).setValue(`${eyebrow} 1`);
        await (await this.textBoxContent).scrollIntoView();
        await (await this.textBoxContent).setValue(`${content} 1`);
        await browser.pause(1000);
        await (await this.dropdownMedia1).scrollIntoView();
        await (await this.dropdownMedia1).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(10000); //explicit waits seem to be necessary here
        await (await this.inputAltText).scrollIntoView();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await (await this.btnSaveParagraph1).click();
        await browser.pause(2000);
        //Paragraph 3
        await (await this.btnCreateParagraph).click();
        await browser.pause(2000);
        await (await this.textBoxHeadline).scrollIntoView();
        await (await this.textBoxHeadline).setValue(`${headline} 2`);
        await (await this.textBoxEyebrow).scrollIntoView();
        await (await this.textBoxEyebrow).setValue(`${eyebrow} 2`);
        await (await this.textBoxContent).scrollIntoView();
        await (await this.textBoxContent).setValue(`${content} 2`);
        await browser.pause(1000);
        await (await this.dropdownMedia2).scrollIntoView();
        await (await this.dropdownMedia2).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(10000); //explicit waits seem to be necessary here
        await (await this.inputAltText).scrollIntoView();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await (await this.btnSaveParagraph2).click();
        await browser.pause(2000);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);

    }
}

export default new CompoundGridPage();
