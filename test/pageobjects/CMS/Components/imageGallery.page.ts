import Page from "../Login/page";

class ImageGalleryBlockPage extends Page {
    public get configBlock() {
        return $(".ui-draggable-handle");
    }
}

export default new ImageGalleryBlockPage();
