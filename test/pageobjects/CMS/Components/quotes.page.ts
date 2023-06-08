import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class QuotesBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout () {
        return $('#edit-submit');
    }

    public get btnSelectEntities () {
        return $('#edit-field-content-0-subform-field-audio-entity-browser-entity-browser-open-modal');
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

    //entity iframe elements star
    public get entityIframe () {
        return $("iframe[name='entity_browser_iframe_audio_media_browser']");
    }
    //entity iframe elements end


    //entity modal elements start

    public get btnBrowse () {
        return $("input[type='file']");
    }

    public get inputTranscript () {
        return $('#edit-inline-entity-form-field-transcript-0-value');
    }


    public get btnSaveAudio () {
        return $('input[value="Save audio"]');
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

    public get quoteElement () {
        return $('.mf-quotes__text');
    }

    public get quoteShowTranscriptElement () {
        return $("button[data-analytics-click-text='Show Transcript']");
    }

    public get configBlock () {
        return $('.ui-draggable-handle');
    }

    /**
     * Helper methods to create Quotes Component
     */

    public async completeWithBorderNoAudio(title: string, quote: string, author: string, authorTitle: string) {
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
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
        await browser.pause(3000);
    }

    public async completeWithoutBorder(title: string, quote: string, author: string, authorTitle: string) {
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        (await this.inputQuote).setValue(quote);
        (await this.inputAuthor).setValue(author);
        (await this.inputAuthorTitle).setValue(authorTitle);
        (await this.dropdownStyling).scrollIntoView();
        (await this.dropdownStyling).click();
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async completeNoBorder() {
        
    }

    public async completeWithAudioAndTranscript(title: string, quote: string, author: string, authorTitle: string, remoteAudioFilePath: string, transcript: string) {
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        (await this.inputQuote).setValue(quote);
        (await this.inputAuthor).setValue(author);
        (await this.inputAuthorTitle).setValue(authorTitle);
        (await this.dropdownAudio).scrollIntoView();
        (await this.dropdownAudio).click();

        (await (await $("input[value='Select entities']")).click());
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);

        await (await this.btnBrowse).setValue(remoteAudioFilePath);
        (await this.inputTranscript).setValue(transcript);
        await browser.pause(3000); //explicit waits seem to be necessary here
        await (await this.btnSaveAudio).waitForClickable();
        await (await this.btnSaveAudio).click();
        await browser.pause(3000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        (await this.checkboxShowTranscript).waitForClickable();
        (await this.checkboxShowTranscript).click();
        await browser.pause(3000); //explicit waits seem to be necessary here
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).click();    
        await browser.pause(3000);   
    }

    public async completeWithAudioNoTranscript(title: string, quote: string, author: string, authorTitle: string, remoteAudioFilePath: string) {
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        (await this.inputQuote).setValue(quote);
        (await this.inputAuthor).setValue(author);
        (await this.inputAuthorTitle).setValue(authorTitle);
        (await this.dropdownAudio).scrollIntoView();
        (await this.dropdownAudio).click();

        (await (await $("input[value='Select entities']")).click());
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);

        await (await this.btnBrowse).setValue(remoteAudioFilePath);
        await browser.pause(3000); //explicit waits seem to be necessary here
        await (await this.btnSaveAudio).waitForClickable();
        await (await this.btnSaveAudio).click();
        await browser.pause(3000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await browser.pause(3000); //explicit waits seem to be necessary here
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).click(); 
        await browser.pause(3000);         
    }

    public async navToStyling() {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.dropdownStyling).scrollIntoView();
        (await this.dropdownStyling).click();
        await browser.pause(2000);         
    }

}

export default new QuotesBlockPage();
