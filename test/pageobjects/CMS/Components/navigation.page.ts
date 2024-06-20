import Page from "../Login/page";

class NavigationBlockPage extends Page {
  public get btnFindADoctor() {
    return $('div.z-30 a[data-analytics-click-text="Find a Doctor"]');
  }

  public get btnHamburger() {
    return $('button[data-analytics-click-text="Menu"]');
  }

  public get linkPatientCare() {
    return $$('button[data-analytics-click-text="Patient Care"]')[0];
  }

  public get linkLocations() {
    return $$('a[href="/patient-care/locations"]')[0];
  }

  public get linkForProfessionals() {
    return $(
      '.mf-top-bar-menu a[data-analytics-click-text="For Professionals"]'
    );
  }

  public get linkPrimaryCare() {
    return $('a[data-analytics-click-text="Primary Care"]');
  }

  public get patientCareFlyOut() {
    return $("#dropdown-button-0");
  }

  public get dropdownLanguageSwitcher() {
    return $('.mf-top-bar-menu button[data-analytics-click-text="English"]');
  }

  public get spanishLanguageOption() {
    return $('a[data-language="es"]');
  }

  public get englishLanguageOption() {
    return $('a[data-language="en"]');
  }

  public async openHomePage() {
    return super.open("/");
  }
}

export default new NavigationBlockPage();
