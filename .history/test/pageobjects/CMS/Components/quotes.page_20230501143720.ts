import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class QuotesBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout () {
        return $('#edit-settings-block-form-field-content-widget-0-subform-group-styling');
    }

    public get inputTitle () {
        return $('#edit-settings-label');
    }

    public get inputQuote () {
        return $('#edit-settings-block-form-field-content-0-subform-field-quote-0-value');
    }

    public get inputAuthor () {
        return $('#edit-settings-block-form-field-content-0-subform-field-author-0-value');
    }

    public get inputAuthorTitle () {
        return $('#edit-settings-block-form-field-content-0-subform-field-author-title-0-value');
    }

    public get dropdownAudio () {
        return $('#edit-field-audio');
    }

    public get btnEntity () {
        return $('#edit-settings-block-form-field-content-0-subform-field-audio-entity-browser-entity-browser-open-modal');
    }

    //entity modal elements start

    public get btnBrowse () {
        return $('#edit-inline-entity-form-field-media-audio-file-0-upload');
    }

    public get inputTranscript () {
        return $('#edit-inline-entity-form-field-transcript-0-value');
    }


    public get btnSaveAudio () {
        return $('#edit-submit');
    }
    //'choose existing audio elements will be added when necessary

    //entity modal elements end

    public get checkboxShowTranscript () {
        return $('#edit-settings-block-form-field-content-0-subform-field-show-transcript-value');
    }

    public get dropdownStyling () {
        return $('#edit-settings-block-form-field-content-widget-0-subform-group-styling');
    }

    public get checkboxShowBorder () {
        return $('#edit-settings-block-form-field-content-0-subform-field-show-border-value');
    }

    public get inputExtraStylingClasses () {
        return $('#edit-settings-block-form-field-content-0-subform-field-extra-classes-0-value');
    }

    public get btnAddQuote () {
        return $('#edit-settings-block-form-field-content-add-more');
    }

    public get btnColumnCount () {
        return $('#edit-settings-block-form-field-column-count-0-value');
    }

    public get inputExtraClasses () {
        return $('#edit-settings-block-form-field-extra-classes-0-value');
    }

    public get inputID () {
        return $('#edit-settings-block-form-field-id-0-value');
    }

    public get btnAddBlock () {
        return $('#edit-actions-submit');
    }

    public get borderElement () {
        return $('.mf-quotes--border');
    }

    /**
     * Helper methods to create Quotes Component
     */

    public async completeWithBorderNoAudio(title: string, quote: string, author: string, authorTitle: string) {
        (await this.inputTitle).setValue(title);
        (await this.inputQuote).setValue(quote);
        (await this.inputAuthor).setValue(author);
        (await this.inputAuthorTitle).setValue(authorTitle);
        (await this.dropdownStyling).scrollIntoView();
        (await this.dropdownStyling).click();
        (await this.checkboxShowBorder).click();
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).click();
    }

    public async completeNoBorder() {
        
    }

    public async completeWithAudioAndTranscript() {
        
    }

    public async completeWithAudioNoTranscript() {
        
    }

}

export default new QuotesBlockPage();
