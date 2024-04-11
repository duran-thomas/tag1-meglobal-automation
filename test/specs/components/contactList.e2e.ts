import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import ContactListBlockPage from '../../pageobjects/CMS/Components/contactList.page';
import { contactListBlockData } from '../../data/contactList.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";


describe('Contact List Component Tests', () => {
    
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
        const screenshotPath = `./screenshots/ContactList/${testName}.png`;
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

     
    it('[S3C874] Verify that a site Content Administrator can create a Contact List Component with an Email Contact List Item', async () => {
        const id=`ContactList-S3C874-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        await ContactListBlockPage.createEmailContact(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, contactListBlockData.email, contactListBlockData.info);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ContactListBlockPage.contactElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ContactListBlockPage.contactHeadline(id)).toHaveText(contactListBlockData.headline); 
        await expect(ContactListBlockPage.contactHeading(id)).toHaveText(contactListBlockData.heading); 
        await expect(ContactListBlockPage.contactContent(id)).toHaveText(contactListBlockData.content); 
        await expect($(`a[data-analytics-item-title="${contactListBlockData.email}"]`)).toExist();   
    });

    it('[S3C875] Verify that a site Content Administrator can create a Contact List Component with an Text Contact List Item', async () => {
        const id=`ContactList-S3C875-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        await ContactListBlockPage.createTextContact(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, contactListBlockData.text, contactListBlockData.url, contactListBlockData.linkText, contactListBlockData.info);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ContactListBlockPage.contactElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ContactListBlockPage.contactHeadline(id)).toHaveText(contactListBlockData.headline); 
        await expect(ContactListBlockPage.contactHeading(id)).toHaveText(contactListBlockData.heading); 
        await expect(ContactListBlockPage.contactContent(id)).toHaveText(contactListBlockData.content); 
        await expect($(`a[href="${contactListBlockData.url}"]`)).toExist();   
    });

    it('[S3C876] Verify that a site Content Administrator can create a Contact List Component with an Text Contact List Item using an internal node as its link', async () => {
        const id=`ContactList-S3C876-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        await ContactListBlockPage.createIntTextContact(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, contactListBlockData.text, contactListBlockData.intUrl, contactListBlockData.intLinkText, contactListBlockData.info);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ContactListBlockPage.contactElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ContactListBlockPage.contactHeadline(id)).toHaveText(contactListBlockData.headline); 
        await expect(ContactListBlockPage.contactHeading(id)).toHaveText(contactListBlockData.heading); 
        await expect(ContactListBlockPage.contactContent(id)).toHaveText(contactListBlockData.content); 
        await expect($(`a[data-analytics-click-text="${contactListBlockData.intLinkText}"]`)).toExist();   
    });

    it('[S3C877]  Verify that a site Content Administrator can create a Contact List Component with a Phone Contact List Item', async () => {
        const id=`ContactList-S3C877-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        await ContactListBlockPage.createPhoneContact(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, contactListBlockData.subTitle, contactListBlockData.text, contactListBlockData.phone, contactListBlockData.info);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ContactListBlockPage.contactElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ContactListBlockPage.contactHeadline(id)).toHaveText(contactListBlockData.headline); 
        await expect(ContactListBlockPage.contactHeading(id)).toHaveText(contactListBlockData.heading); 
        await expect(ContactListBlockPage.contactContent(id)).toHaveText(contactListBlockData.content); 
        await expect($(`a[data-analytics-item-title="${contactListBlockData.subTitle}"]`)).toExist();   
    });

    it('[S3C878]  Verify that a site Content Administrator can create a Contact List Component with a Location Contact List Item', async () => {
        const id=`ContactList-S3C878-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        await ContactListBlockPage.createLocationContact(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, contactListBlockData.address, contactListBlockData.latitude, contactListBlockData.longitude, contactListBlockData.url);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ContactListBlockPage.contactElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ContactListBlockPage.contactHeadline(id)).toHaveText(contactListBlockData.headline); 
        await expect(ContactListBlockPage.contactHeading(id)).toHaveText(contactListBlockData.heading); 
        await expect(ContactListBlockPage.contactContent(id)).toHaveText(contactListBlockData.content); 
        await expect($(`a[href="${contactListBlockData.url}"]`)).toExist();   
    });

    it('[S3C879]  Verify that a site Content Administrator can create a Contact List Component with a Location Contact List Item using an internal node as its link', async () => {
        const id=`ContactList-S3C879-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        await ContactListBlockPage.createIntLocationContact(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, contactListBlockData.address, contactListBlockData.latitude, contactListBlockData.longitude, contactListBlockData.intUrl);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ContactListBlockPage.contactElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ContactListBlockPage.contactHeadline(id)).toHaveText(contactListBlockData.headline); 
        await expect(ContactListBlockPage.contactHeading(id)).toHaveText(contactListBlockData.heading); 
        await expect(ContactListBlockPage.contactContent(id)).toHaveText(contactListBlockData.content); 
        await expect($(`a[href="${contactListBlockData.intUrl}"]`)).toExist();   
    });

    it('[S3C880] Verify that a site Content Administrator can create a Contact List Component with a Chat Contact List Item', async () => {
        const id=`ContactList-S3C880-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        await ContactListBlockPage.createChatContact(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, contactListBlockData.url, contactListBlockData.linkText, contactListBlockData.info);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ContactListBlockPage.contactElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ContactListBlockPage.contactHeadline(id)).toHaveText(contactListBlockData.headline); 
        await expect(ContactListBlockPage.contactHeading(id)).toHaveText(contactListBlockData.heading); 
        await expect(ContactListBlockPage.contactContent(id)).toHaveText(contactListBlockData.content); 
        await expect($(`a[data-analytics-item-title="${contactListBlockData.linkText}"]`)).toExist();   
    });

    it('[S3C881] Verify that a site Content Administrator can create a Contact List Component with a Chat Contact List Item using an internal node as its link', async () => {
        const id=`ContactList-S3C881-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        await ContactListBlockPage.createChatContact(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, contactListBlockData.intUrl, contactListBlockData.intLinkText, contactListBlockData.info);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ContactListBlockPage.contactElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ContactListBlockPage.contactHeadline(id)).toHaveText(contactListBlockData.headline); 
        await expect(ContactListBlockPage.contactHeading(id)).toHaveText(contactListBlockData.heading); 
        await expect(ContactListBlockPage.contactContent(id)).toHaveText(contactListBlockData.content); 
        await expect($(`a[data-analytics-item-title="${contactListBlockData.intLinkText}"]`)).toExist();   
    });

    it('[S3C882] Verify that a site Content Administrator can create a Contact List Component with an Button Contact List Item', async () => {
        const id=`ContactList-S3C882-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        await ContactListBlockPage.createButtonContact(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, contactListBlockData.btnText, contactListBlockData.url, contactListBlockData.info);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ContactListBlockPage.contactElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ContactListBlockPage.contactHeadline(id)).toHaveText(contactListBlockData.headline); 
        await expect(ContactListBlockPage.contactHeading(id)).toHaveText(contactListBlockData.heading); 
        await expect(ContactListBlockPage.contactContent(id)).toHaveText(contactListBlockData.content); 
        await expect($(`a[data-analytics-item-title="${contactListBlockData.btnText}"]`)).toExist();   
    });

    it('[S3C883] Verify that a site Content Administrator can create a Contact List Component with an Button Contact List Item using an internal node as its link', async () => {
        const id=`ContactList-S3C883-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        await ContactListBlockPage.createIntButtonContact(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, contactListBlockData.btnText, contactListBlockData.intUrl, contactListBlockData.info);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ContactListBlockPage.contactElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ContactListBlockPage.contactHeadline(id)).toHaveText(contactListBlockData.headline); 
        await expect(ContactListBlockPage.contactHeading(id)).toHaveText(contactListBlockData.heading); 
        await expect(ContactListBlockPage.contactContent(id)).toHaveText(contactListBlockData.content); 
        await expect($(`a[data-analytics-item-title="${contactListBlockData.btnText}"]`)).toExist();   
    });

    it('[S3C884] Verify that a site Content Administrator can create a Contact List Component with a Person Contact List Item', async () => {
        const id=`ContactList-S3C884-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await ContactListBlockPage.createPersonContact(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, imageFilePath, contactListBlockData.altText,contactListBlockData.name, contactListBlockData.info);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ContactListBlockPage.contactElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect(ContactListBlockPage.contactHeadline(id)).toHaveText(contactListBlockData.headline); 
        await expect(ContactListBlockPage.contactHeading(id)).toHaveText(contactListBlockData.heading); 
        await expect(ContactListBlockPage.contactContent(id)).toHaveText(contactListBlockData.content); 
    });

    it('[S3C885] Verify that a site Content Administrator can create a Contact List Component with multiple Items', async () => {
        const id=`ContactList-S3C885-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await ContactListBlockPage.createMultiContact(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, contactListBlockData.address, contactListBlockData.latitude, contactListBlockData.longitude, contactListBlockData.url, contactListBlockData.email, contactListBlockData.subTitle, contactListBlockData.text, contactListBlockData.phone, contactListBlockData.url, contactListBlockData.linkText,
        imageFilePath, contactListBlockData.altText, contactListBlockData.name, contactListBlockData.info);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await ContactListBlockPage.contactElement(id)).scrollIntoView();
        
        await expect(ContactListBlockPage.contactHeadline(id)).toHaveText(contactListBlockData.headline); 
        await expect(ContactListBlockPage.contactHeading(id)).toHaveText(contactListBlockData.heading); 
        await expect(ContactListBlockPage.contactContent(id)).toHaveText(contactListBlockData.content); 
        await expect($(`a[data-analytics-item-title="${contactListBlockData.email}"]`)).toExist();   
        await expect($(`a[data-analytics-item-title="${contactListBlockData.linkText}"]`)).toExist();   
        await expect($(`a[data-analytics-item-title="${contactListBlockData.subTitle}"]`)).toExist();   
        await expect($(`a[href="${contactListBlockData.url}"]`)).toExist();     

    });

    it('Verify analytics for Contact components are configured', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnContactList).scrollIntoView();
        await (await QALayoutPage.btnContactList).click();
        await (await ContactListBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await ContactListBlockPage.createAllContactTypes(contactListBlockData.title, contactListBlockData.headline, contactListBlockData.content, contactListBlockData.heading, contactListBlockData.address, contactListBlockData.latitude, contactListBlockData.longitude, contactListBlockData.url, contactListBlockData.email, contactListBlockData.subTitle, contactListBlockData.text, contactListBlockData.phone, contactListBlockData.url, contactListBlockData.linkText,
            imageFilePath, contactListBlockData.altText, contactListBlockData.name, contactListBlockData.info, contactListBlockData.btnText);

        await expect(ContactListBlockPage.successMsg).toBeDisplayed();
        // Create expected analytics objects
        let allAnalytics = [
            {
                clickText: 'location',
                componentType: 'card contact',
                event: 'e_componentClick',
                itemTitle: contactListBlockData.address,
                linkType: 'button',
                pageSlot: '1'
            },
            {
                clickText: 'mail',
                componentType: 'card contact',
                event: 'e_componentClick',
                itemTitle: contactListBlockData.email,
                linkType: 'button',
                pageSlot: '1'
            },
            {
                clickText: 'mail',
                componentType: 'card contact',
                event: 'e_componentClick',
                itemTitle: contactListBlockData.email,
                linkType: 'link',
                pageSlot: '1'
            },
            {
                clickText: 'phone',
                componentType: 'card contact',
                event: 'e_componentClick',
                itemTitle: contactListBlockData.subTitle,
                linkType: 'button',
                phoneNumber: contactListBlockData.phone,
                pageSlot: '1'
            },
            {
                clickText: 'phone',
                componentType: 'card contact',
                event: 'e_componentClick',
                itemTitle: contactListBlockData.subTitle,
                linkType: 'link',
                phoneNumber: contactListBlockData.phone,
                pageSlot: '1'
            },
            {
                clickText: 'chat',
                componentType: 'card contact',
                event: 'e_componentClick',
                itemTitle: contactListBlockData.linkText,
                linkType: 'button',
                pageSlot: '1'
            },
            {
                clickText: 'chat',
                componentType: 'card contact',
                event: 'e_componentClick',
                itemTitle: contactListBlockData.linkText,
                linkType: 'link',
                pageSlot: '1'
            },
            {
                clickText: 'text',
                componentType: 'card contact',
                event: 'e_componentClick',
                itemTitle: contactListBlockData.text,
                linkType: 'link',
                pageSlot: '1'
            },
            {
                clickText: 'button',
                componentType: 'card contact',
                event: 'e_componentClick',
                itemTitle: contactListBlockData.btnText,
                linkType: 'button',
                pageSlot: '1'
            }
        ]
        // Setting links to open in new tab
        await browser.execute(() => {
            //Location 
            const locationIcon = document.querySelector('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(4) > div:nth-child(1) > a')
            const chatIcon = document.querySelector('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(13) > div:nth-child(1) > a')
            const chatText = document.querySelector('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(13) > div.self-center.grid.gap-y-2 > div > a')
            const textLink = document.querySelector('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(19) > div > div > a')
            const buttonLink = document.querySelector('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(21) > div > div > a')
            if (locationIcon) {
                locationIcon.setAttribute('target', '_blank');
            }
            if (chatIcon && chatText) {
                chatIcon.setAttribute('target', '_blank');
                chatText.setAttribute('target', '_blank');
            }
            if (textLink) {
                textLink.setAttribute('target', '_blank');
            }
            if (buttonLink) {
                buttonLink.setAttribute('target', '_blank')
            }
        })

        const currentUrl = await browser.getUrl();
        // Trigger analytics for location contact
        await $('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(4) > div:nth-child(1) > a').click()
        await browser.switchWindow(currentUrl);

        // Trigger analytics for email contact
        await $('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(7) > div:nth-child(1) > a').click()
        await browser.switchWindow(currentUrl);

        await $('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(7) > div.self-center.grid.gap-y-2 > div > a').click()
        await browser.switchWindow(currentUrl);

        //Trigger analytics for Phone
        await $('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(10) > div:nth-child(1) > a').click()
        await browser.switchWindow(currentUrl);

        await $('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(10) > div.self-center.grid.gap-y-2 > div > a').click()
        await browser.switchWindow(currentUrl);
        //Trigger analytics for chat
        await $('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(13) > div:nth-child(1) > a').click()
        await browser.switchWindow(currentUrl);

        await $('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(13) > div.self-center.grid.gap-y-2 > div > a').click()
        await browser.switchWindow(currentUrl);

        //Trigger analytics for text
        await $('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(19) > div > div > a').click()
        await browser.switchWindow(currentUrl);

        //Trigger analytics for button
        await (await $('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(21) > div > div > a')).scrollIntoView()
        await $('div.mf-contact.grid.gap-24.p-24.bg-soft-blue > div:nth-child(21) > div > div > a').click()
        await browser.switchWindow(currentUrl);

        const dataLayer = await browser.executeScript('return window.dataLayer', []);

        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick");
        let parsedAnalyticsData = []

        for (let x in actualAnalyticsData) {
            if ('phoneNumber' in actualAnalyticsData[x]) {
                parsedAnalyticsData.push({
                    clickText: actualAnalyticsData[x].clickText,
                    componentType: actualAnalyticsData[x].componentType,
                    event: actualAnalyticsData[x].event,
                    // Remove HTML tags, whitespace, and newlines from the Headline
                    itemTitle: actualAnalyticsData[x].itemTitle.replace(/(<([^>]+)>)/ig, '').trim(),
                    linkType: actualAnalyticsData[x].linkType,
                    phoneNumber: actualAnalyticsData[x].phoneNumber,
                    pageSlot: actualAnalyticsData[x].pageSlot,
                });
            } else {
                parsedAnalyticsData.push({
                    clickText: actualAnalyticsData[x].clickText,
                    componentType: actualAnalyticsData[x].componentType,
                    event: actualAnalyticsData[x].event,
                    // Remove html tags, whitespace and newlines from the Headline
                    itemTitle: actualAnalyticsData[x].itemTitle.replace(/(<([^>]+)>)/ig, '').trim(),
                    linkType: actualAnalyticsData[x].linkType,
                    pageSlot: actualAnalyticsData[x].pageSlot
                })
            }
        }

        fs.writeFile('analyticsTestEvidence/contactComponentsImage.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        const screenshotPath = `./screenshots/ContactList/Verify analytics for Contact components are configured.png`;
        await browser.saveScreenshot(screenshotPath);
        for (let x in parsedAnalyticsData) {
            await expect(parsedAnalyticsData[x]).toEqual(allAnalytics[x]);
        }
    });


  });
