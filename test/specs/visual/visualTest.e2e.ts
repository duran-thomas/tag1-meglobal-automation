import VisualTestPage from '../../pageobjects/CMS/Visual/visualPage.page';

const VisualRegressionTracker = require('@visual-regression-tracker/sdk-js').VisualRegressionTracker;
const fs = require('fs');
const path = require('path');

const vrtConfig = {
    apiUrl: 'http://localhost:4200',  // URL to the VRT server
    project: '4d888730-f047-4157-a423-935a70f1e38a',     // Project ID from VRT
    apiKey: process.env.VRT_API_KEY,         // API key from VRT
    branchName: 'master',               // Branch name
    ciBuildId: `build-${new Date().toISOString()}`, // Unique build ID
    enableSoftAssert: false
};

const vrt = new VisualRegressionTracker(vrtConfig);

const screenshotDir = './screenshots/VisualTests';

describe('Visual Regression Testing', () => {
    before(async () => {
        await vrt.start();
    });

    after(async () => {
        await vrt.stop();
    });

    beforeEach(async function() {
        await browser.maximizeWindow();
    });

    afterEach(async function() {
        // Cleanup tasks after each test if necessary
    });

    it('[S3C1809] should scroll and capture significant areas of the cancer page', async () => {
        await browser.url('https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/cancer');   
        await VisualTestPage.closeDialogs();     
        const elements = await VisualTestPage.gridElements;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            await element.scrollIntoView({behavior:'auto'});
            await browser.pause(1000); //trying to give time before screenshot to allow consistency with images taken

            const screenshotPath = path.join(screenshotDir, `GridElement-${i}.png`);
            await browser.saveScreenshot(screenshotPath);

            const imageBuffer = fs.readFileSync(screenshotPath);

            const capabilities = browser.capabilities as any;

            const os = capabilities.platformName || 'unknown';
            const browserName = capabilities.browserName || 'unknown';
            const device = browser.capabilities['deviceName'] || 'Desktop';

            // Get viewport size
            const windowSize = await browser.getWindowSize();
            const viewportWidth = capabilities['goog:chromeOptions']?.mobileEmulation?.deviceMetrics?.width || windowSize.width;
            const viewportHeight = capabilities['goog:chromeOptions']?.mobileEmulation?.deviceMetrics?.height || windowSize.height;
            const viewport = `${viewportWidth}x${viewportHeight}`;

            await vrt.track({
                name: `Element ${i}`,
                imageBase64: imageBuffer.toString('base64'),
                os: os,
                browser: browserName,
                viewport: viewport, 
                device: device,
            });
        }
    });

    it('[S3C1809] should capture the entire cancer page for comparison', async () => {
        await browser.url('https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/cancer');   
        await VisualTestPage.closeDialogs();     
        const elements = await VisualTestPage.gridElements;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            await element.scrollIntoView({behavior:'auto'});
            await browser.pause(1000); //trying to give time before screenshot to allow consistency with images taken

            const screenshotPath = path.join(screenshotDir, `GridElement-${i}.png`);
            await browser.saveScreenshot(screenshotPath);

            const imageBuffer = fs.readFileSync(screenshotPath);

            const capabilities = browser.capabilities as any;

            const os = capabilities.platformName || 'unknown';
            const browserName = capabilities.browserName || 'unknown';
            const device = browser.capabilities['deviceName'] || 'Desktop';

            // Get viewport size
            const windowSize = await browser.getWindowSize();
            const viewportWidth = capabilities['goog:chromeOptions']?.mobileEmulation?.deviceMetrics?.width || windowSize.width;
            const viewportHeight = capabilities['goog:chromeOptions']?.mobileEmulation?.deviceMetrics?.height || windowSize.height;
            const viewport = `${viewportWidth}x${viewportHeight}`;

            await vrt.track({
                name: `Element ${i}`,
                imageBase64: imageBuffer.toString('base64'),
                os: os,
                browser: browserName,
                viewport: viewport, 
                device: device,
            });
        }
    });

});
