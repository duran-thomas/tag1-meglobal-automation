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

    //Breaking cancer page down into 7 sections
    it('[] should scroll and capture section one of the cancer page', async () => {
        await browser.url('https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/cancer');
        await VisualTestPage.closeDialogs();
        const elements = await VisualTestPage.gridElements;

        const element = elements[0];
        await element.scrollIntoView({ behavior: 'auto' });
        await browser.pause(1000); //trying to give time before screenshot to allow consistency with images taken

        const screenshotPath = path.join(screenshotDir, `GridElement-0.png`);
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
            name: 'Element 0',
            imageBase64: imageBuffer.toString('base64'),
            os: os,
            browser: browserName,
            viewport: viewport,
            device: device,
        });
    });

    it('[] should scroll and capture section two of the cancer page', async () => {
        await browser.url('https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/cancer');
        await VisualTestPage.closeDialogs();
        const elements = await VisualTestPage.gridElements;

        const element = elements[1];
        await element.scrollIntoView({ behavior: 'auto' });
        await browser.pause(1000); //trying to give time before screenshot to allow consistency with images taken

        const screenshotPath = path.join(screenshotDir, `GridElement-1.png`);
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
            name: 'Element 1',
            imageBase64: imageBuffer.toString('base64'),
            os: os,
            browser: browserName,
            viewport: viewport,
            device: device,
        });
    });

    it('[] should scroll and capture section three of the cancer page', async () => {
        await browser.url('https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/cancer');
        await VisualTestPage.closeDialogs();
        const elements = await VisualTestPage.gridElements;

        const element = elements[2];
        await element.scrollIntoView({ behavior: 'auto' });
        await browser.pause(1000); //trying to give time before screenshot to allow consistency with images taken

        const screenshotPath = path.join(screenshotDir, `GridElement-2.png`);
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
            name: 'Element 2',
            imageBase64: imageBuffer.toString('base64'),
            os: os,
            browser: browserName,
            viewport: viewport,
            device: device,
        });
    });

    it('[] should scroll and capture section four of the cancer page', async () => {
        await browser.url('https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/cancer');
        await VisualTestPage.closeDialogs();
        const elements = await VisualTestPage.gridElements;

        const element = elements[3];
        await element.scrollIntoView({ behavior: 'auto' });
        await browser.pause(1000); //trying to give time before screenshot to allow consistency with images taken

        const screenshotPath = path.join(screenshotDir, `GridElement-3.png`);
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
            name: 'Element 3',
            imageBase64: imageBuffer.toString('base64'),
            os: os,
            browser: browserName,
            viewport: viewport,
            device: device,
        });
    });

    it('[] should scroll and capture section five of the cancer page', async () => {
        await browser.url('https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/cancer');
        await VisualTestPage.closeDialogs();
        const elements = await VisualTestPage.gridElements;

        const element = elements[4];
        await element.scrollIntoView({ behavior: 'auto' });
        await browser.pause(1000); //trying to give time before screenshot to allow consistency with images taken

        const screenshotPath = path.join(screenshotDir, `GridElement-4.png`);
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
            name: 'Element 4',
            imageBase64: imageBuffer.toString('base64'),
            os: os,
            browser: browserName,
            viewport: viewport,
            device: device,
        });
    });

    it('[] should scroll and capture section six of the cancer page', async () => {
        await browser.url('https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/cancer');
        await VisualTestPage.closeDialogs();
        const elements = await VisualTestPage.gridElements;

        const element = elements[5];
        await element.scrollIntoView({ behavior: 'auto' });
        await browser.pause(1000); //trying to give time before screenshot to allow consistency with images taken

        const screenshotPath = path.join(screenshotDir, `GridElement-5.png`);
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
            name: 'Element 5',
            imageBase64: imageBuffer.toString('base64'),
            os: os,
            browser: browserName,
            viewport: viewport,
            device: device,
        });
    });

    it('[] should scroll and capture section seven of the cancer page', async () => {
        await browser.url('https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/cancer');
        await VisualTestPage.closeDialogs();
        const elements = await VisualTestPage.gridElements;

        const element = elements[6];
        await element.scrollIntoView({ behavior: 'auto' });
        await browser.pause(1000); //trying to give time before screenshot to allow consistency with images taken

        const screenshotPath = path.join(screenshotDir, `GridElement-6.png`);
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
            name: 'Element 6',
            imageBase64: imageBuffer.toString('base64'),
            os: os,
            browser: browserName,
            viewport: viewport,
            device: device,
        });
    });

   
});
