import LoginPage from "../../pageobjects/CMS/Login/login.page";
import contentProxyPage from "../../pageobjects/CMS/Components/contentProxy.page";
import { getEnvironmentConfig } from "../../../envSelector";
import path from "path";
import * as fs from "fs";

describe("Content Proxy Component Tests", () => {
    const environment = getEnvironmentConfig(process.env.ENV);

    const downloadDir = path.join(__dirname, "../../../downloads");

    before(async () => {
        const bypassURL = environment.bypassURL;
        const cookies = environment.cookies;

        // Bypass login
        await browser.url(await bypassURL);
        await browser.maximizeWindow();

        // Set user cookies
        await browser.setCookies(await cookies);

        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }
    });

    after(() => {
        const files = fs.readdirSync(downloadDir);
        files.forEach((file) => fs.unlinkSync(path.join(downloadDir, file)));
    });

    it("[S3C802] Verify that Proxy Language Support works as expected", async () => {
        const baseUrl = environment.baseUrl;
        await browser.url(`${baseUrl}wound-care`);
        const paragraphText =
            await contentProxyPage.firstParagraphText.getText();

        expect(paragraphText).toHaveText(
            "Many patients with PAD will develop wounds that require multidisciplinary treatment."
        );
        await browser.url(`${baseUrl}/wound-care`);

        expect(paragraphText).toHaveText(
            "Muchos pacientes con EAP desarrollarán heridas que requerirán un tratamiento multidisciplinario."
        );
    });

    it("[S3C803] Metatag handling", async () => {
        const baseUrl = environment.baseUrl;
        await browser.url(`${baseUrl}bahn`);

        const linkUrl = await contentProxyPage.linkTag.getAttribute("href");
        const metaDescription = await contentProxyPage.metaTag.getAttribute(
            "content"
        );
        const title = await browser.getTitle();

        expect(await linkUrl).toEqual(`${baseUrl}patient-care/services/bahn`);
        expect(await metaDescription).toEqual(
            "The Bronx Accountable Healthcare Network, also known as the BAHN, is a Health Home program serving the Bronx. The BAHN ..."
        );
        expect(await title).toEqual(
            "Bronx Accountable Healthcare Network Health Home (BAHN) | Patient Care | Patient Care | Montefiore Einstein"
        );
    });

    it.only("[S3C804] Verify that downloadable file links work as expected", async () => {
        const baseUrl = environment.baseUrl;
        await browser.url(`${baseUrl}population-health-dashboards`);

        // Locate and click the download link
        const powerpointLink = await browser.$('a[href$=".pptx"]');
        await powerpointLink.waitForDisplayed();
        await powerpointLink.click();

        // Pause to ensure the download has time to complete
        await browser.pause(5000);

        // Define the expected filename and path where the file should be downloaded
        const filename = "OCPH-Dashboard-asthma.pptx";
        const filePath = path.join("../../../downloads", filename);

        // Check if the file exists in the download directory
        await browser.pause(2000); // Added additional pause to allow for file download to complete
        const fileExists = fs.existsSync(filePath);
        await expect(fileExists).toBe(true);
    });
});
