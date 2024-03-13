declare namespace WebdriverIO {
    interface Browser {
        waitForCustomFrame(selector:string, timeout:number): void;
    }
}
