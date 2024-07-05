import Page from "../Login/page";

class CompoundGridPage extends Page {
    public get compoundGridLayout() {
        return $$(".block-inline-blockcompound-grid")[0];
    }

    public get firstCompoundGridImage() {
        return $$(
            ".block-inline-blockcompound-grid .mf-compound-grid__main-item"
        )[0];
    }
}

export default new CompoundGridPage();
