import Page from "../Login/page";

class LightBoxGalleryBlockPage extends Page {
    public get lightboxGalleryComponent() {
        return $(".block-inline-blockimage-gallery");
    }

    public get firstLightboxItem() {
        return $$(".block-inline-blockimage-gallery ul li a")[0];
    }
}

export default new LightBoxGalleryBlockPage();
