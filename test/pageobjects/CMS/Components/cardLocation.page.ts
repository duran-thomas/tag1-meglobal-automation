import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CardLocationBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnAddContent () {
        return $('a.button');
    }

    public get linkLocation () {
        return $('=Location');
    }

    public get inputTitle () {
        return $('#edit-title-0-value');
    }

    public get inputAddress () {
        return $('#edit-field-address-0-value');
    }

    public get inputMapURL () {
        return $('#edit-field-map-url-0-uri');
    }

    public get inputLatitude () {
        return $('#edit-field-coordinates-0-value-lat');
    }

    public get inputLongitude () {
        return $('#edit-field-coordinates-0-value-lon');
    }

    public get inputPhoneNumber () {
        return $('#edit-field-phone-number-0-value');
    }

    public get inputOpenHours () {
        return $('#edit-field-open-hours-0-value');
    }

    public get inputServicesTitle () {
        return $('#edit-field-services-title-0-value');
    }

    public get inputService () {
        return $('#edit-field-services-0-value');
    }

    public get btnAddAnother () {
        return $('input[data-drupal-selector="edit-field-services-add-more"]');
    }

    public get inputExtraService1 () {
        return $('input[data-drupal-selector="edit-field-services-1-value"]');
    }

    public get inputExtraService2 () {
        return $('input[data-drupal-selector="edit-field-services-2-value"]');
    }

    public get inputExtraService3 () {
        return $('input[data-drupal-selector="edit-field-services-3-value"]');
    }

    public get inputExtraService4 () {
        return $('input[data-drupal-selector="edit-field-services-4-value"]');
    }

    public get inputExtraService5 () {
        return $('input[data-drupal-selector="edit-field-services-5-value"]');
    }

    public get inputExtraService6 () {
        return $('input[data-drupal-selector="edit-field-services-6-value"]');
    }

    public get inputExtraService7 () {
        return $('input[data-drupal-selector="edit-field-services-7-value"]');
    }

    public get inputDescriptionTitle() {
        return $('#edit-field-description-title-0-value');
    }

    public get inputDescription () {
        return $('#edit-field-description-0-value');
    }

    public get dropdownImage () {
        return $('#edit-field-image');
    }

    public get btnBrowse () {
        return $("input[type='file']");
    }

    public get inputAltText () {
        return $('input[id^="edit-inline-entity-form-field-media-image-0-alt-"]');
    }

    public get btnSaveImage () {
        return $('#edit-submit');
    }

    public get entityIframe () {
        return $('iframe[name="entity_browser_iframe_image_browser"]');
    }

    public get inputID () {
        return $('#edit-field-id-0-value');
    }

    public get dropdownLocationType () {
        return $('#edit-field-location-type');
    }


    public get checkboxBreastCareCenter () {
        return $('#edit-field-location-specialties-301');
    }

    public get checkboxCancerCenter () {
        return $('#edit-field-location-specialties-36');
    }

    public get checkboxOrthopedics () {
        return $('#edit-field-location-specialties-206');
    }

    public get checkboxWomensHealth () {
        return $('#edit-field-location-specialties-216');
    }

    public get checkboxWoundCare () {
        return $('#edit-field-location-specialties-221');
    }

    public get checkboxAdolescentMedicine () {
        return $('#edit-field-location-specialties-326');
    }

    public get checkboxInfectiousDisease () {
        return $('#edit-field-location-specialties-241');
    }

    public get checkboxInternalMedicine () {
        return $('#edit-field-location-specialties-306');
    }

    public get checkboxCardiology () {
        return $('#edit-field-location-specialties-41');
    }

    public get checkboxPediatrics () {
        return $('#edit-field-location-specialties-181');
    }

    public get checkboxRadiology () {
        return $('#edit-field-location-specialties-131');
    }

    public get checkboxStrokeCenter () {
        return $('#edit-field-location-specialties-561');
    }

    public get checkboxIsChildLocation () {
        return $('#edit-field-child-value');
    }

    public get dropdownParentLocation () {
        return $('#edit-field-parent-location');
    }

    public get btnSave () {
        return $('#edit-submit');
    }

    public get statusMsg () {
        return $('.messages__content');
    }

    public get tabClone () {
        return $('=Clone');
    }

    public get tabEdit () {
        return $('=Edit');
    }

    public get tabEditGreene () {
        return $$('=Edit')[1];
    }

    public get tabDelete () {
        return $('=Delete');
    }

    public get entityImageBox () {
        return $('input[data-drupal-selector^="edit-recursive-nodelocationfield-image-references"]');
    }

    public get entityLocationSpecialtiesBox1 () {
        return $('#edit-recursive-nodelocationfield-location-specialties-references-326-clone');
    }

    public get entityLocationSpecialtiesBox2 () {
        return $('#edit-recursive-nodelocationfield-location-specialties-references-241-clone');
    }

    public get entityLocationSpecialtiesBox3 () {
        return $('#edit-recursive-nodelocationfield-location-specialties-references-306-clone');
    }

    public get entityLocationSpecialtiesBox4 () {
        return $('#edit-recursive-nodelocationfield-location-specialties-references-181-clone');
    }

    public get entityLocationTypeBox () {
        return $('input[data-drupal-selector^="edit-recursive-nodelocationfield-location-type-references"]');
    }

    public get entityParentLocationBox () {
        return $('input[data-drupal-selector^="edit-recursive-nodelocationfield-parent-location-references"]');
    }

    public get btnClone () {
        return $('#edit-clone');
    }

    public get locationToClone () {
        return $('=Greene Medical Arts Pavilion QA Test')
    }

    public get tabLayout () {
        return $('=Layout');
    }

    public get modalBtnAddSection () {
        return $$('#edit-actions-submit')[0];
    }

    public get linkAddBlock () {
        return $$('div[class="layout-builder__add-block"]')[0];
    }

    public get btnSaveLayout () {
        return $('#edit-submit');
    }

    public get btnAddBlock () {
        return $('#edit-actions-submit');
    }

    public get configBlock () {
        return $('.ui-draggable-handle');
    }

    public get successMsg () {
        return $('.mf-alert__container--success');
    }
    ////////////component elements

    public get inputBlockTitle() {
        return $('#edit-settings-label');
    }

    public get inputLocation() {
        return $('#edit-settings-block-form-field-content-0-subform-field-location-0-target-id');
    }

    public get dropdownContentPosition () {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-position');
    }

    public get dropdownSize () {
        return $('#edit-settings-block-form-field-content-0-subform-field-size');
    }

    public get checkboxShadow () {
        return $('#edit-settings-block-form-field-content-0-subform-field-shadow-value');
    }

    public get checkboxBorder () {
        return $('#edit-settings-block-form-field-content-0-subform-field-border-value');
    }

    public get btnAddCardLocation () {
        return $('#edit-settings-block-form-field-content-add-more');
    }

    public get checkboxPublish () {
        return $('#edit-status');
    }

    // carousel locators
    
    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get listCardLocation () {
        return $('.add-more-button-card-location');
    }

    public get carouselInputLocation () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-location-0-target-id"]');
    }

    public get carouselDropdownContentPosition () {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-content-position"]');
    }

    public get carouselDropdownSize () {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-size"]');
    }

    public get carouselCheckboxShadow () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-shadow-value"]');
    }

    public get carouselCheckboxBorder () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-border-value"]');
    }

    //second location
    public get carouselInputLocation1 () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-location-0-target-id"]');
    }

    public get carouselDropdownContentPosition1 () {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-content-position"]');
    }

    public get carouselDropdownSize1 () {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-size"]');
    }

    public get carouselCheckboxShadow1 () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-shadow-value"]');
    }

    public get carouselCheckboxBorder1 () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-border-value"]');
    }
    
    //third location
    public get carouselInputLocation2 () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-2-subform-field-location-0-target-id"]');
    }

    public get carouselDropdownContentPosition2 () {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-2-subform-field-content-position"]');
    }

    public get carouselDropdownSize2 () {
        return $('select[data-drupal-selector="edit-settings-block-form-field-content-2-subform-field-size"]');
    }

    public get carouselCheckboxShadow2 () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-2-subform-field-shadow-value"]');
    }

    public get carouselCheckboxBorder2 () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-2-subform-field-border-value"]');
    }


    //end

    public get listResult () {
        return $('.ui-menu-item');
    }

    public cardLocationElements (id: string) {
        return $$(`#${id} .mf-card-location`);
    }

    public carouselElement (id: string) {
        return $(`#${id} .mf-carousel`);
    }

    public get btnApplyToSelected () {
        return $('#edit-submit--2');
    }

    public get dropdownEditAction () {
        return $('#edit-action');
    }

    public get btnSelect () {
        return $('#edit-submit')
    }
   
    /**
     * Helper methods to create Card Location Component
     */

    public async createLocation1(title: string, address: string, mapUrl: string, latitude: string, longitude: string, phoneNumber: string, hours: string, serviceTitle: string, service1: string, service2: string, service3: string, service4: string, service5: string, service6: string, service7: string, service8: string, descriptionTitle: string, description: string, remoteFilePath: string, altText: string, id: string) {
        await (await this.btnAddContent).waitForClickable({timeout:3000});
        await (await this.btnAddContent).click();
        await (await this.linkLocation).waitForDisplayed({timeout:5000});
        await (await this.linkLocation).click();
        await browser.pause(3000);
        await (await this.inputTitle).waitForDisplayed({timeout:4000});
        await (await this.inputTitle).setValue(title);
        await (await this.inputAddress).setValue(address);
        await (await this.inputMapURL).setValue(mapUrl);
        await (await this.inputLatitude).scrollIntoView();
        await (await this.inputLatitude).setValue(latitude);
        await (await this.inputLongitude).setValue(longitude);
        await (await this.inputPhoneNumber).setValue(phoneNumber);
        await (await this.inputOpenHours).setValue(hours);
        await (await this.inputServicesTitle).setValue(serviceTitle);
        await (await this.inputService).scrollIntoView();
        await (await this.inputService).setValue(service1);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService1).waitForDisplayed({timeout:3000});
        await (await this.inputExtraService1).setValue(service2);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService2).waitForDisplayed({timeout:3000});
        await (await this.inputExtraService2).setValue(service3);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService3).waitForDisplayed({timeout:3000});
        await (await this.inputExtraService3).setValue(service4);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService4).waitForDisplayed({timeout:3000});
        await (await this.inputExtraService4).setValue(service5);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService5).waitForDisplayed({timeout:3000});
        await (await this.inputExtraService5).setValue(service6);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService6).waitForDisplayed({timeout:3000});
        await (await this.inputExtraService6).setValue(service7);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService7).waitForDisplayed({timeout:3000});
        await (await this.inputExtraService7).setValue(service8);
        await (await this.inputDescriptionTitle).scrollIntoView();
        await (await this.inputDescriptionTitle).setValue(descriptionTitle);
        await (await this.inputDescription).setValue(description);
        await (await this.dropdownImage).scrollIntoView();
        await (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await (await this.inputID).scrollIntoView();
        await (await this.inputID).setValue(id);
        await (await this.dropdownLocationType).selectByVisibleText('Hospital');
        await (await this.checkboxBreastCareCenter).scrollIntoView();
        await (await this.checkboxBreastCareCenter).click();
        await (await this.checkboxCancerCenter).scrollIntoView();
        await (await this.checkboxCancerCenter).click();
        await (await this.checkboxOrthopedics).scrollIntoView();
        await (await this.checkboxOrthopedics).click();
        await (await this.checkboxWomensHealth).scrollIntoView();
        await (await this.checkboxWomensHealth).click();
        await (await this.checkboxWoundCare).click();
        await (await this.btnSave).click();
        await browser.pause(2000);
    }

    public async createLocation2(title: string, address: string, mapUrl: string, latitude: string, longitude: string, phoneNumber: string, hours: string, serviceTitle: string, service1: string, service2: string, service3: string, descriptionTitle: string, description: string, remoteFilePath: string, altText: string) {
        await (await this.btnAddContent).waitForClickable({timeout:3000});
        await (await this.btnAddContent).click();
        await (await this.linkLocation).waitForDisplayed({timeout:5000});
        await (await this.linkLocation).click();
        await browser.pause(3000);
        await (await this.inputTitle).waitForDisplayed({timeout:4000});
        await (await this.inputTitle).setValue(title);
        await (await this.inputAddress).setValue(address);
        await (await this.inputMapURL).setValue(mapUrl);
        await (await this.inputLatitude).scrollIntoView();
        await (await this.inputLatitude).setValue(latitude);
        await (await this.inputLongitude).setValue(longitude);
        await (await this.inputPhoneNumber).setValue(phoneNumber);
        await (await this.inputOpenHours).setValue(hours);
        await (await this.inputServicesTitle).setValue(serviceTitle);
        await (await this.inputService).scrollIntoView();
        await (await this.inputService).setValue(service1);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService1).waitForDisplayed({timeout:3000});
        await (await this.inputExtraService1).setValue(service2);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService2).waitForDisplayed({timeout:3000});
        await (await this.inputExtraService2).setValue(service3);
        await (await this.inputDescriptionTitle).scrollIntoView();
        await (await this.inputDescriptionTitle).setValue(descriptionTitle);
        await (await this.inputDescription).setValue(description);
        await (await this.dropdownImage).scrollIntoView();
        await (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await (await this.dropdownLocationType).scrollIntoView();
        await (await this.dropdownLocationType).selectByVisibleText('Hospital');
        await (await this.checkboxAdolescentMedicine).scrollIntoView();
        await (await this.checkboxAdolescentMedicine).click();
        await (await this.checkboxInfectiousDisease).scrollIntoView();
        await (await this.checkboxInfectiousDisease).click();
        await (await this.checkboxInternalMedicine).click();
        await (await this.checkboxPediatrics).scrollIntoView();
        await (await this.checkboxPediatrics).click();
        await (await this.checkboxIsChildLocation).scrollIntoView();
        await (await this.checkboxIsChildLocation).click();
        await (await this.dropdownParentLocation).selectByVisibleText('P0129: Montefiore Medical Group Greene Medical Arts Pavilion');
        await (await this.btnSave).click();
        await browser.pause(2000);

    }

    public async createLocation3(title: string, address: string, mapUrl: string, latitude: string, longitude: string, phoneNumber: string, hours: string, serviceTitle: string, service1: string, service2: string, service3: string, service4: string, service5: string, service6: string,  descriptionTitle: string, description: string, remoteFilePath: string, altText: string, id: string) {
        await (await this.btnAddContent).waitForClickable({timeout:3000});
        await (await this.btnAddContent).click();
        await (await this.linkLocation).waitForDisplayed({timeout:5000});
        await (await this.linkLocation).click();
        await browser.pause(3000);
        await (await this.inputTitle).waitForDisplayed({timeout:4000});
        await (await this.inputTitle).setValue(title);
        await (await this.inputAddress).setValue(address);
        await (await this.inputMapURL).setValue(mapUrl);
        await (await this.inputLatitude).scrollIntoView();
        await (await this.inputLatitude).setValue(latitude);
        await (await this.inputLongitude).setValue(longitude);
        await (await this.inputPhoneNumber).setValue(phoneNumber);
        await (await this.inputOpenHours).setValue(hours);
        await (await this.inputServicesTitle).setValue(serviceTitle);
        await (await this.inputService).scrollIntoView();
        await (await this.inputService).setValue(service1);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService1).waitForDisplayed({timeout:5000});
        await (await this.inputExtraService1).setValue(service2);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService2).waitForDisplayed({timeout:5000});
        await (await this.inputExtraService2).setValue(service3);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService3).waitForDisplayed({timeout:5000});
        await (await this.inputExtraService3).setValue(service4);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService4).waitForDisplayed({timeout:5000});
        await (await this.inputExtraService4).setValue(service5);
        await (await this.btnAddAnother).click();
        await (await this.inputExtraService5).waitForDisplayed({timeout:5000});
        await (await this.inputExtraService5).setValue(service6);
        await (await this.inputDescriptionTitle).scrollIntoView();
        await (await this.inputDescriptionTitle).setValue(descriptionTitle);
        await (await this.inputDescription).setValue(description);
        await (await this.dropdownImage).scrollIntoView();
        await (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await (await this.inputID).scrollIntoView();
        await (await this.inputID).setValue(id);
        await (await this.checkboxCardiology).scrollIntoView();
        await (await this.checkboxCardiology).click();
        await (await this.checkboxPediatrics).scrollIntoView();
        await (await this.checkboxPediatrics).click();
        await (await this.checkboxRadiology).click();
        await (await this.checkboxStrokeCenter).click();
        await (await this.checkboxIsChildLocation).scrollIntoView();
        await (await this.checkboxIsChildLocation).click();
        await (await this.dropdownParentLocation).selectByVisibleText('P0188: Albert Einstein College of Medicine');
        await (await this.btnSave).click();
        await browser.pause(1500);
    }

    public async cloneLocation () {
        await (await this.locationToClone).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.locationToClone).click();
        await (await this.tabClone).scrollIntoView();
        await (await this.tabClone).click();
        await (await this.entityImageBox).scrollIntoView();
        await (await this.entityImageBox).click();
        await (await this.entityLocationSpecialtiesBox1).click();
        await (await this.entityLocationSpecialtiesBox2).click();
        await (await this.entityLocationSpecialtiesBox2).click();
        await (await this.entityLocationSpecialtiesBox4).scrollIntoView();
        await (await this.entityLocationSpecialtiesBox4).click();
        await (await this.entityLocationTypeBox).click();
        await (await this.entityParentLocationBox).click();
        await (await this.checkboxPublish).click();
        await (await this.btnClone).click();
        await browser.pause(1500);
    }

    public async renameClone (title:string, id:string) {
        await (await this.tabEditGreene).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.tabEditGreene).click();
        await (await this.inputTitle).clearValue();

        await (await this.inputTitle).setValue(title+' - VERT');
        await (await this.inputID).scrollIntoView();
        await (await this.inputID).setValue(id+'01');
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
        await browser.pause(1500);
    }

    public async createLocationComponentBlock1(title:string, location:string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputBlockTitle).setValue(title);
        await (await this.inputLocation).scrollIntoView();
        await (await this.inputLocation).setValue(location);
        await (await this.listResult).click();
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.pause(1500);
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed({timeout:4000});
        await (await this.btnSaveLayout).scrollIntoView({ block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createLocationComponentBlock2(title:string, location:string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputBlockTitle).setValue(title);
        await (await this.inputLocation).scrollIntoView();
        await (await this.inputLocation).setValue(location);
        await (await this.listResult).click();
        await (await this.dropdownContentPosition).selectByVisibleText('right');
        await (await this.dropdownSize).selectByVisibleText('large');
        await (await this.checkboxShadow).click();
        await (await this.checkboxBorder).click();
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed({timeout:4000});
        await (await this.btnSaveLayout).scrollIntoView({ block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createCarouselCardLocation() {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputBlockTitle).setValue('TR3 Carousel block Title 1');

        await (await this.dropdownToggle).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownToggle).click();
        await (await this.listCardLocation).click();
        await (await this.carouselInputLocation).waitForDisplayed({timeout:5000});
        await (await this.carouselInputLocation).setValue('P9901');
        await (await this.listResult).click();
        await (await this.carouselDropdownContentPosition).selectByVisibleText('below');
        await (await this.carouselDropdownSize).selectByVisibleText('small');
        await (await this.carouselCheckboxShadow).click();
        await (await this.carouselCheckboxBorder).click();

        await (await this.dropdownToggle).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownToggle).click();
        await (await this.listCardLocation).click();
        await (await this.carouselInputLocation1).waitForDisplayed({timeout:5000});
        await (await this.carouselInputLocation1).setValue('QA Test');
        await (await this.listResult).click();
        await (await this.carouselDropdownContentPosition1).selectByVisibleText('below');
        await (await this.carouselDropdownSize1).selectByVisibleText('medium');
        await (await this.carouselCheckboxBorder1).click();

        await (await this.dropdownToggle).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownToggle).click();
        await (await this.listCardLocation).click();
        await (await this.carouselInputLocation2).waitForDisplayed({timeout:5000});
        await (await this.carouselInputLocation2).setValue('P9903');
        await (await this.listResult).click();
        await (await this.carouselDropdownContentPosition2).selectByVisibleText('below');
        await (await this.carouselDropdownSize2).selectByVisibleText('large');

        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed({timeout:4000});
        await (await this.btnSaveLayout).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async selectRowsByTitle(title: string): Promise<void> {
        const rows = await $$('tbody tr');
        
        for (const row of rows) {
            const rowTitleElement = await row.$('.views-field-title');
            const rowTitle = await rowTitleElement.getText();
          
          if (rowTitle === title) {
                const checkbox = await row.$('input[type="checkbox"]');
            
            if (checkbox) {
                await checkbox.scrollIntoView({ behavior: 'auto', block: 'center' });
                await checkbox.click();
            }
          }
        }
    }

    public async deleteAll() {
        // await (await this.selectRowsByTitle('QA Landing Page'));
        await (await this.selectRowsByTitle('Greene Medical Arts Pavilion QA Test - VERT'));
        await (await this.selectRowsByTitle(process.env.ENV === 'dev' ? "Greene Medical Arts Pavilion QA Test - Cloned" : "Montefiore Medical Group Greene Medical Arts Pavilion - Cloned"));
        await (await this.selectRowsByTitle('Jack D. Weiler Hospital'));
        await (await this.selectRowsByTitle('Greene Medical Arts Pavilion QA Test'));
        await (await this.selectRowsByTitle('White Plains Hospital'));
        await (await this.btnApplyToSelected).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownEditAction).selectByIndex(1);
        await (await this.btnSelect).click();
        await (await this.btnSave).waitForDisplayed({timeout:5000});
        await (await this.btnSave).click();
        await browser.pause(2000);
    }




}

export default new CardLocationBlockPage();
