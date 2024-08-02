import SearchBlockPage from "../../pageobjects/CMS/Components/search.page";
import { searchBlockData } from "../../data/search.data";
import { getEnvironmentConfig } from "../../../envSelector";
import * as fs from "fs";

describe("Search Component Test", () => {
    before(async () => {
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);

        // Use the environment data
        const bypassURL = environment.bypassURL;
        const cookies = environment.cookies;

        //Bypass login
        await browser.url(await bypassURL);
        await browser.maximizeWindow();

        // Set user cookies
        await browser.setCookies(await cookies);
    });

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Search/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    it.only("[S3C1994] Verify analytics for Search Component", async () => {
        const environment = getEnvironmentConfig(process.env.ENV);
        const baseUrl = environment.baseUrl;
        await browser.url((await baseUrl) + "/search");
        await (
            await SearchBlockPage.inputSearch
        ).setValue(searchBlockData.searchTerm);
        await (await SearchBlockPage.btnSearch).click();
        expect(await SearchBlockPage.searchResults).toBeDisplayed();
        const currentUrl = await browser.getUrl();
        await browser.refresh();
        expect(await SearchBlockPage.selectedSearchResult).toBeDisplayed();
        await (await SearchBlockPage.selectedSearchResult).scrollIntoView();
        await (await SearchBlockPage.selectedSearchResult).click();
        await browser.switchWindow(currentUrl);

        const dataLayer = await browser.executeScript(
            "return window.dataLayer",
            []
        );
        const actualAnalyticsData = dataLayer.filter(
            (item) => item.event === "e_searchClick"
        );

        const expectedAnalyticsData = [
            {
                clickText:
                    "Improving CAR-T Therapy for Patients with Multiple Myeloma | Montefiore Einstein",
                componentType: "search results",
                event: "e_searchClick",
                filtersEmployed:
                    "Patient Care, College of Medicine, Providers, News, Clinical Trials, Faculty",
                linkType: "link",
                searchString: "myeloma",
            },
        ];

        fs.writeFile(
            "analyticsTestEvidence/search.json",
            JSON.stringify(dataLayer),
            (err) => {
                if (err) {
                    console.error(err);
                }
                // file written successfully
            }
        );

        await expect(actualAnalyticsData).toEqual(expectedAnalyticsData);
    });
});
