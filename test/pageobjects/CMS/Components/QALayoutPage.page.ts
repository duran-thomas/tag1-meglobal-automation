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

    public get sidebarSection() {
        return $('a[href$="/meda_layouts__section_layout"]');
    }

    //section modal
    public get inputLabel() {
        return $('#edit-layout-settings-label');
    }

    public get modalBtnAddSection() {
        return $$('#edit-actions-submit')[0];
    }

    public get sectionIDInput() {
        return $('#edit-layout-settings-id');
    }
    
    /** The other fields in the modal will be added as they become necessary */

    //base page with section added making add block become available
    public get linkAddBlock() {
        return $$('div[class="layout-builder__add-block"]')[0];
    }

    public get leftAddBlock() {
        return $('div[data-layout-builder-highlight-id="block-0-first"]');
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

    public get btnIndexListClinicalCategories() {
        return $('=Index List - Clinical Categories');
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

    public get btnSidebarNav() {
        return $('=Sidebar Navigation');
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

    public get btnTeamLeadersCarousel() {
        return $('=Team Leaders Carousel');
    }

    public get btnTeamMembersGrid() {
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

    public get dialogFrame() {
        return $('#hyro-frame');
    }

    public get btnCloseChatPopUp() {
        //class changed in sprint 35
        //return $('button[aria-label="closeButton"]');
        return $('.css-19ftm6o');
    }

    public get linkQuickActions() {
        return $('=Quick Actions');
    }


    /**
     * Methods to create a new section on a page, navigate to block list types
     */

    public async createNewSection(id:string | undefined = undefined) {
        await (await this.linkAddSection).scrollIntoView();
        await (await this.linkAddSection).click();
        await (await this.sectionTypeOneColumn).click();
        await (await this.sectionModal).waitForDisplayed();
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        // To allow for creating sections without IDs, if the id field is undefined the section won't be creating with an ID
        if(id){
            await (await this.sectionIDInput).scrollIntoView({ behavior: 'auto', block: 'center' });
            await (await this.sectionIDInput).setValue(id);
        }
        // To allow for creating sections without IDs, if the id field is undefined the section won't be creating with an ID
        if(id){
            await (await this.sectionIDInput).scrollIntoView({ behavior: 'auto', block: 'center' });
            await (await this.sectionIDInput).setValue(id);
        }
        await (await this.modalBtnAddSection).scrollIntoView();
        await (await this.modalBtnAddSection).click();
        await browser.pause(2000);
    }

    public async create2ColSection() {
        await (await this.linkAddSection).scrollIntoView();
        await (await this.linkAddSection).click();
        await (await this.sectionTypeTwoColumn).click();
        await (await this.sectionModal).waitForDisplayed();
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.modalBtnAddSection).scrollIntoView();
        await (await this.modalBtnAddSection).click();
        await browser.pause(2000);
    }

    public async createSidebarSection() {
        await (await this.linkAddSection).scrollIntoView();
        await (await this.linkAddSection).click();

        // const frame = await this.dialogFrame;
        // await browser.switchToFrame(frame);
        // await this.btnCloseChatPopUp.click();
        // await browser.switchToParentFrame();

        await (await this.sidebarSection).click();
        await (await this.sectionModal).waitForDisplayed();
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.modalBtnAddSection).scrollIntoView();
        await (await this.modalBtnAddSection).click();
        await browser.pause(2000);
    }

    public async navigateToBlockList() {
        await browser.refresh();
        await (await this.linkAddBlock).waitForExist();
        await (await this.linkAddBlock).scrollIntoView();
        await (await this.linkAddBlock).click();
        /* Release 35.6 removed the need to click the custom block button before seeing the list of components
        // await (await this.btnCreateCustomBlock).waitForDisplayed();
        // await (await this.btnCreateCustomBlock).click();
        */
        // await (await this.btnCloseChatPopUp).click();
        const frame = await this.dialogFrame;
        if (await frame.isExisting() == true) {
            await browser.switchToFrame(frame);
            await browser.pause(1000);
            if (await this.btnCloseChatPopUp.isDisplayedInViewport() == true) {
                await this.btnCloseChatPopUp.click();
                await browser.switchToParentFrame();
            } else {
                console.log('Button not displayed');
            }
            await browser.switchToParentFrame();
        }

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
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
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

    public async closeChatPopup(){
        const iframe = await $('iframe[id="hyro-frame"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await $('#hyro-widget-closed div div div svg')).click()
        await browser.switchToParentFrame()
    }

}

export default new LandingQAPage();
