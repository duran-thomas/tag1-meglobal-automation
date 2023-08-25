import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CarouselBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputTitle() {
        return $('#edit-settings-label');
    }

    public get btnAddCardFeature() {
        return $('.add-more-button-card-feature');
    }

    public get btnAddCardGeneral() {
        return $('.add-more-button-card-general')
    }

    public get btnAddCardLocation() {
        return $('.add-more-button-card-location')
    }

    public get btnAddCardMyChart() {
        return $('.add-more-button-card-mychart')
    }

    public get btnAddHero() {
        return $('.add-more-button-hero')
    }

    public get btnAddImage() {
        return $('.add-more-button-image')
    }

    public get btnAddQuote() {
        return $('.add-more-button-quote')
    }

    public get btnAddBillboard() {
        return $('.add-more-button-billboard')
    }




    //content area 1 start
    public inputHeadline(index:number) {
        return $$('div[role=textbox]')[0];
    }

    public inputEyebrow(index:number) {
        return $$('div[role=textbox]')[1];
    }

    public get inputList() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-list"]');
    }

    public get inputContent() {
        return $$('div[role=textbox]')[2];
    }

    public get inputButtonText() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-buttons-0-title-"]');
    }

    public get inputURL() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-buttons-0-uri-"]');
    }

    public get inputInfo() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-info-label-0-"]');
    }

    public get dropdownImage() {
        return $('div[id^="edit-settings-block-form-field-content-0-subform-field-image-wrapper-"]');
    }

    public get btnBrowse() {
        return $("input[type='file']");
    }

    public get inputAltText() {
        return $('input[id^="edit-inline-entity-form-field-media-image-0-alt-"]');
    }

    public get btnSaveImage() {
        return $('#edit-submit');
    }
    //content area 1 end


    //content area 2 start
    // public inputHeadline1(index:number) {
    //     return $$('div[role=textbox]')[index];
    // }

    // public inputEyebrow1(index:number) {
    //     return $$('div[role=textbox]')[index];
    // }

    public get inputList1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-list-0-value"]');
    }

    public get inputContent1() {
        return $$('div[role=textbox]')[5];
    }

    public get inputButtonText1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-buttons-0-title"]');
    }

    public get inputURL1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-buttons-0-uri"]');
    }

    public get inputInfo1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-info-label-0-value"]');
    }

    public get dropdownImage1() {
        return $$('details[id^="edit-field-image-"]')[1];
    }

    public get btnBrowse1() {
        return $("input[type='file']");
    }

    public get inputAltText1() {
        return $('input[id="edit-inline-entity-form-field-media-image-0-alt"]');
    }

    public get btnSaveImage1() {
        return $('#edit-submit');
    }
    //content area 2 end


    //content area 3 start
    // public inputHeadline2(index:number) {
    //     return $$('div[role=textbox]')[index];
    // }

    // public inputEyebrow2(index:number) {
    //     return $$('div[role=textbox]')[index];
    // }

    public get inputList2() {
        return $('input[id^="edit-settings-block-form-field-content-2-subform-field-list"]');
    }

    public get inputContent2() {
        return $$('div[role=textbox]')[8];
    }

    public get inputButtonText2() {
        return $('input[id^="edit-settings-block-form-field-content-2-subform-field-buttons-0-title-"]');
    }

    public get inputURL2() {
        return $('input[id^="edit-settings-block-form-field-content-2-subform-field-buttons-0-uri-"]');
    }

    public get inputInfo2() {
        return $('input[id^="edit-settings-block-form-field-content-2-subform-field-info-label-0-"]');
    }

    public get dropdownImage2() {
        return $$('details[id^="edit-field-image-"]')[1];
    }

    public get btnBrowse2() {
        return $("input[type='file']");
    }

    public get inputAltText2() {
        return $('input[id="edit-inline-entity-form-field-media-image-0-alt"]');
    }

    public get btnSaveImage2() {
        return $('#edit-submit');
    }
    //content area 3 end


    public get dropdownStyling() {
        return $('#edit-settings-block-form-group-styling');
    }

    public get dropdownLayout() {
        return $('#edit-settings-block-form-field-layout');
    }

    public get checkboxInitialOffset() {
        return $('#edit-settings-block-form-field-initial-offset-value');
    }

    public get dropdownIncludePagination() {
        return $('#edit-settings-block-form-field-include-pagination');
    }

    public get dropdownPaginationType() {
        return $('#edit-settings-block-form-field-pagination-type');
    }

    public get dropdownIncludeControls() {
        return $('#edit-settings-block-form-field-include-controls');
    }

    public get dropdownControlsPosition() {
        return $('#edit-settings-block-form-field-controls-position');
    }

    public get dropdownControlsIcon() {
        return $('#edit-settings-block-form-field-controls-icons');
    }

    public get checkboxAnimationIntro() {
        return $('#edit-settings-block-form-field-animation-intro-value');
    }

    public get inputCarouselConfig() {
        return $('#edit-settings-block-form-field-carousel-config-0-value');
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

    public get entityIframe() {
        return $('iframe[name="entity_browser_iframe_image_browser"]');
    }

    public get carouselElement() {
        return $('.mf-carousel');
    }

    public get carouselImage() {
        return $('img[alt="Carousel Alt Text"]');
    }

    public get paginationElement() {
        return $('.mf-carousel__pagination');
    }

    public get controlElement() {
        return $$('.mf-carousel__nav-button');
    }

    public get swiperElement() {
        return $('span[aria-label="Go to slide 3"]');
    }


    /**
     * Helper methods to create Carousel Component
     */

    public async createCarousel(title: string, headline: string, eyebrow: string, list: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.pause(4000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAddCardFeature).click();
        await browser.pause(8000);
        await (await this.inputHeadline(0)).scrollIntoView();
        await (await this.inputHeadline(0)).setValue(headline);
        await (await this.inputEyebrow(1)).setValue(eyebrow);
        await (await this.inputList).setValue(list);
        await (await this.inputContent).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.inputInfo).scrollIntoView({ behavior: 'auto', block: 'center' });
        await browser.pause(2000);
        await (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnSaveImage).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }


    public async createCarouselNoPagination(title: string, headline: string, eyebrow: string, list: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.pause(4000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAddCardFeature).click();
        await browser.pause(8000);
        await (await this.inputHeadline(0)).scrollIntoView();
        await (await this.inputHeadline(0)).setValue(headline);
        await (await this.inputEyebrow(1)).setValue(eyebrow);
        await (await this.inputList).setValue(list);
        await (await this.inputContent).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.inputInfo).scrollIntoView({ behavior: 'auto', block: 'center' });
        await browser.pause(2000);
        await (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(6000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnSaveImage).click();
        await browser.pause(4000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await browser.pause(3000); //explicit waits seem to be necessary here
        await (await this.dropdownStyling).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownStyling).click();
        await browser.pause(5000);
        await (await this.dropdownIncludePagination).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownIncludePagination).selectByIndex(2);
        await (await this.btnAddBlock).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createCarouselNoControls(title: string, headline: string, eyebrow: string, list: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.pause(4000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAddCardFeature).click();
        await browser.pause(8000);
        await (await this.inputHeadline(0)).scrollIntoView();
        await (await this.inputHeadline(0)).setValue(headline);
        await (await this.inputEyebrow(1)).setValue(eyebrow);
        await (await this.inputList).setValue(list);
        await (await this.inputContent).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.inputInfo).scrollIntoView({ behavior: 'auto', block: 'center' });
        await browser.pause(2000);
        await (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(6000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnSaveImage).click();
        await browser.pause(4000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await browser.pause(3000); //explicit waits seem to be necessary here
        await (await this.dropdownStyling).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownStyling).click();
        await browser.pause(5000);
        await (await this.dropdownIncludeControls).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownIncludeControls).selectByIndex(2);
        await (await this.btnAddBlock).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView({ block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createCarouselMultiSlide(title: string, headline: string, eyebrow: string, list: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string, remoteFilePath1: string, remoteFilePath2: string) {
        await browser.pause(4000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAddCardFeature).click();
        await browser.pause(8000);
        await (await this.inputHeadline(0)).scrollIntoView();
        await (await this.inputHeadline(0)).setValue(headline);
        await (await this.inputEyebrow(1)).setValue(eyebrow);
        await (await this.inputList).setValue(list);
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.inputInfo).scrollIntoView();
        await browser.pause(2000);
        await (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(8000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(4000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(3000); //explicit waits seem to be necessary here

        await (await this.btnAddCardFeature).click();
        await browser.pause(8000);
        await (await this.inputHeadline(3)).scrollIntoView();
        await (await this.inputHeadline(3)).setValue(headline + ' 1');
        await (await this.inputEyebrow(4)).setValue(eyebrow + ' 1');
        await (await this.inputList1).setValue(list + ' 1');
        await (await this.inputContent1).scrollIntoView();
        await (await this.inputContent1).setValue(content + ' 1');
        await (await this.inputButtonText1).setValue(btnText + ' 1');
        await (await this.inputURL1).setValue(url);
        await browser.pause(2000);
        await (await this.dropdownImage1).scrollIntoView();
        await (await this.dropdownImage1).click(); //image currently not being added, selector inspection necessary
        await browser.pause(2000);
        await browser.switchToFrame(await this.entityIframe);
        await browser.pause(2000);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath1);
        await browser.pause(6000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText + ' 1');
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(4000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(3000); //explicit waits seem to be necessary here

        await (await this.btnAddCardFeature).click();
        await browser.pause(8000);
        await (await this.inputHeadline(6)).scrollIntoView();
        await (await this.inputHeadline(6)).setValue(headline) + ' 2';
        await (await this.inputEyebrow(7)).setValue(eyebrow + ' 2');
        await (await this.inputList2).setValue(list + ' 2');
        await (await this.inputContent2).scrollIntoView();
        await (await this.inputContent2).setValue(content + ' 2');
        await (await this.inputButtonText2).setValue(btnText + ' 2');
        await (await this.inputURL2).setValue(url + ' 2');
        await browser.pause(2000);
        await (await this.dropdownImage2).scrollIntoView();
        await (await this.dropdownImage2).click(); //image currently not being added, selector inspection necessary
        await browser.pause(2000);
        await browser.switchToFrame(await this.entityIframe);
        await browser.pause(2000);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath2);
        await browser.pause(6000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText + ' 2');
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(4000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(3000); //explicit waits seem to be necessary here


        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createCarouselMultiSlideAllComponents(title: string, headline: string, eyebrow: string, 
        list: string, content: string, btnText: string, url: string, remoteFilePath: string, 
        altText: string, remoteFilePath1: string, remoteFilePath2: string, remoteAudioFilePath:string, transcript:string) {
        await browser.pause(4000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAddCardFeature).click();
        await browser.pause(8000);
        await (await this.inputHeadline(0)).scrollIntoView();
        await (await this.inputHeadline(0)).setValue(headline);
        await (await this.inputEyebrow(1)).setValue(eyebrow);
        await (await this.inputList).setValue(list);
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        // await (await this.inputInfo).scrollIntoView();
        // await browser.pause(2000);
        // await (await this.dropdownImage).click();
        // // switch to the iframe
        // await browser.switchToFrame(await this.entityIframe);
        // await (await this.btnBrowse).scrollIntoView();
        // await (await this.btnBrowse).setValue(remoteFilePath);
        // await browser.pause(8000); //explicit waits seem to be necessary here
        // await (await this.inputAltText).waitForEnabled();
        // await (await this.inputAltText).setValue(altText);
        // await (await this.btnSaveImage).scrollIntoView();
        // await (await this.btnSaveImage).click();
        // await browser.pause(4000); //explicit waits seem to be necessary here
        // await browser.switchToParentFrame();
        // await browser.pause(3000); //explicit waits seem to be necessary here

        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).waitForClickable();
        await (await $('.dropbutton__toggle')).click();
        await (await this.btnAddCardGeneral).scrollIntoView();
        await (await this.btnAddCardGeneral).click();
        await browser.pause(8000);
        await (await this.inputHeadline(3)).scrollIntoView();
        await (await this.inputHeadline(3)).setValue(headline);
        await (await this.inputEyebrow(4)).setValue(eyebrow);
        await (await this.inputButtonText1).setValue(btnText + ' 1');
        await (await this.inputURL1).setValue(url);

        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).click();
        await (await this.btnAddCardLocation).scrollIntoView();
        await (await this.btnAddCardLocation).click();
        await browser.pause(3000);
        await (await $('input[id^="edit-settings-block-form-field-content-2-subform-field-location-0-target-id"]')).scrollIntoView();
        await (await $('input[id^="edit-settings-block-form-field-content-2-subform-field-location-0-target-id"]')).setValue("P0001: Montefiore Einstein Hospital, Moses Campus (131)");

        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).click();
        await (await this.btnAddCardMyChart).scrollIntoView();
        await (await this.btnAddCardMyChart).click();
        await browser.pause(8000);
        await (await this.inputHeadline(6)).scrollIntoView();
        await (await this.inputHeadline(6)).setValue(headline);
        await (await this.inputEyebrow(7)).setValue(eyebrow);
        await (await $('input[id^="edit-settings-block-form-field-content-3-subform-field-buttons-0-title-"]')).setValue(btnText + ' 1');
        await (await $('input[id^="edit-settings-block-form-field-content-3-subform-field-buttons-0-uri-"]')).setValue(url);

        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).click();
        await (await this.btnAddHero).scrollIntoView();
        await (await this.btnAddHero).click();
        await browser.pause(8000);
        await (await this.inputHeadline(9)).scrollIntoView();
        await (await this.inputHeadline(9)).setValue(headline);
        await (await this.inputEyebrow(10)).setValue(eyebrow);
        await (await $('input[id^="edit-settings-block-form-field-content-4-subform-field-buttons-0-title-"]')).setValue(btnText + ' 1');
        await (await $('input[id^="edit-settings-block-form-field-content-4-subform-field-buttons-0-uri-"]')).setValue(url);

        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).click();
        await (await this.btnAddImage).scrollIntoView();
        await (await this.btnAddImage).click();
        await browser.pause(8000);
        await (await $('div[id^="edit-settings-block-form-field-content-5-subform-field-image-wrapper"]')).scrollIntoView();
        await (await $('div[id^="edit-settings-block-form-field-content-5-subform-field-image-wrapper"]')).click();
        await browser.switchToFrame(await $$('iframe[name="entity_browser_iframe_image_browser"]')[2]);
        await (await this.btnBrowse).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnSaveImage).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(4000); //explicit waits seem to be necessary here
        await ((await $('input[id^="edit-settings-block-form-field-content-5-subform-field-link-0-uri-"]')).scrollIntoView());
        await ((await $('input[id^="edit-settings-block-form-field-content-5-subform-field-link-0-uri-"]')).setValue('https://www.wikipedia.com'));

        browser.pause(10000);

        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).click();
        await (await this.btnAddQuote).scrollIntoView();
        await (await this.btnAddQuote).click();
        await browser.pause(8000);
        await (await $('textarea[id^="edit-settings-block-form-field-content-6-subform-field-quote-0-value-"]')).scrollIntoView();
        await (await $('textarea[id^="edit-settings-block-form-field-content-6-subform-field-quote-0-value-"]')).click();
        await ((await $('input[id^="edit-settings-block-form-field-content-6-subform-field-author-0-value-"]')).scrollIntoView());
        await ((await $('input[id^="edit-settings-block-form-field-content-6-subform-field-author-0-value-"]')).setValue("Doneil Scotland"));
        await ((await $('input[id^="edit-settings-block-form-field-content-6-subform-field-author-title-0-value-"]')).scrollIntoView());
        await ((await $('input[id^="edit-settings-block-form-field-content-6-subform-field-author-title-0-value-"]')).setValue("QA TESTER"));
        await ((await $('div[id^="edit-settings-block-form-field-content-6-subform-field-audio-wrapper-"]')).scrollIntoView());
        await ((await $('div[id^="edit-settings-block-form-field-content-6-subform-field-audio-wrapper-"]')).click());
        await (await (await $("input[value='Select entities']")).click());
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        await browser.switchToFrame(await $('iframe[name="entity_browser_iframe_audio_media_browser"]'));

        await (await this.btnBrowse).setValue(remoteAudioFilePath);
        await (await $('#edit-inline-entity-form-field-transcript-0-value')).setValue(transcript);
        await browser.pause(3000); //explicit waits seem to be necessary here
        await (await $('input[value="Save audio"]')).waitForClickable();
        await (await $('input[value="Save audio"]')).click();
        await browser.pause(3000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await (await $('input[id^="edit-settings-block-form-field-content-6-subform-field-show-transcript-value-"]')).waitForClickable();
        await (await $('input[id^="edit-settings-block-form-field-content-6-subform-field-show-transcript-value-"]')).click();

        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).scrollIntoView();
        await (await $('.dropbutton__toggle')).click();
        await (await this.btnAddBillboard).scrollIntoView();
        await (await this.btnAddBillboard).click();
        await (await this.inputHeadline(13)).scrollIntoView();
        await (await this.inputHeadline(13)).setValue(headline);
        await (await this.inputEyebrow(14)).setValue(eyebrow);
        await (await $('input[id^="edit-settings-block-form-field-content-7-subform-field-buttons-0-title-"]')).scrollIntoView();
        await (await $('input[id^="edit-settings-block-form-field-content-7-subform-field-buttons-0-title-"]')).setValue(btnText + ' 1');
        await (await $('input[id^="edit-settings-block-form-field-content-7-subform-field-buttons-0-uri-"]')).setValue(url);
        await ((await $('div[id^="edit-settings-block-form-field-content-7-subform-field-media-entity-wrapper-"]')).scrollIntoView());
        await ((await $('div[id^="edit-settings-block-form-field-content-7-subform-field-media-entity-wrapper-"]')).click());
        await browser.switchToFrame(await $$('iframe[name="entity_browser_iframe_image_and_video"]')[2]);
        await (await $$('input[id^="edit-inline-entity-form-field-media-image-0-upload-"]')[6]).setValue(remoteFilePath);
        await browser.pause(10000); //explicit waits seem to be necessary here
        await (await this.inputAltText).scrollIntoView();
        await (await this.inputAltText).setValue(altText);
        await (await $$('input[value="Save image"]')[5]).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView({ behavior: 'auto', block: 'center' });
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
        await (await this.dropdownStyling).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownStyling).click();
        await (await this.dropdownLayout).scrollIntoView({ behavior: 'auto', block: 'center' });
    }
}

export default new CarouselBlockPage();
