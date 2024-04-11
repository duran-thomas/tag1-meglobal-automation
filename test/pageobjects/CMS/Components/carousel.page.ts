import Page from '../Login/page';
import cardLocationPage from './cardLocation.page';

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

    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get btnAddCardFeature() {
        return $('.add-more-button-card-feature');
    }

    public get btnAddCardGeneral() {
        return $('.add-more-button-card-general');
    }

    public get btnAddCardLocation() {
        return $('.add-more-button-card-location');
    }

    public get btnAddCardMyChart() {
        return $('.add-more-button-card-mychart');
    }

    public get btnAddHero() {
        return $('.add-more-button-hero');
    }

    public get btnAddImage() {
        return $('.add-more-button-image');
    }

    public get btnAddQuote() {
        return $('.add-more-button-quote');
    }

    public get btnAddBillboard() {
        return $('.add-more-button-billboard');
    }

    //content area 1 start
    public get inputHeadline() {
        return $$('div[role=textbox]')[0];
    }

    public get inputEyebrow() {
        return $$('div[role=textbox]')[1];
    }

    public get inputList() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-list"]');
    }

    public get inputContent() {
        return $$('div[role=textbox]')[2];
    }

    public get inputCarouselBillboardIntro() {
        return $$('div[role=textbox]')[2];
    }

    public get inputCarouselBillboardContent() {
        return $$('div[role=textbox]')[3];
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

    public get inputLinkText() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-links-0-title"]');
    }

    public get inputLinkText1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-links-0-title"]');
    }

    public get inputLinkUrl() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-links-0-uri"]');
    }

    public get inputLinkUrl1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-links-0-uri"]');
    }

    public get btnAdditionalOptions(){
        return $('details[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-buttons-0-link-options"]');
    }

    public get btnAdditionalOptions1(){
        return $('details[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-buttons-0-link-options"]');
    }

    public get btnSelectEntities(){
        return $('input[value="Select entities"]');
    }

    public get dropdownAdditionalLinkOptions(){
        return $('details[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-links-0-link-options"]');
    }

    public get setTargetDropdown(){
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-buttons-0-link-options-target"]');
    }

    public get setTargetDropdown1(){
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-buttons-0-link-options-target"]');
    }

    public get setTargetAdditionalLink(){
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-links-0-link-options-target"]');
    }

    public get dropdownImage() {
        return $('div[id^="edit-settings-block-form-field-content-0-subform-field-image-wrapper-"]');
    }
    public get dropdownBillboardMedia() {
        return $('div[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-media-entity-wrapper"]');
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

    public get btnAdditionalCardOptions() {
        return $('div div ul li.dropbutton-toggle button');
    }

    public get btnSaveAudio(){
        return $('input[id="edit-submit"]');
    }
    //content area 1 end


    //content area 2 start
    public get inputHeadline1() {
        return $$('div[role=textbox]')[3];
    }

    public get inputHeadline3() {
        return $$('div[role=textbox]')[3];
    }

    public get inputEyebrow1() {
        return $$('div[role=textbox]')[4];
    }

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
    public get inputHeadline2() {
        return $$('div[role=textbox]')[6];
    }

    public get inputEyebrow2() {
        return $$('div[role=textbox]')[7];
    }

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

    public get inputMyChartHeadline(){
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-headline-0-headline"]')
    }

    // public get inputMyChartEyebrow(){
    //     return $$('')
    // }

    public get btnSaveImage2() {
        return $('#edit-submit');
    }
    //content area 3 end

    // Location Content Area Start

    public get inputCarouselLocation(){
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-location-0-target-id"]');
    }

    public get carouselCheckboxShadow(){
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-shadow-value"]');
    }

    public get carouselCheckboxBorder () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-border-value"]');
    }

    public carouselLocationAddressLink(id:string){
        return $$(`#${id} div > div.space-y-4 > a`)[0];
    }

    public carouselLocationAddressIcon(id:string){
        return $(`#${id} a[data-analytics-click-text="map-trifold"]`);
    }

    // Location Content Area End

    // MyChart Content Area Start

    public get carouselMyChartHeadline(){
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-2-subform-field-headline-0-headline"]')
    }

    // MyChart Content Area End

    public get inputCarouselQuote(){
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-quote-0-value"]');
    }

    public get inputCarouselQuoteAuthor(){
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-author-0-value"]');
    }

    public get inputCarouselQuoteAuthorTitle(){
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-author-title-0-value"]');
    }


    // Image Content Area Start

    public get imageDropdown(){
        return $('div[data-drupal-selector="edit-settings-block-form-field-content-2-subform-field-image-wrapper"]');
    }
    public get inputImageLink(){
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-2-subform-field-link-0-uri"]');
    }

    public get btnAddCarouselImage(){
        return $('input[data-drupal-selector="edit-inline-entity-form-field-media-image-0-upload"]');
    }

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

    public get dropdownQuoteAudio(){
        return $('div[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-audio-wrapper"]')
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

    public get carouselImageIframe() {
        return $('#entity_browser_iframe_image_browser');
    }

    public get carouselBillboardMediaIframe() {
        return $('#entity_browser_iframe_image_and_video');
    }

    public get carouselQuoteAudioIframe() {
        return $('#entity_browser_iframe_audio_media_browser');
    }

    public get carouselElement() {
        return $('.mf-carousel');
    }

    public carouselImage(id:string) {
        return $(`#${id} img[alt="Carousel Alt Text"]`);
    }

    public get paginationElement() {
        return $('.mf-carousel__pagination');
    }

    public get controlElement() {
        return $$('.mf-carousel__nav-button');
    }

    public get swiperElement() {
        return $(`span[aria-label="Go to slide 2"]`);
    }

    public get frames() {
        return $$('#entity_browser_iframe_image_browser');
    }

    public get thirdFrame() {
        return $('iframe[name="entity_browser_iframe_image_browser"]');
    }



    /**
     * Helper methods to create Carousel Component
     */

    public async createCarousel(title: string, headline: string, eyebrow: string, list: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAddCardFeature).click();
        await browser.pause(8000);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
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
        await browser.pause(1000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }


    public async createCarouselNoPagination(title: string, headline: string, eyebrow: string, list: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string, remoteFilePath1: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAddCardFeature).click();
        await browser.pause(8000);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
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
        await browser.switchToParentFrame();
        await browser.pause(1000); //explicit waits seem to be necessary here

        await (await this.btnAddCardFeature).click();
        await browser.pause(4000);
        await (await this.inputHeadline1).scrollIntoView();
        await (await this.inputHeadline1).setValue(headline + ' 1');
        await (await this.inputEyebrow1).setValue(eyebrow + ' 1');
        await (await this.inputList1).setValue(list + ' 1');
        await (await this.inputContent1).scrollIntoView();
        await (await this.inputContent1).setValue(content + ' 1');
        await (await this.inputButtonText1).setValue(btnText + ' 1');
        await (await this.inputURL1).setValue(url);
        await browser.pause(2000);
        await (await this.dropdownImage1).scrollIntoView();
        await (await this.dropdownImage1).click(); //image currently not being added, selector inspection necessary
        const frame1 = await this.frames[1];
        await frame1.waitForDisplayed();
        await browser.switchToFrame(frame1); 
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath1);
        await browser.pause(6000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText + ' 1');
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(4000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(1000); //explicit waits seem to be necessary here

        await (await this.dropdownStyling).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownStyling).click();
        await browser.pause(5000);
        await (await this.dropdownIncludePagination).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownIncludePagination).selectByIndex(2);
        await (await this.btnAddBlock).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createCarouselNoControls(title: string, headline: string, eyebrow: string, list: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAddCardFeature).click();
        await browser.pause(8000);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
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
        await browser.switchToParentFrame();
        await browser.pause(1000); //explicit waits seem to be necessary here
        await (await this.dropdownStyling).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownStyling).click();
        await browser.pause(5000);
        await (await this.dropdownIncludeControls).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownIncludeControls).selectByIndex(2);
        await (await this.btnAddBlock).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView({ block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createCarouselMultiSlide(title: string, headline: string, eyebrow: string, list: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string, remoteFilePath1: string, remoteFilePath2: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAddCardFeature).click();
        await browser.pause(4000);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
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
        await browser.pause(1000); //explicit waits seem to be necessary here
        //second carousel
        await (await this.btnAddCardFeature).click();
        await browser.pause(4000);
        await (await this.inputHeadline1).scrollIntoView();
        await (await this.inputHeadline1).setValue(headline + ' 1');
        await (await this.inputEyebrow1).setValue(eyebrow + ' 1');
        await (await this.inputList1).setValue(list + ' 1');
        await (await this.inputContent1).scrollIntoView();
        await (await this.inputContent1).setValue(content + ' 1');
        await (await this.inputButtonText1).setValue(btnText + ' 1');
        await (await this.inputURL1).setValue(url);
        await browser.pause(2000);
        await (await this.dropdownImage1).scrollIntoView();
        await (await this.dropdownImage1).click(); //image currently not being added, selector inspection necessary
        const frame1 = await this.frames[1];
        await frame1.waitForDisplayed();
        await browser.switchToFrame(frame1); 
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath1);
        await browser.pause(6000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText + ' 1');
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(4000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(1000); //explicit waits seem to be necessary here
        //third carousel
        await (await this.btnAddCardFeature).click();
        await browser.pause(4000);
        await (await this.inputHeadline2).scrollIntoView();
        await (await this.inputHeadline2).setValue(headline) + ' 2';
        await (await this.inputEyebrow2).setValue(eyebrow + ' 2');
        await (await this.inputList2).setValue(list + ' 2');
        await (await this.inputContent2).scrollIntoView();
        await (await this.inputContent2).setValue(content + ' 2');
        await (await this.inputButtonText2).setValue(btnText + ' 2');
        await (await this.inputURL2).setValue(url + ' 2');
        await browser.pause(2000);
        await (await this.dropdownImage2).scrollIntoView();
        await (await this.dropdownImage2).click(); //image currently not being added, selector inspection necessary
        const frame2 = await this.frames[2];
        await frame2.waitForExist({timeout:8000});
        await browser.switchToFrame(frame2);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath2);
        await browser.pause(6000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText + ' 2');
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(4000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(1000); //explicit waits seem to be necessary here


        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createCarouselDoubleSlide(title: string, headline: string, eyebrow: string, list: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string, remoteFilePath1: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAddCardFeature).click();
        await browser.pause(4000);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
        await (await this.inputList).setValue(list);
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await browser.pause(2000)
        await (await this.inputInfo).scrollIntoView();
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
        await browser.pause(1000); //explicit waits seem to be necessary here
        //second carousel
        await (await this.btnAddCardFeature).click();
        await browser.pause(4000);
        await (await this.inputHeadline1).scrollIntoView();
        await (await this.inputHeadline1).setValue(headline + ' 1');
        await (await this.inputEyebrow1).setValue(eyebrow + ' 1');
        await (await this.inputList1).setValue(list + ' 1');
        await (await this.inputContent1).scrollIntoView();
        await (await this.inputContent1).setValue(content + ' 1');
        await (await this.inputButtonText1).setValue(btnText + ' 1');
        await (await this.inputURL1).setValue(url);
        await browser.pause(2000);
        await (await this.dropdownImage1).scrollIntoView();
        await (await this.dropdownImage1).click(); //image currently not being added, selector inspection necessary
        const frame1 = await this.frames[1];
        await frame1.waitForDisplayed();
        await browser.switchToFrame(frame1); 
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath1);
        await browser.pause(6000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText + ' 1');
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(4000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(1000); //explicit waits seem to be necessary here

        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createCarouselWithFeatureCardAndLocation(title: string, headline: string, eyebrow: string, list: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string, listTitle: string, listUrl: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAddCardFeature).click();
        await browser.pause(4000);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
        await (await this.inputList).setValue(list);
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.btnAdditionalOptions).click();
        await (await this.setTargetDropdown).selectByAttribute('value', '_blank');
        await browser.pause(2000)
        await (await this.inputLinkText).setValue(listTitle);
        await (await this.inputLinkUrl).setValue(listUrl);
        await (await this.inputInfo).scrollIntoView();
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
        await browser.pause(1000); //explicit waits seem to be necessary here
        //Create Card for Location Card
        await (await this.btnAdditionalCardOptions).click();
        await (await this.btnAddCardLocation).click();
        await browser.pause(4000);
        await (await this.inputCarouselLocation).setValue('P0002');
        await (await cardLocationPage.listResult).click();
        await (await this.carouselCheckboxShadow).click();
        await (await this.carouselCheckboxBorder).click();
        await browser.pause(2000);

        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createCarouselWithBillboardAndMyChart(title: string, headline: string, eyebrow: string, intro: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string, link: string){
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAdditionalCardOptions).click();
        await (await this.btnAddBillboard).click();
        
        await browser.pause(4000);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
        await (await this.inputCarouselBillboardIntro).setValue(intro)
        await (await this.inputCarouselBillboardContent).scrollIntoView();
        await (await this.inputCarouselBillboardContent).setValue(content);
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.btnAdditionalOptions).click();
        await (await this.setTargetDropdown).selectByAttribute('value', '_blank');
        await browser.pause(2000)
        await (await this.dropdownBillboardMedia).scrollIntoView();
        await (await this.dropdownBillboardMedia).click();
        // switch to the iframe
        await browser.switchToFrame(await this.carouselBillboardMediaIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(8000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(4000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(1000); //explicit waits seem to be necessary here
        //Create Card MyChart Carousel Element
        await (await this.btnAdditionalCardOptions).click();
        await (await this.btnAddCardMyChart).click();
        await browser.pause(4000);
        await (await this.inputMyChartHeadline).scrollIntoView();
        await (await this.inputMyChartHeadline).setValue('MyChart ' + headline);
        await (await this.inputEyebrow1).setValue('MyChart ' + eyebrow);
        await (await this.inputContent1).setValue('MyChart ' + content);
        await (await this.inputButtonText1).setValue('MyChart ' + btnText);
        await (await this.inputURL1).setValue(url);
        await (await this.btnAdditionalOptions1).click();
        await (await this.setTargetDropdown1).selectByAttribute('value', '_blank');
        await browser.pause(2000);
        await (await this.inputLinkText1).setValue('MyChart ' + link)
        await (await this.inputLinkUrl1).setValue(url);
        await (await this.dropdownAdditionalLinkOptions).click()
        await (await this.setTargetAdditionalLink).selectByAttribute('value', '_blank');
        await browser.pause(2000)

        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);

    }

    public async createCarouselQuote(title: string, quote: string, quoteAuthor: string, quoteAutorTitle: string, remoteFilePath){
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.btnAdditionalCardOptions).click();
        await (await this.btnAddQuote).click();

        await (await this.inputCarouselQuote).setValue(quote);
        await (await this.inputCarouselQuoteAuthor).setValue(quoteAuthor);
        await (await this.inputCarouselQuoteAuthorTitle).setValue(quoteAutorTitle);
        await (await this.dropdownQuoteAudio).click();
        await browser.pause(1000);
        await (await this.btnSelectEntities).click();
        await browser.pause(1000);
        await browser.switchToFrame(await this.carouselQuoteAudioIframe);
        await (await this.btnBrowse).scrollIntoView();
        await browser.pause(1000)
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(10000)
        await (await this.btnSaveAudio).scrollIntoView();
        await (await this.btnSaveAudio).click();
        await browser.pause(3000)

        await browser.switchToParentFrame();
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);

    }

    public async openParaTypes() {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await browser.pause(2500);
    }

    public async areAllElementsDisplayed() {
        const elements = [
            await this.btnAddCardFeature,
            await this.btnAddCardGeneral,
            await this.btnAddCardLocation,
            await this.btnAddCardMyChart,
            await this.btnAddHero,
            await this.btnAddImage,
            await this.btnAddQuote,
            await this.btnAddBillboard
        ];
    
        // Check if all elements are displayed
        const allDisplayed = elements.every((element) => element.isDisplayed());
    
        return allDisplayed;
    }
    

    public async navToStyling() {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await browser.pause(1000);
        await (await this.dropdownStyling).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownStyling).click();
        await (await this.dropdownLayout).scrollIntoView({ behavior: 'auto', block: 'center' });
    }
}

export default new CarouselBlockPage();
