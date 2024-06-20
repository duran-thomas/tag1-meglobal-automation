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
    // public get footerMainLinks() {
    //     return $('.mf-footer__main-links');
    // }
    // public get footerMainLinks() {
    //     return $('.mf-footer__main-links');
    // }
    // public get footerMainLinks() {
    //     return $('.mf-footer__main-links');
    // }


    //Helper function

    public async removeBreadcrumb() {
       
    }

    public openHome() {
        return super.open('/');
    }
}

export default new FooterBlockPage();
