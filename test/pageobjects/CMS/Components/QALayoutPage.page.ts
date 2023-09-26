import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LandingQAPage extends Page {
    /**
     * define selectors using getter methods
     */

    //base page
    public get tabLayout() {
        return $('=Layout');
    }

    public get tabView() {
        return $('=View')
    }

    public get linkAddSection() {
        return $('.layout-builder__add-section:nth-child(1)');
    }

    //right window section menu
    public get sectionTypeOneColumn() {
        return $('a[href$="/meda_layouts__section"]');
    }

    public get sectionTypeTwoColumn() {
        return $('a[href$="/meda_layouts__section_two_column"]');
    }

    //section modal
    public get inputLabel() {
        return $('#edit-layout-settings-label');
    }

    public get modalBtnAddSection() {
        return $$('#edit-actions-submit')[0];
    }
    /** The other fields in the modal will be added as they become necessary */

    //base page with section added making add block become available
    public get linkAddBlock() {
        return $$('div[class="layout-builder__add-block"]')[0];
    }

    //right window block menu
    public get btnCreateCustomBlock() {
        return $('a[class="use-ajax inline-block-create-button"]');
    }

    public get btnAccordion() {
        return $('=Accordion');
    }

    public get btnBillBoard() {
        return $('=Billboard');
    }

    public get btnBlackbaud() {
        return $('=Blackbaud embedded form');
    }

    public get btnCardClinicalTrial() {
        return $('=Card Clinical Trial');
    }

    public get btnCardFeature() {
        return $('=Card Feature');
    }

    public get btnCardGeneral() {
        return $('=Card General');
    }

    public get btnCardLocation() {
        return $('=Card Location');
    }

    public get btnCardMyChart() {
        return $('=Card MyChart');
    }

    public get btnCardServices() {
        return $('=Card Services');
    }

    public get btnCarousel() {
        return $('=Carousel');
    }

    public get btnContactList() {
        return $('=Contact List');
    }

    public get btnEvent() {
        return $('=Event');
    }

    public get btnDefault() {
        return $('=Default');
    }

    public get btnFacts() {
        return $('=Facts');
    }

    public get btnFreeform() {
        return $('=Freeform');
    }

    public get btnHero() {
        return $('=Hero');
    }

    public get btnIconList() {
        return $('=Icon List');
    }

    public get btnImage() {
        return $('=Image');
    }

    public get btnInlineNavigation() {
        return $('=Inline Navigation');
    }

    public get btnLayout() {
        return $('=Layout');
    }

    public get btnMap() {
        return $('=Map');
    }

    public get btnProgressIndicator() {
        return $('=Progress Indicator');
    }

    public get btnQuote() {
        return $('=Quote');
    }

    public get btnRichText() {
        return $('=Rich Text');
    }

    public get btnSectionHeader() {
        return $('=Section Header');
    }

    public get btnStepper() {
        return $('=Stepper');
    }

    public get btnTabs() {
        return $('=Tabs');
    }

    public get btnTestimonial() {
        return $('=Testimonial');
    }

    public get btnTeamLeadersCarousel(){
        return $('=Team Leaders Carousel');
    }

    public get btnTeamMembersGrid(){
        return $('=Team Members Grid');
    }

    public get btnVideo() {
        return $('=Video');
    }

    public get btnVisualList() {
        return $('=Visual List');
    }

    public get btnBack() {
        return $('=Back');
    }

    public get sectionModal() {
        return $('#ui-id-2');
    }

    public get iframeDiv() {
        return $('.lbim-dialog');
    }

    public get btnRemoveSection() {
        return $('a[href^="/layout_builder/remove/section"]');
    }

    public get configBlock() {
        return $('.ui-draggable-handle');
    }

    public get btnRemove() {
        return $('#edit-submit');
    }

    public get btnSaveLayout() {
        return $('button[id="edit-submit"]');
    }

    public get btnCloseChatPopUp() {
        return $('button[aria-label="closeButton"]');
    }

    public get linkQuickActions() {
        return $('=Quick Actions');
    }


    /**
     * Methods to create a new section on a page, navigate to block list types
     */

    public async createNewSection() {
        await (await this.linkAddSection).scrollIntoView();
        await (await this.linkAddSection).click();
        await (await this.sectionTypeOneColumn).click();
        await (await this.sectionModal).waitForDisplayed();
        await browser.pause(4000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.modalBtnAddSection).scrollIntoView();
        await (await this.modalBtnAddSection).click();
        await browser.pause(2000);
    }

    public async create2ColSection() {
        await (await this.linkAddSection).scrollIntoView();
        await (await this.linkAddSection).click();
        await (await this.sectionTypeTwoColumn).click();
        await (await this.sectionModal).waitForDisplayed();
        await browser.pause(4000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.modalBtnAddSection).scrollIntoView();
        await (await this.modalBtnAddSection).click();
        await browser.pause(2000);
    }

    public async navigateToBlockList() {
        await browser.refresh();
        await (await this.linkAddBlock).waitForExist();
        await (await this.linkAddBlock).scrollIntoView();
        await (await this.linkAddBlock).click();
        await (await this.btnCreateCustomBlock).waitForDisplayed();
        await (await this.btnCreateCustomBlock).click();
        const closePrompt = await this.btnCloseChatPopUp;
        await closePrompt.waitForDisplayed();
        await closePrompt.click();
        
    }

    public async goToPageView() {
        await (await this.tabView).waitForEnabled();
        await (await this.tabView).click();

    }

    public async cleanUpJob() {
        await browser.pause(2000);
        await (await this.btnRemoveSection).scrollIntoView();
        await this.btnRemoveSection.isDisplayedInViewport();
        await (await this.btnRemoveSection).click();
        await browser.pause(2000); // find a better wait criteria
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await browser.pause(1800);
        await (await this.btnRemove).click();
        await browser.pause(2000);
        await browser.refresh();
        await (await this.btnSaveLayout).waitForClickable();
        await (await this.btnSaveLayout).click();
        await browser.pause(2000);
    }


    public async goToQALayout() {
        await (await this.tabLayout).scrollIntoView();
        await (await this.tabLayout).click();
    }

}

export default new LandingQAPage();
