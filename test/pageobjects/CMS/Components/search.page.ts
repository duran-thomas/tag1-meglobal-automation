import Page from "../Login/page";

class SearchBlockPage extends Page {
    public get inputSearch() {
        return $$('div.mf-text-input__inner input[type="search"]')[1];
    }

    public get btnSearch() {
        return $('#edit-actions button[data-analytics-click-text="Search"]');
    }

    public get searchResults() {
        return $("#search-results");
    }

    public get selectedSearchResult() {
        return $(
            'h4[data-analytics-click-text="Improving CAR-T Therapy for Patients with Multiple Myeloma | Montefiore Einstein"]'
        );
    }
    // public get selectedSearchResult() {
    //     return $(
    //         'a[href="https://montefioreeinstein.org/news/2023/01/30/improving-car-t-therapy-patients-multiple-myeloma"]'
    //     );
    // }
}

export default new SearchBlockPage();
