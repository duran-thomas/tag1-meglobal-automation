import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LandingQAPage extends Page {
    /**
     * define selectors using getter methods
     */

    //base page
    public get tabLayout () {
        return $('[href="/node/6/layout"]');
    }

    public get linkAddSection () {
        return $('div[class="layout-builder__add-section"]');
    }

    //right window section menu
    public get sectionTypeOneColumn () {
        return $('a[href$="/meda_layouts__section"]');
    }

    public get sectionTypeTwoColumn () {
        return $('a[href$="/meda_layouts__section_two_column"]');
    }

    //section modal
    public get inputLabel () {
        return $('#edit-layout-settings-label');
    }

    public get modalBtnAddSection () {
        return $('#edit-actions-submit');
    }
    /** The other fields in the modal will be added as they become necessary */

    //base page with section added making add block become available
    public get linkAddBlock () {
        return $('div[class="layout-builder__add-block"]');
    }

    //right window block menu
    public get btnCreateCustomBlock () {
        return $('a[class="use-ajax inline-block-create-button"]');
    }

    public get btnAccordion () {
        return $('=Accordion');
    }

    public get btnBillBoard () {
        return $('=Billboard');
    }

    public get btnBlackbaud () {
        return $('=Blackbaud embedded form');
    }

    public get btnCardClinicalTrial () {
        return $('=Card Clinical Trial');
    }

    public get btnCardFeature () {
        return $('=Card Feature');
    }

    public get btnCardGeneral () {
        return $('=Card General');
    }

    public get btnCardLocation () {
        return $('=Card Location');
    }

    public get btnCardMyChart () {
        return $('=Card MyChart');
    }

    public get btnCardServices () {
        return $('=Card Services');
    }

    public get btnCarousel () {
        return $('=Carousel');
    }

    public get btnContactList () {
        return $('=Contact List');
    }

    public get btnDefault () {
        return $('=Default');
    }

    public get btnFacts () {
        return $('=Facts');
    }

    public get btnFreeform () {
        return $('=Freeform');
    }

    public get btnHHSembeddedContent () {
        return $('=HHS embedded content');
    }

    public get btnIconList () {
        return $('=Icon List');
    }

    public get btnImage () {
        return $('=Image');
    }

    public get btnInlineNavigation () {
        return $('=Inline Navigation');
    }

    public get btnLayout () {
        return $('=Layout');
    }

    public get btnMap () {
        return $('=Map');
    }

    public get btnQuote () {
        return $('=Quote');
    }

    public get btnRichText () {
        return $('=Rich Text');
    }

    public get btnSectionHeader () {
        return $('=Section Header');
    }

    public get btnTabs () {
        return $('=Tabs');
    }

    public get btnTestimonial () {
        return $('=Testimonial');
    }








    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
    }


}

export default new LandingQAPage();
