export const commands = {
    waitForCustomFrame: async function (selector:string, timeout:number) {
        return await this.waitUntil(async function () {
            const iframe = await this.$(selector);
            console.log(iframe.error);
            if (iframe.error == undefined) {
                await this.switchToFrame(iframe);
                console.log('Switched to frame')
                return true
            }
            return false
        }, {
            timeout: timeout,
            timeoutMsg: `Expected ${selector} element after ${timeout} milliseconds`
        });
    },
};
