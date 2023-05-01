import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class QuotesBlockPage extends Page {
    /**
     * define selectors using getter methods
     */
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

    //audio and styling dropdown to be added as needed

    public get dropdownAudio () {
        return $('#edit-field-audio')
    }

    public get btnAddQuote () {
        return $('edit-settings-block-form-field-content-add-more');
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

    /**
     * Helper methods to create Quotes Component
     */
    public async openQuoteBlock() {
        
    }

    public async completeWithBorderNoAudio() {
        
    }

    public async completeNoBorder() {
        
    }

    public async completeWithAudioAndTranscript() {
        
    }

    public async completeWithAudioNoTranscript() {
        
    }

}

export default new QuotesBlockPage();
