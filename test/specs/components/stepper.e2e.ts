import LoginPage from '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import StepperBlockPage from '../../pageobjects/CMS/Components/stepper.page';
import { users } from '../../data/users.data';
import { stepperBlockData } from '../../data/stepper.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';
import * as fs from "fs";


describe('Stepper Component Tests', () => {
    before(async () => {
        // //Login
        await browser.url(await users.bypassUrl);
        await browser.maximizeWindow();

        // Set the cookie for a logged in user
        await browser.setCookies([
            {
                name: cookieData.name,
                value: cookieData.value,
                domain: cookieData.domain,
                path: cookieData.path,
            }
        ]);
    });

    before(async function () {
        global.suiteDescription = this.currentTest?.parent?.title;
        //navigate to admin content page
        await AdminContentPage.open();
        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getTestPage(global.suiteDescription);
        await expect(QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function () {
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Stepper/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function () {
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
    });

    it.skip('[S3C926] Verify required fields in a stepper component', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnStepper).scrollIntoView();
        (await QALayoutPage.btnStepper).click();
        (await StepperBlockPage.configBlock).waitForDisplayed();

        await StepperBlockPage.checkRequired(stepperBlockData.adminTitle);

        const elem = await StepperBlockPage.inputTitle;
        await expect(await elem.getAttribute('aria-required')).toEqual('true');

    });

    it('[S3C927] Verify that a site Content Administrator can create a horizontal Stepper Component', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnStepper).scrollIntoView();
        (await QALayoutPage.btnStepper).click();
        (await StepperBlockPage.configBlock).waitForDisplayed();

        await StepperBlockPage.createHorizontalStepper(stepperBlockData.adminTitle, stepperBlockData.steps.title1, stepperBlockData.steps.content1, stepperBlockData.steps.title2, stepperBlockData.steps.content2, stepperBlockData.steps.title3, stepperBlockData.steps.content3, stepperBlockData.steps.title4, stepperBlockData.steps.content4, stepperBlockData.steps.title5, stepperBlockData.steps.content5, stepperBlockData.backLabel, stepperBlockData.contLabel);

        await expect(await StepperBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await StepperBlockPage.stepperElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await $('.mf-stepper__list--horizontal')).toBeExisting();
        await expect(await StepperBlockPage.stepsElements.length).toEqual(5);
    });

    it('[S3C928] Verify that a site Content Administrator can create a vertical Stepper Component', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnStepper).scrollIntoView();
        (await QALayoutPage.btnStepper).click();
        (await StepperBlockPage.configBlock).waitForDisplayed();

        await StepperBlockPage.createVerticalStepper(stepperBlockData.adminTitle, stepperBlockData.steps.title1, stepperBlockData.steps.content1, stepperBlockData.steps.title2, stepperBlockData.steps.content2, stepperBlockData.steps.title3, stepperBlockData.steps.content3, stepperBlockData.steps.title4, stepperBlockData.steps.content4, stepperBlockData.steps.title5, stepperBlockData.steps.content5, stepperBlockData.backLabel, stepperBlockData.contLabel);

        await expect(await StepperBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await StepperBlockPage.stepperElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await $('.mf-stepper__list--vertical')).toBeExisting();
        await expect(await StepperBlockPage.stepsElements.length).toEqual(5);
    });

    it('[S3C929] Verify that when the stepper component is on the initial step, the "back" button is not displayed, and the "Next Step" button is displayed.', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnStepper).scrollIntoView();
        (await QALayoutPage.btnStepper).click();
        (await StepperBlockPage.configBlock).waitForDisplayed();

        await StepperBlockPage.createHorizontalStepper(stepperBlockData.adminTitle, stepperBlockData.steps.title1, stepperBlockData.steps.content1, stepperBlockData.steps.title2, stepperBlockData.steps.content2, stepperBlockData.steps.title3, stepperBlockData.steps.content3, stepperBlockData.steps.title4, stepperBlockData.steps.content4, stepperBlockData.steps.title5, stepperBlockData.steps.content5, stepperBlockData.backLabel, stepperBlockData.contLabel);

        await expect(await StepperBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await StepperBlockPage.stepperElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await StepperBlockPage.btnBackStep).not.toBeDisplayedInViewport();
        await expect(await StepperBlockPage.btnNextStep).toBeDisplayedInViewport();
    });

    it('[S3C930] Verify that when the stepper component is on the last step, "continue" button is not displayed and the "back" button is displayed', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnStepper).scrollIntoView();
        (await QALayoutPage.btnStepper).click();
        (await StepperBlockPage.configBlock).waitForDisplayed();

        await StepperBlockPage.createHorizontalStepper(stepperBlockData.adminTitle, stepperBlockData.steps.title1, stepperBlockData.steps.content1, stepperBlockData.steps.title2, stepperBlockData.steps.content2, stepperBlockData.steps.title3, stepperBlockData.steps.content3, stepperBlockData.steps.title4, stepperBlockData.steps.content4, stepperBlockData.steps.title5, stepperBlockData.steps.content5, stepperBlockData.backLabel, stepperBlockData.contLabel);

        await expect(await StepperBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await StepperBlockPage.stepperElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await (await StepperBlockPage.btnLastStep).click();
        await expect(await StepperBlockPage.btnBackStep).toBeEnabled();
        await expect(await StepperBlockPage.btnNextStep).not.toBeDisplayedInViewport();
    });


    it('[] Verify that Analytics works as expected for a horizontal Stepper Component', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnStepper).scrollIntoView();
        (await QALayoutPage.btnStepper).click();
        (await StepperBlockPage.configBlock).waitForDisplayed();

        await StepperBlockPage.createHorizontalStepper(stepperBlockData.adminTitle, stepperBlockData.steps.title1, stepperBlockData.steps.content1, stepperBlockData.steps.title2, stepperBlockData.steps.content2, stepperBlockData.steps.title3, stepperBlockData.steps.content3, stepperBlockData.steps.title4, stepperBlockData.steps.content4, stepperBlockData.steps.title5, stepperBlockData.steps.content5, stepperBlockData.backLabel, stepperBlockData.contLabel);

        await expect(await StepperBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await StepperBlockPage.stepperElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await $('.mf-stepper__list--horizontal')).toBeExisting();
        await expect(await StepperBlockPage.stepsElements.length).toEqual(5);

        /**
         * Create the expected analytics 
         * objects based on the spec below: 
         * 
         *  */ 
        const expectedAnalyticsDataForwardBtn = {
            event: 'e_componentClick',
            componentType:'stepper',
            linkType: 'button',
            clickText: stepperBlockData.steps.title1,
            pageSlot: '1'
        }

        // Interact with the Forward button on the stepper to generate the analytics. (Clicking the button brings us to the next step)
        await (await $(`button[data-analytics-click-text="${stepperBlockData.steps.title1}"]`)).click();

         // Get the data layer for the window and get the data for the click event for the component
        let dataLayer = await browser.executeScript('return window.dataLayer',[]);
        let actualAnalayticsData = dataLayer.filter((item) => ((item.event === "e_componentClick") && (item.linkType === "button")))[0];

        // Build the actual analytics data object for using the forward button
        const parsedActualAnalyticsDataForwardBtn = {
            //Remove whitespace from the Headline
            clickText: actualAnalayticsData.clickText.trim(),
            componentType: actualAnalayticsData.componentType,
            event: actualAnalayticsData.event,
            linkType: actualAnalayticsData.linkType,
            pageSlot: actualAnalayticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/horizontalStepper_forward.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
        
        await expect(expectedAnalyticsDataForwardBtn).toEqual(parsedActualAnalyticsDataForwardBtn);

        const expectedAnalyticsDataBackLink = {
            event: 'e_componentClick',
            componentType:'stepper',
            linkType: 'link',
            clickText: stepperBlockData.steps.title2,
            pageSlot: '1'
        }

        // Interact with the Back Link on the stepper to generate the analytics. (Clicking the button brings us to the next step)
        await (await $$(`button.mf-link.mf-link--site-montefiore.mf-link--primary.mf-link--small.mf-link--direction-backwards.mf-link--animation-default`)[0]).click();

         // Get the data layer for the window and get the data for the click event for the component
        dataLayer = await browser.executeScript('return window.dataLayer',[]);
        actualAnalayticsData = dataLayer.filter((item) => ((item.event === "e_componentClick") && (item.linkType === "link")))[0];

        // Build the actual analytics data object for using the back link
        const parsedActualAnalyticsDataBackLink = {
            //Remove whitespace from the Headline
            clickText: actualAnalayticsData.clickText.trim(),
            componentType: actualAnalayticsData.componentType,
            event: actualAnalayticsData.event,
            linkType: actualAnalayticsData.linkType,
            pageSlot: actualAnalayticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/horizontalStepper_back.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
        
        await expect(expectedAnalyticsDataBackLink).toEqual(parsedActualAnalyticsDataBackLink);

        const expectedAnalyticsDataStep = {
            event: 'e_componentClick',
            componentType:'stepper',
            linkType: 'step',
            clickText: stepperBlockData.steps.title1,
            pageSlot: '1'
        }

        // Interact with the Back Link on the stepper to generate the analytics. (Clicking the button brings us to the next step)
        await (await $$(`button[aria-expanded="false"].mf-stepper__button`)[0]).click();

        // Get the data layer for the window and get the data for the click event for the component
        dataLayer = await browser.executeScript('return window.dataLayer',[]);
        actualAnalayticsData = dataLayer.filter((item) => ((item.event === "e_componentClick") && (item.linkType === "step")))[0];

        // Build the actual analytics data object for using the back link
        const parsedActualAnalyticsDataStep = {
            //Remove whitespace from the Headline
            clickText: actualAnalayticsData.clickText.trim(),
            componentType: actualAnalayticsData.componentType,
            event: actualAnalayticsData.event,
            linkType: actualAnalayticsData.linkType,
            pageSlot: actualAnalayticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/horizontalStepper_step.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
        
        await expect(expectedAnalyticsDataStep).toEqual(parsedActualAnalyticsDataStep);

    });

    it.only('[] Verify that Analytics works as expected for a vertical Stepper Component', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnStepper).scrollIntoView();
        (await QALayoutPage.btnStepper).click();
        (await StepperBlockPage.configBlock).waitForDisplayed();

        await StepperBlockPage.createVerticalStepper(stepperBlockData.adminTitle, stepperBlockData.steps.title1, stepperBlockData.steps.content1, stepperBlockData.steps.title2, stepperBlockData.steps.content2, stepperBlockData.steps.title3, stepperBlockData.steps.content3, stepperBlockData.steps.title4, stepperBlockData.steps.content4, stepperBlockData.steps.title5, stepperBlockData.steps.content5, stepperBlockData.backLabel, stepperBlockData.contLabel);

        await expect(await StepperBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await StepperBlockPage.stepperElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await $('.mf-stepper__list--vertical')).toBeExisting();
        await expect(await StepperBlockPage.stepsElements.length).toEqual(5);

        /**
         * Create the expected analytics 
         * objects based on the spec below: 
         * 
         *  */ 
        const expectedAnalyticsDataForwardBtn = {
            event: 'e_componentClick',
            componentType:'stepper',
            linkType: 'button',
            clickText: stepperBlockData.steps.title1,
            pageSlot: '1'
        }

        // Interact with the Forward button on the stepper to generate the analytics. (Clicking the button brings us to the next step)
        await (await $(`button[data-analytics-click-text="${stepperBlockData.steps.title1}"]`)).click();

         // Get the data layer for the window and get the data for the click event for the component
        let dataLayer = await browser.executeScript('return window.dataLayer',[]);
        let actualAnalayticsData = dataLayer.filter((item) => ((item.event === "e_componentClick") && (item.linkType === "button")))[0];

        // Build the actual analytics data object for using the forward button
        const parsedActualAnalyticsDataForwardBtn = {
            //Remove whitespace from the Headline
            clickText: actualAnalayticsData.clickText.trim(),
            componentType: actualAnalayticsData.componentType,
            event: actualAnalayticsData.event,
            linkType: actualAnalayticsData.linkType,
            pageSlot: actualAnalayticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/verticalStepper_forward.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
        
        await expect(expectedAnalyticsDataForwardBtn).toEqual(parsedActualAnalyticsDataForwardBtn);

        const expectedAnalyticsDataStep = {
            event: 'e_componentClick',
            componentType:'stepper',
            linkType: 'step',
            clickText: stepperBlockData.steps.title2,
            pageSlot: '1'
        }

        // Interact with the Back Link on the stepper to generate the analytics. (Clicking the button brings us to the next step)
        await (await $$(`button[aria-expanded="false"].mf-stepper__button`)[0]).click();

        // Get the data layer for the window and get the data for the click event for the component
        dataLayer = await browser.executeScript('return window.dataLayer',[]);
        actualAnalayticsData = dataLayer.filter((item) => ((item.event === "e_componentClick") && (item.linkType === "step")))[0];

        // Build the actual analytics data object for using the back link
        const parsedActualAnalyticsDataStep = {
            //Remove whitespace from the Headline
            clickText: actualAnalayticsData.clickText.trim(),
            componentType: actualAnalayticsData.componentType,
            event: actualAnalayticsData.event,
            linkType: actualAnalayticsData.linkType,
            pageSlot: actualAnalayticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/verticalStepper_step.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
        
        await expect(expectedAnalyticsDataStep).toEqual(parsedActualAnalyticsDataStep);
    });





});
