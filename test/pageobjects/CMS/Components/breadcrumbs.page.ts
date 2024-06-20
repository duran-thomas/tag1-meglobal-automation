import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class BreadcrumbsBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get breadcrumbElement() {
        return $('.mf-breadcrumbs');
    }

    public get editConfigIcon() {
        return $('button.trigger.focusable')
    }

    public get removeOption() {
        return $('=Remove block');
    }

    public get confirmRemove() {
        return $('button[data-analytics-click-text="Remove"]');
    }

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get linkClinicalServices() {
        return $('li.mf-breadcrumbs__item:nth-child(4) > a:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
    }

    public get linkPatientCare() {
        return $('li.mf-breadcrumbs__item:nth-child(3) > a:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
    }

    //Helper function

    public async removeBreadcrumb() {
       await (await this.breadcrumbElement).moveTo();
       await (await this.editConfigIcon).waitForDisplayed();
       await (await this.editConfigIcon).click();
       await (await this.removeOption).waitForDisplayed();
       await (await this.removeOption).click();
       await (await this.confirmRemove).waitForDisplayed();
       await (await this.confirmRemove).click();
       await (await this.btnSaveLayout).scrollIntoView();
       await (await this.btnSaveLayout).click();
    }

    public openPage() {
        return super.open('patient-care/services/emergency-services');
    }
}

export default new BreadcrumbsBlockPage();
