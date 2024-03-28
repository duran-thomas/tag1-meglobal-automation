import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import TeamLeaderBlockPage from '../../pageobjects/CMS/Components/teamLeader.page';
import { teamLeaderBlockData } from '../../data/teamLeader.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import * as fs from "fs";
import { getEnvironmentConfig } from '../../../envSelector';



describe('Team Leader Component Tests', () => {
    
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

    before(async function() {
        global.suiteDescription = this.currentTest?.parent?.title;
        //navigate to admin content page
        await AdminContentPage.open();
        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getTestPage(global.suiteDescription);  
        await expect(QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/TeamLeader/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        //await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);  
    });

    //delete page
    after(async function () {
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);
        //await browser.url(environment.baseUrl+'user/logout');
        await browser.setCookies(environment.admin);
        await AdminContentPage.open();
        await AdminContentPage.deleteTestPage(global.suiteDescription);
        await expect($('.mf-alert__container--highlight')).toBeDisplayed();
    });

  
    it('[S3C1124] Verify a Content Administrator can create a Team Member Grid component', async () => {
        const id=`TeamLeader-S3C91124-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnTeamMembersGrid).scrollIntoView();
        await (await QALayoutPage.btnTeamMembersGrid).click();
        await (await TeamLeaderBlockPage.configBlock).waitForDisplayed();

        await TeamLeaderBlockPage.createTeamMemberGridLeaders(teamLeaderBlockData.adminTitle, teamLeaderBlockData.teamGroupID);

        await expect(TeamLeaderBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TeamLeaderBlockPage.textBox[1]).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await TeamLeaderBlockPage.teamMemberGrid(id)).toBeExisting(); 
    });

    it('[S3C1327] Verify the ability to display ONLY team members within a Team Members Grid', async () => {
        const id=`TeamLeader-S3C91327-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnTeamMembersGrid).scrollIntoView();
        await (await QALayoutPage.btnTeamMembersGrid).click();
        await (await TeamLeaderBlockPage.configBlock).waitForDisplayed();

        await TeamLeaderBlockPage.createTeamMemberGrid(teamLeaderBlockData.adminTitle, teamLeaderBlockData.teamGroupID);

        await expect(TeamLeaderBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TeamLeaderBlockPage.textBox[1]).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await TeamLeaderBlockPage.teamMemberGrid(id)).toBeExisting(); 
    });

    it('[S3C1119] Verify a Content Administrator can create a Team Leader Carousel component', async () => {
        const id=`TeamLeader-S3C91119-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnTeamLeadersCarousel).scrollIntoView();
        await (await QALayoutPage.btnTeamLeadersCarousel).click();
        await (await TeamLeaderBlockPage.configBlock).waitForDisplayed();

        await TeamLeaderBlockPage.createTeamLeaderCarousel(teamLeaderBlockData.adminTitle, teamLeaderBlockData.title, teamLeaderBlockData.teamGroupID, teamLeaderBlockData.content, teamLeaderBlockData.btnText, teamLeaderBlockData.url);

        await expect(TeamLeaderBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TeamLeaderBlockPage.headerTitleElem).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await TeamLeaderBlockPage.teamCarousel(id)).toBeExisting(); 
        await expect(await $(`a[data-analytics-click-text="${teamLeaderBlockData.btnText}"]`)).toBeExisting(); 

    });
    
    it('[S3C1143] Verify that Analytics for the Team Leader Carousel Component is configured', async () => {
        const id=`TeamLeader-S3C1143-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnTeamLeadersCarousel).scrollIntoView();
        await (await QALayoutPage.btnTeamLeadersCarousel).click();
        await (await TeamLeaderBlockPage.configBlock).waitForDisplayed();

        await TeamLeaderBlockPage.createAnalyticsCarousel(teamLeaderBlockData.adminTitle, teamLeaderBlockData.title, teamLeaderBlockData.teamGroupID, teamLeaderBlockData.content, teamLeaderBlockData.btnText, teamLeaderBlockData.url);

        await expect(TeamLeaderBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await TeamLeaderBlockPage.headerTitleElem).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(await TeamLeaderBlockPage.teamCarousel(id)).toBeExisting(); 
        await expect(await $(`a[data-analytics-click-text="${teamLeaderBlockData.btnText}"]`)).toBeExisting(); 


        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g23a9f051951_1_113
         *  */ 
        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType:'carousel',
            itemTitle: teamLeaderBlockData.title,
            linkType: 'button',
            clickText: teamLeaderBlockData.btnText,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        // Interact with the carousel button to generate the analytics. (Clicking the button navigates us to a new tab)
        await (await $(`a[data-analytics-click-text="${teamLeaderBlockData.btnText}"]`)).click();


        // Switch back to the tab where the analytics is being generated
        await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalyticsData.clickText.trim(),
            componentType: actualAnalyticsData.componentType,
            event: actualAnalyticsData.event,
            // Remove html tags, whitespace and newlines from the Headline
            itemTitle: actualAnalyticsData.itemTitle.replace(/(<([^>]+)>)/ig, '').trim(),
            linkType: actualAnalyticsData.linkType,
            pageSlot: actualAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/teamLeader.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/TeamLeader/Verify_that Analytics works as expected for a Team Leader Component.png`;
        await browser.saveScreenshot(screenshotPath);
        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);
    });

  });
