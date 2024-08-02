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

    //nav function

    public async navToComponentTesting() {
        return super.open("/internal/component-testing/compound-grid-default");
    }
}

export default new CompoundGridPage();
