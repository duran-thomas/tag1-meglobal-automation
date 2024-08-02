import LoginPage from "../../pageobjects/CMS/Login/login.page";
import findADoctorPage from "../../pageobjects/CMS/Components/findADoctor.page";
import { getEnvironmentConfig } from "../../../envSelector";

describe("Find a Doctor Component Test", () => {
    const environment = getEnvironmentConfig(process.env.ENV);
    before(async () => {
        // Use the environment data
        const bypassURL = environment.bypassURL;
        const cookies = environment.cookies;

        //Bypass login
        await browser.url(await bypassURL);
        await browser.maximizeWindow();

        // Set user cookies
        await browser.setCookies(await cookies);
    });

    it("[S3C1400] Verify that there is a pre-loader on the Find a Doctor page when loading results", async () => {
        const baseurl = environment.baseUrl;
        await browser.url(`${baseurl}profiles/search`);
        await (await findADoctorPage.inputDoctorName).setValue("John");
        await (await findADoctorPage.btnClearInputField).click();
        expect(await findADoctorPage.loader).toBeDisplayed();
    });

    it("[S3C1510] Verify that the Find a Doctor | Search Results/Doctor's Profile | Breadcrumbs/Menu hierarchy is correctly displayed", async () => {
        const baseurl = environment.baseUrl;
        await browser.url(`${baseurl}profiles/1639667157/justin-fernicola`);

        //List of expected breadcrumbs items
        const expectedBreadcrumbs = [
            "Montefiore Einstein Home",
            "Patient Care",
            "Find a Doctor",
            "Justin Fernicola, MD",
        ];
        // Get all breadcrumb elements
        const breadcrumbItems = await $$(".mf-breadcrumbs__item");

        // Verify the number of breadcrumbs items
        expect(breadcrumbItems.length).toEqual(expectedBreadcrumbs.length);

        // Loop through each breadcrumb item and verify its text
        for (let i = 0; i < breadcrumbItems.length; i++) {
            const breadcrumbText = await breadcrumbItems[i].getText();
            expect(breadcrumbText.trim()).toEqual(expectedBreadcrumbs[i]);
        }
    });
});
