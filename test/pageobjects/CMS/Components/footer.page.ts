import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FooterBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get footerElement() {
        return $('.mf-footer');
    }

    public get footerRightBlock() {
        return $('.mf-footer__right-col')
    }

    public get footerBottom() {
        return $('.mf-footer__bottom');
    }

    public get footerTopLinks() {
        return $('.mf-footer__top-links');
    }

    public get footerMainLinks() {
        return $('.mf-footer__main-links');
    }

    public get linkClinicalServices() {
        return $('li.mf-breadcrumbs__item:nth-child(4) > a:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
    }

    public get linkPatientCare() {
        return $('li.mf-breadcrumbs__item:nth-child(3) > a:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
    }

    public get btnRejectCookies() {
        return $('#onetrust-reject-all-handler');
    }

    public get iframe() {
        return $('#hyro-frame');
    }

    public get btnCloseDialog() {
        return $('.css-19ftm6o');
    }

    //right block
    public get meLogo() {
        return $('.w-1\\/2 > img:nth-child(1)');
    }

    public get phoneIcons() {
        return $$('span[data-analytics-click-text="phone"]');
    }

    public get locationIcons() {
        return $$('span[data-analytics-click-text="location"]');
    }

    public get xIcon() {
        return $$('a[aria-label="Twitter"]');
    }
    
    public get fbIcon() {
        return $$('a[aria-label="Facebook"]');
    }

    public get linkedInIcon() {
        return $$('a[aria-label="LinkedIn"]');
    }

    public get igIcon() {
        return $$('a[aria-label="Instagram"]');
    }

    public get youTubeIcon() {
        return $$('a[aria-label="YouTube"]');
    }

    //Menus

    public get addLink() {
        return $('=Add link');
    }

    public get inputMenuLinkTitle() {
        return $('#edit-title-0-value');
    }

    public get inputLink() {
        return $('#edit-link-0-uri');
    }

    public get dropdownLinkOptions() {
        return $('#edit-more-link-options');
    }

    public get checkboxExpanded() {
        return $('#edit-expanded-value');
    }

    public get dropdownParentLink() {
        return $('#edit-menu-parent');
    }

    public get expectedFooterElement() {
        return $('a[data-analytics-click-text="QA Footer Item"]');
    }

    public get expectedSubFooterElement() {
        return $('a[data-analytics-click-text="QA Footer sub-item"]');
    }

     public get editBtn() {
        return $$('li.edit.dropbutton__item.dropbutton-action');
    }

    public get btnDelete() {
        return $('#edit-delete');
    }

    public get confirmDelete() {
        return $('button[class="button button--primary js-form-submit form-submit ui-button ui-corner-all ui-widget"]');
    }

    public get btnSave() {
        return $('#edit-submit');
    }

    //social

    public get dropdownIcon() {
        return $('#edit-field-menu-icon-0-name');
    }

    public get iconElement() {
        return $('span[data-analytics-click-text="trafficsign"]');
    }

    public get socialLinks() {
        return $('');
    }

     // public get () {
    //     return $('');
    // }
     // public get () {
    //     return $('');
    // }

    //contact

    public get mNumberElement() {
        return $$('p.mf-text-body-2-sans.text-gray-600')[0];
    }

    public get eNumberElement() {
        return $$('p.mf-text-body-2-sans.text-gray-600')[2];
    }

    public get inputMonteContactInfo() {
        return $('#edit-contact-information-montefiore');
    }

    public get inputEinContactInfo() {
        return $('#edit-contact-information-einstein');
    }

    //Links

    public get linkME() {
        return $$('a[data-analytics-click-text="Montefiore Einstein"]')[1];
    }
    
    public get linkPCare() {
        return $$('a[data-analytics-click-text="Patient Care"]')[2];
    }

    // footer column manager 

    public get fieldTitleColumnNumber() {
        return $('label[for="edit-settings-columns-number"]');
    }

    public get inputColumnNumber() {
        return $('#edit-settings-columns-number');
    }

    public get btnSaveBlock() {
        return $('#edit-actions-submit');
    }

    //oneTrust panel

    public get oneTrustElement() {
        return $('#ot-pc-content');
    }

    public get inputClass() {
        return $('#edit-link-0-options-attributes-class');
    }

    public get linkFindDoctor() {
        return $('.mf-footer__main-links > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)');
    }

    public get dropdownLinkAttr(){
        return $('#edit-link-0-options-attributes');
    }

    //copyright 

    public get inputCopyright() {
        return $('#edit-settings-copyright-1-copyright-text');
    }

    public get testCopyrightElem() {
        return $('p.mf-text-body-4-sans:nth-child(2)');
    }

    //clinicalTrial group

    public get btnAddNewMenu() {
        return $('=Add new menu');
    }

    public get linkGroupMenuFooter() {
        return $('=Group menu (Footer)');
    }

    public get inputTitle() {
        return $('#edit-label-0-value');
    }

    public get newQAFooterLink() {
        return $('=QA Test - Clinical Trials Footer');
    }

    public get btnAddLink() {
        return $('a.button');
    }

    public get btnAddNewContent() {
        return $('=Add new content');
    }

    public get linkGroupLayoutPage() {
        return $('=Group node (Layout Page)');
    }

    public get meGroupName() {
        return $('.me-group-name');
    }

    public get tabDelete() {
        return $('=Delete');
    }

    public get msgElement() {
        return $('.mf-alert__container--highlight');
    }


    //Helper function

    public async closeElements() {
        await (await this.btnRejectCookies).waitForDisplayed({timeout:5000});
        await (await this.btnRejectCookies).click();
        await browser.switchToFrame(await this.iframe);
        await (await this.btnCloseDialog).click();
        await browser.pause(1500);
        await browser.switchToParentFrame();
    }

    public async addLinkTestItem(title:string, link:string) {
        await (await this.addLink).waitForDisplayed();
        await (await this.addLink).click();
        await (await this.inputMenuLinkTitle).waitForDisplayed();
        await (await this.inputMenuLinkTitle).setValue(title);
        await (await this.inputLink).setValue(link);
        await (await this.dropdownLinkOptions).scrollIntoView();
        await (await this.dropdownLinkOptions).click();
        await (await this.checkboxExpanded).waitForEnabled();
        await (await this.checkboxExpanded).click();
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async removeTestItem() {
        const btn = await this.editBtn;
        await btn[btn.length -1].scrollIntoView();
        await btn[btn.length -1].click();
        await (await this.btnDelete).waitForExist();
        await (await this.btnDelete).scrollIntoView();
        await (await this.btnDelete).click();
        await (await this.confirmDelete).waitForDisplayed();
        await (await this.confirmDelete).click();
    }

    public async addSubFooterLink(title:string, link:string, ) {
        await (await this.addLink).waitForDisplayed();
        await (await this.addLink).click();
        await (await this.inputMenuLinkTitle).waitForDisplayed();
        await (await this.inputMenuLinkTitle).setValue(title);
        await (await this.inputLink).setValue(link);
        await (await this.dropdownLinkOptions).scrollIntoView();
        await (await this.dropdownLinkOptions).click();
        await (await this.checkboxExpanded).waitForEnabled();
        await (await this.checkboxExpanded).click();
        await await (await this.dropdownParentLink).scrollIntoView();
        await await (await this.dropdownParentLink).selectByVisibleText('-- QA Footer Item');
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async updateIcon() {
        const btn = await this.editBtn;
        await btn[0].scrollIntoView();
        await btn[0].click();
        await (await this.dropdownIcon).scrollIntoView();
        await (await this.dropdownIcon).selectByVisibleText('trafficsign');
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async revertIcon() {
        const btn = await this.editBtn;
        await btn[0].scrollIntoView();
        await btn[0].click();
        await (await this.dropdownIcon).scrollIntoView();
        await (await this.dropdownIcon).selectByVisibleText('x');
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async updateContactInfo(monteText:string, einText:string) {
        await (await this.inputMonteContactInfo).waitForDisplayed();
        await (await this.inputMonteContactInfo).setValue(monteText);
        await (await this.inputEinContactInfo).setValue(einText);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async updateFooterColumn(cols:string){
        await (await this.inputColumnNumber).scrollIntoView();
        await (await this.inputColumnNumber).setValue(cols);
        await (await this.btnSaveBlock).scrollIntoView();
        await (await this.btnSaveBlock).click();
        await this.openHome();
    }

    public async updateElemClass(val:string){
        await this.footerMenu();
        const btn = this.editBtn;
        await btn[1].scrollIntoView();
        await btn[1].click();
        await (await this.dropdownLinkAttr).waitForDisplayed();
        await (await this.dropdownLinkAttr).scrollIntoView();
        await (await this.dropdownLinkAttr).click();
        await (await this.inputClass).scrollIntoView();
        await (await this.inputClass).setValue(val);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
        await this.openHome();
        await (await this.footerElement).scrollIntoView();
    }

    public async updateFooterCopyright(val:string){
        await (await this.inputCopyright).scrollIntoView();
        await (await this.inputCopyright).setValue(val);
        await (await this.btnSaveBlock).scrollIntoView();
        await (await this.btnSaveBlock).click();
        await this.openHome();
    }

    public async addGroupFooterMenu(val:string) {
        await this.clinicalTrialsGroupMenus();
        await (await this.btnAddNewMenu).click();
        await (await this.linkGroupMenuFooter).click();
        await (await this.inputTitle).setValue(val)
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async addLinkToMenu(title:string, link:string, ) {
        await (await this.btnAddLink).click();
        await this.inputMenuLinkTitle.setValue(title);
        await (await this.inputLink).setValue(link);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async addSecondLinkToMenu(title:string, link:string, ) {
        await (await this.btnAddLink).click();
        await this.inputMenuLinkTitle.setValue(title);
        await (await this.inputLink).setValue(link);
        await (await this.inputLink).setValue(link);
        // await (await this.dropdownParentLink).scrollIntoView();
        // await (await this.dropdownParentLink).selectByIndex(1);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async deleteCreatedGroupMenu() {
        await this.clinicalTrialsGroupMenus();
        await (await this.newQAFooterLink).click();
        await (await this.btnDelete).scrollIntoView();
        await (await this.btnDelete).click();
        await (await this.confirmDelete).click();
    }

    public async createGroupLayout(title:string) {
        await (await this.btnAddNewContent).click();
        await (await this.linkGroupLayoutPage).click();
        await (await this.inputMenuLinkTitle).setValue(title);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async deleteGroupLayout() {
        await (await this.tabDelete).click();
        await (await this.btnSave).click();
    }





    //Paths
    public openHome() {
        return super.open('/');
    }

    public topLinksMenu() {
        return super.open('/admin/structure/menu/manage/footer-top-links');
    }

    public footerMenu() {
        return super.open('/admin/structure/menu/manage/footer');
    }

    public bottomLinksMenu() {
        return super.open('/admin/structure/menu/manage/footer-bottom-links');
    }

    public monteSocialMenu() {
        return super.open('/admin/structure/menu/manage/montefiore-social');
    }

    public einSocialMenu() {
        return super.open('/admin/structure/menu/manage/einstein-social');
    }

    public dapContactMenu(){
        return super.open('/admin/config/dap/contact-information');
    }

    public patientCare(){
        return super.open('/patient-care');
    }

    public footerMgmt() {
        return super.open('/admin/structure/block/manage/footer');
    }

    public clinicalTrialsGroupMenus() {
        return super.open('/group/51/menus')
    }

    public clinicalTrialsGroupNodes() {
        return super.open('/group/51/nodes')
    }




}

export default new FooterBlockPage();
