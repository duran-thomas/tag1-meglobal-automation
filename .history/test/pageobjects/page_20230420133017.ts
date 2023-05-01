/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open (path: string) {
        /**
         * TODO: modify url to account for HTTP basic authentication
         * 
         * username: meda2022
         * password: meda2022
         */
        return browser.url(`https://meglobalstg.prod.acquia-sites.com/${path}`)
    }
}
