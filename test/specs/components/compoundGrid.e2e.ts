import LoginPage from "../../pageobjects/CMS/Login/login.page";
import AdminContentPage from "../../pageobjects/CMS/Login/adminContent.page";
import CompoundGridPage from "../../pageobjects/CMS/Components/compoundGrid.page";
import QALayoutPage from "../../pageobjects/CMS/Components/QALayoutPage.page";
import { getEnvironmentConfig } from "../../../envSelector";
import * as fs from "fs";

describe("Compound Grid Component Tests", () => {

    before(async ()=>{
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

    it("[S3C2007] Verify that Analytics for the Compound Grid Component is configured", async () => {
        await CompoundGridPage.navToComponentTesting();
        await (await CompoundGridPage.compoundGridLayout).scrollIntoView();
        await (await CompoundGridPage.firstCompoundGridImage).click();

        const expectedAnalyticsData = [
            {
                clickText: "photo-1.png.webp",
                componentType: "compound grid > card > media image",
                event: "e_componentClick",
                itemTitle:
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
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
            "analyticsTestEvidence/compoundGrid.json",
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
