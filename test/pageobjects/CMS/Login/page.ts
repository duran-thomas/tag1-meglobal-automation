/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
import { urlData } from '../../../data/urls.data'

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
        return browser.url(`https://meglobalode7.prod.acquia-sites.com/${path}`)
        //following a decision made ode environments will have incremental numeric value that updates after each release
    }
}
