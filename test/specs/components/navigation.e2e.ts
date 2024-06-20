import { getEnvironmentConfig } from "../../../envSelector";
import AdminContentPage from "../../pageobjects/CMS/Login/adminContent.page";
import NavigationBlockPage from "../../pageobjects/CMS/Components/navigation.page";
import QALayoutPage from "../../pageobjects/CMS/Components/QALayoutPage.page";
import * as fs from "fs";

describe("Navigation Component Tests", () => {
  before(async () => {
    // Get the environment configuration
    const environment = getEnvironmentConfig(process.env.ENV);

    // Use the environment data
    const bypassURL = environment.bypassURL;

    //Bypass login
    await browser.url(await bypassURL);
    await browser.maximizeWindow();

    // Set user cookies
    // await browser.setCookies(await cookies);
  });

  afterEach(async function () {
    // Take a screenshot after each test/assertion
    const testName = this.currentTest?.fullTitle().replace(/\s/g, "_");
    const screenshotPath = `./screenshots/Navigation/${testName}.png`;
    await browser.saveScreenshot(screenshotPath);
  });

  it("[S3C1982] Verify analytics for Hamburger Menu Items", async () => {
    await await NavigationBlockPage.openHomePage();
    await browser.refresh();
    await (await NavigationBlockPage.btnHamburger).click();
    await browser.pause(1000);
    await (await NavigationBlockPage.linkPatientCare).click();

    await browser.execute(() => {
      const locationLink = document.querySelectorAll(
        `a[href="/patient-care/locations"]`
      );

      if (locationLink) {
        locationLink[0].setAttribute("target", "_blank");
      }
    });
    const currentURL = await browser.getUrl();
    await (await $$('a[href="/patient-care/locations"]')[0]).click();
    await browser.switchWindow(currentURL);

    const expectedHamburgerAnalytics = [
      {
        clickText: "Montefiore Einstein > Patient Care > Locations",
        event: "e_navigationClick",
        linkType: "link",
        navigationType: "hamburger",
      },
    ];

    const dataLayer = await browser.executeScript(
      "return window.dataLayer",
      []
    );

    const actualHamburgerAnalyticsData = dataLayer.filter(
      (item) => item.event === "e_navigationClick"
    );

    fs.writeFile(
      "analyticsTestEvidence/navigationComponents.json",
      JSON.stringify(dataLayer),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );

    await expect(actualHamburgerAnalyticsData).toEqual(
      expectedHamburgerAnalytics
    );
  });

  it("[S3C1983] Verify analytics for Global Utilities Section of the Header", async () => {
    await browser.refresh();
    await browser.execute(() => {
      const findADoctorButton = document.querySelector(
        'div.z-30 a[data-analytics-click-text="Find a Doctor"]'
      );

      if (findADoctorButton) {
        findADoctorButton.setAttribute("target", "_blank");
      }
    });
    const currentURL = await browser.getUrl();

    await (await NavigationBlockPage.btnFindADoctor).click();
    await browser.switchWindow(currentURL);

    const expectedGlobalUtilitiesAnalytics = [
      {
        clickText: "Find a Doctor",
        event: "e_navigationClick",
        linkType: "button",
        navigationType: "top-bar",
      },
    ];

    const dataLayer = await browser.executeScript(
      "return window.dataLayer",
      []
    );

    const actualGlobalUtilitiesAnalytics = dataLayer.filter(
      (item) => item.event === "e_navigationClick"
    );

    fs.writeFile(
      "analyticsTestEvidence/navigationComponents.json",
      JSON.stringify(dataLayer),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );

    await expect(actualGlobalUtilitiesAnalytics).toEqual(
      expectedGlobalUtilitiesAnalytics
    );
  });

  it("[S3C1984] Verify analytics for Utility Right Section of the Header", async () => {
    await browser.refresh();
    await browser.execute(() => {
      const forProfessionals = document.querySelector(
        '.mf-top-bar-menu a[data-analytics-click-text="For Professionals"]'
      );

      if (forProfessionals) {
        forProfessionals.setAttribute("target", "_blank");
      }
    });
    const currentURL = await browser.getUrl();

    await (await NavigationBlockPage.linkForProfessionals).click();
    await browser.switchWindow(currentURL);

    const expectedAnalytics = [
      {
        clickText: "For Professionals",
        event: "e_navigationClick",
        linkType: "link",
        navigationType: "top-bar",
      },
    ];

    const dataLayer = await browser.executeScript(
      "return window.dataLayer",
      []
    );

    const actualAnalyticsData = dataLayer.filter(
      (item) => item.event === "e_navigationClick"
    );

    fs.writeFile(
      "analyticsTestEvidence/navigationComponentsImage.json",
      JSON.stringify(dataLayer),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );

    await expect(actualAnalyticsData).toEqual(expectedAnalytics);
  });

  it("[S3C1985] Verify analytics for Global Flyout Section of the Header", async () => {
    await browser.refresh();
    const currentURL = await browser.getUrl();
    await (await NavigationBlockPage.patientCareFlyOut).click();
    await browser.execute(() => {
      const primaryCare = document.querySelector(
        'a[data-analytics-click-text="Primary Care"]'
      );

      if (primaryCare) {
        primaryCare.setAttribute("target", "_blank");
      }
    });

    await browser.pause(1000);
    await (await NavigationBlockPage.linkPrimaryCare).click();
    await browser.switchWindow(currentURL);

    const expectedAnalytics = [
      {
        clickText: "Patient Care > Clinical Services > Primary Care",
        event: "e_navigationClick",
        linkType: "link",
        navigationType: "primary nav",
      },
    ];

    const dataLayer = await browser.executeScript(
      "return window.dataLayer",
      []
    );

    const actualAnalyticsData = dataLayer.filter(
      (item) => item.event === "e_navigationClick"
    );

    fs.writeFile(
      "analyticsTestEvidence/navigationComponents.json",
      JSON.stringify(dataLayer),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );

    await expect(actualAnalyticsData).toEqual(expectedAnalytics);
  });

  it.skip("[S3C1986] Verify analytics for Language Switcher Section of the Header", async () => {
    await browser.refresh();
    await (await NavigationBlockPage.dropdownLanguageSwitcher).click();
    await browser.pause(1000);
    await browser.execute(() => {
      const englishOption = document.querySelector('a[data-language="en"]');
      if (englishOption) {
        englishOption.setAttribute("target", "_blank");
        console.log(1);
      }
    });
    const currentURL = await browser.getUrl();

    await (await NavigationBlockPage.englishLanguageOption).click();
    await browser.switchWindow(currentURL);

    await (await NavigationBlockPage.dropdownLanguageSwitcher).click();

    await browser.execute(() => {
      const spanishOption = document.querySelector('a[data-language="es"]');
      if (spanishOption) {
        spanishOption.setAttribute("target", "_blank");
      }
    });
    await (await NavigationBlockPage.spanishLanguageOption).click();
    await browser.switchWindow(currentURL);

    const expectedAnalytics = [
      {
        clickText: "English",
        event: "e_navigationClick",
        linkType: "link",
        navigationType: "dropdown",
      },
      {
        clickText: "Español",
        event: "e_navigationClick",
        linkType: "link",
        navigationType: "dropdown",
      },
    ];

    const dataLayer = await browser.executeScript(
      "return window.dataLayer",
      []
    );

    console.log(dataLayer);

    const actualAnalyticsData = dataLayer.filter(
      (item) => item.event === "e_navigationClick"
    );

    await expect(actualAnalyticsData).toEqual(expectedAnalytics);
  });
});
