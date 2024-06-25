import lightboxGalleryPage from "../../pageobjects/CMS/Components/lightboxGallery.page";
import * as fs from "fs";

describe("Compound Grid Component Tests", () => {
    it("[S3C1354] Verify that Analytics for the Lightbox Component is configured", async () => {
        await browser.url(
            "https://meda2022:meda2022@content.montefioreeinstein.org/internal/component-testing/lightbox-lightbox-gallery"
        );
        await (
            await lightboxGalleryPage.lightboxGalleryComponent
        ).scrollIntoView();
        await (await lightboxGalleryPage.firstLightboxItem).click();

        const expectedAnalyticsData = [
            {
                clickText: "blood_bone_marrow_hero_%20sRGB_0.jpeg",
                componentType: "lightbox gallery > media image",
                event: "e_componentClick",
                itemTitle: "Featured Videos",
                linkType: "image",
            },
        ];

        const dataLayer = await browser.executeScript(
            "return window.dataLayer",
            []
        );
        const actualAnalyticsData = dataLayer.filter(
            (item) => item.event === "e_componentClick"
        );

        const parsedActualAnalyticsData = [
            {
                clickText: actualAnalyticsData[0].clickText,
                componentType: actualAnalyticsData[0].componentType,
                event: actualAnalyticsData[0].event,
                itemTitle: actualAnalyticsData[0].itemTitle,
                linkType: actualAnalyticsData[0].linkType,
            },
        ];

        fs.writeFile(
            "analyticsTestEvidence/lightboxGallery.json",
            JSON.stringify(dataLayer),
            (err) => {
                if (err) {
                    console.error(err);
                }
                // file written successfully
            }
        );

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);
    });
});
