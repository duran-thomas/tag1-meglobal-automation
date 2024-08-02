// const fs = require('fs');
// const sharp = require('sharp');

// async function fullPageScreenshot(browser, screenshotPath) {
//     const windowSize = await browser.getWindowSize();
//     const documentHeight = await browser.execute(() => document.body.scrollHeight);

//     console.log(`Window Size: ${JSON.stringify(windowSize)}`);
//     console.log(`Document Height: ${documentHeight}`);

//     const numScreenshots = Math.ceil(documentHeight / windowSize.height);
//     const screenshots = [];

//     for (let i = 0; i < numScreenshots; i++) {
//         await browser.execute((y) => window.scrollTo(0, y), i * windowSize.height);
//         const screenshot = await browser.takeScreenshot();
//         screenshots.push(Buffer.from(screenshot, 'base64'));

//         // Save each part for debugging purposes
//         const partPath = `${screenshotPath}-part-${i + 1}.png`;
//         fs.writeFileSync(partPath, screenshots[i]);
//         console.log(`Saved screenshot part ${i + 1} to ${partPath}`);
//     }

//     // Resize and pad screenshots to ensure uniform dimensions
//     const uniformScreenshots = await resizeAndPadScreenshots(screenshots, windowSize.width, windowSize.height, documentHeight);

//     // Stitch screenshots together
//     const finalImage = await stitchImages(uniformScreenshots, windowSize.width, windowSize.height, documentHeight);
//     fs.writeFileSync(screenshotPath, finalImage);
//     console.log(`Saved final stitched image to ${screenshotPath}`);
// }

// async function resizeAndPadScreenshots(screenshots, width, height, documentHeight) {
//     return Promise.all(screenshots.map((screenshot, index) => {
//         let currentHeight = height;
//         if (index === screenshots.length - 1 && documentHeight % height !== 0) {
//             currentHeight = documentHeight % height;
//         }
//         return sharp(screenshot)
//             .resize(width, currentHeight)
//             .extend({
//                 top: 0,
//                 bottom: height - currentHeight,
//                 background: { r: 0, g: 0, b: 0, alpha: 0 }
//             })
//             .toBuffer();
//     }));
// }

// async function stitchImages(screenshots, width, height, documentHeight) {
//     const totalHeight = screenshots.length * height;
//     console.log(`Total image height will be ${totalHeight}px`);

//     const stitchedImage = sharp({
//         create: {
//             width,
//             height: totalHeight,
//             channels: 4,
//             background: { r: 0, g: 0, b: 0, alpha: 0 }
//         }
//     });

//     let top = 0;
//     for (let i = 0; i < screenshots.length; i++) {
//         let currentHeight = height;
//         if (i === screenshots.length - 1 && documentHeight % height !== 0) {
//             currentHeight = documentHeight % height;
//         }
//         console.log(`Stitching screenshot ${i + 1} at position ${top}`);
//         stitchedImage.composite([{ input: screenshots[i], top, left: 0 }]);
//         top += currentHeight;
//     }

//     return stitchedImage.png().toBuffer();
// }

// module.exports = fullPageScreenshot;
